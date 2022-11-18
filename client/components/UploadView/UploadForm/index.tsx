import { Formik, Form } from 'formik'
import { useCallback, useEffect, useMemo } from 'react'
import UploadFileDropzone from '../UploadFileDropzone'
import { Input } from 'formik-antd'
import TrackCard from '../../TrackCard'
import { Button, Typography, Progress } from 'antd'
import { SetProgress } from '../../../types/api'
import cn from 'classnames'
import SuccessMessage from '../../SuccessMessage'
import { uploadTrackThunk } from '../../../store/slices/uploadTrackSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { resetUploadState } from '../../../store/slices/uploadTrackSlice'

import { validationSchema } from './validationSchema'

import { FormikProps, FormikValues, useFormikContext } from 'formik'
import type { UploadFormInitialValues, UploadFormErrors, HandleSubmit, HandleStepStatus, HandleSetFile, SetUploadFormFieldValue } from '../../../types/upload'
import convertSecToMin from '../../../utils/convertSecToMin'

const { Title } = Typography

interface UploadFormProps {
    step: number, 
    handleChangeStep: Function,
    handleSetStepSuccess: HandleStepStatus,
    handleSetStepFail: HandleStepStatus,
    setProgress?: SetProgress,
    onReset: () => any
}

const initialValues: UploadFormInitialValues = {
    image: {
        file: null,
        additionalData: null
    },
    track: {
        file: null,
        additionalData: null,
    },
    description: {
        artist: null,
        name: null
    }
}

interface IsValidProps {
    onValid?: Function,
    onError?: Function,
    field?: string,
}

const IsFieldValid = ({ onValid, onError, field }: IsValidProps): null => {
    const { touched, errors, values } = useFormikContext<UploadFormInitialValues>()

    useEffect(() => {
        if(!errors[field] && touched[field]) onValid && onValid(field)
        else if(touched[field]) onError && onError(field)
    }, [touched, errors])

    return null
}

const UploadForm = ({ step, handleChangeStep, handleSetStepFail, handleSetStepSuccess, onReset }: UploadFormProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const { loading, success, progress }  = useAppSelector(state => state.uploadTrack)
 
    const titleText = useMemo(() => (
        step === 0 
            ? 'Upload image for track (1MB max)' 
            : step === 1  
                ? 'Upload track file (20MB max)' 
                : 'Input track description'
    ), [step])

    const resetState = () => dispatch(resetUploadState())

    useEffect(() => {

        return () => {
            const clear = async () => resetState()
            clear()
        }
    }, [])
    
    const handleResetForm = (resetForm: () => void) => (): void => {
        resetState()
        resetForm()
        onReset()
    }
    const handleSubmitForm = (handleSubmit: HandleSubmit) => () => handleSubmit()

    const handleFormSubmit = async (values: FormikValues): Promise<void> => {
        const dto = {
            artist: values.description.artist,
            name: values.description.name,
            image: values.image.file,
            audio: values.track.file,
            duration: values.track.additionalData.duration,
            convertedDuration: convertSecToMin(values.track.additionalData.duration)
        }

        const formData = new FormData()
        Object.entries(dto).forEach(i => formData.append(i[0], i[1]))

        dispatch(uploadTrackThunk(formData))
    }

    const handleSetFile: HandleSetFile = useCallback((setFieldValue) => async (field, value) => {
        const set = await setFieldValue(field, value, true)
        if(('track' in set && field === 'track') || ('image' in set && field === 'image')) {
            handleSetStepFail(field)
            return
        }

        handleSetStepSuccess(field)
        handleChangeStep()
    }, [])

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={validationSchema}
                isInitialValid={false}
                validateOnMount={true}
            >
                {({ values, setFieldValue, isValid, handleSubmit, errors, resetForm }: FormikProps<UploadFormInitialValues & UploadFormErrors>) => (
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4 mt-8">
                        <Title level={4} className="col-start-1 col-end-4">
                            {
                                titleText
                            }
                        </Title>
                        <Form className="col-start-1 col-end-3">
                            {
                                step === 0 && (
                                    <UploadFileDropzone 
                                        acceptFormat='image/*'
                                        setFile={handleSetFile(setFieldValue as SetUploadFormFieldValue)}
                                        fieldName="image"
                                        withPreview={true}
                                        error={errors?.image?.additionalData?.mbsize ?? null}
                                    />
                                )
                            }
                            {
                                step === 1 && (
                                    <UploadFileDropzone 
                                        acceptFormat='audio/*'
                                        setFile={handleSetFile(setFieldValue as SetUploadFormFieldValue)}
                                        fieldName="track"
                                        error={(errors?.track?.additionalData?.mbsize || errors?.track?.additionalData?.duration) ?? null}
                                    />
                                )
                            }
                            {
                                step === 2 && (
                                    <>
                                        <Input 
                                            name="description[artist]"
                                            size="large"
                                            placeholder='Input artist name'
                                            className={
                                                cn("mb-5"
                                                )
                                            }
                                        />
                                        <Input 
                                            name="description[name]"
                                            size="large"
                                            placeholder='Input track name'
                                        />
                                    </>
                                )
                            }
                            <IsFieldValid 
                                onValid={handleSetStepSuccess}
                                field="description"
                            />
                        </Form>
                        <div>
                            <div className="relative" >
                                <SuccessMessage isActive={success}/>
                                <TrackCard 
                                    imagePreview={!errors.image && values?.image?.additionalData?.preview}
                                    trackPath={values?.track?.file?.path}
                                    name={values.description?.name}
                                    artist={values.description?.artist}
                                    trackSize={values.track?.additionalData?.mbsize}
                                    trackDuration={values.track?.additionalData?.duration}
                                    className={success && "blur-sm brightness-35"}
                                />
                            </div>
                            <Button 
                                className="mt-4 w-full"
                                type='primary' 
                                size="large"
                                onClick={success ? handleResetForm(resetForm) : handleSubmitForm(handleSubmit)}
                                disabled={!success && (!isValid || loading)}
                                loading={loading}
                            >
                                {
                                    success ? 'Upload another one' : 'Upload'
                                }
                            </Button>
                        </div>
                    </div>
                )}
            </Formik>
            {
                (loading || progress === 100) && <Progress percent={progress ?? 0} showInfo={progress !== null} className="mt-8"/>
            }
        </>
    )
}   

export default UploadForm