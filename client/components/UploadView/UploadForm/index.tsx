import { Formik, Form, FormikErrors } from 'formik'
import { useCallback, useEffect, useMemo, useState } from 'react'
import UploadFileDropzone from '../UploadFileDropzone'
import { Input } from 'formik-antd'
import TrackCard from '../../TrackCard'
import { Button, Typography, Progress } from 'antd'
import { SetProgress } from '../../../types/api'
import cn from 'classnames'
import SuccessMessage from '../../SuccessMessage'

import { createTrack } from '../../../api'
import { validationSchema } from './validationSchema'

import { FormikProps, FormikValues, useFormikContext } from 'formik'
import type { UploadFormInitialValues, UploadFormErrors, HandleSubmit, HandleStepStatus, HandleSetFile, SetUploadFormFieldValue } from '../../../types/upload'

const { Title } = Typography

interface Props {
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
        additionalData: null
    },
    description: {
        artist: null,
        name: null
    }
}

interface ValidProps {
    onValid?: Function,
    onError?: Function,
    onChange?: Function,
    field?: string,
}

const IsFieldValid = ({ onValid, onError, onChange, field }: ValidProps): null => {
    const { touched, errors }  = useFormikContext<UploadFormInitialValues>()

    useEffect(() => {

        if(!errors[field] && touched[field]) onValid && onValid(field)
        else if(touched[field]) onError && onError(field)
    }, [touched, errors])

    return null
}



const uploadTrackState = {
    progress: null,
    loading: false,
    success: false,
    error: false
}

const UploadForm = ({ step, handleChangeStep, handleSetStepFail, handleSetStepSuccess, onReset }: Props): JSX.Element => {
    const [uploadTrack, setUploadTrack] = useState(uploadTrackState)
 
    const titleText = useMemo(() => (
        step === 0 
            ? 'Upload image for track (1MB max)' 
            : step === 1  
                ? 'Upload track file (20MB max)' 
                : 'Input track description'
    ), [step])

    const setProgress = (value: number): void => setUploadTrack(state => ({ ...state, progress: value }))
    
    const handleResetForm = (resetForm) => (): void => {
        setUploadTrack(uploadTrackState)
        resetForm()
        onReset()
    }

    const handleFormSubmit = async (values: FormikValues): Promise<void> => {
        setUploadTrack(state => ({ ...state, loading: true }))

        const dto = {
            artist: values.description.artist,
            name: values.description.name,
            image: values.image.file,
            audio: values.track.file
        }

        try {
            const formData = new FormData()
            Object.entries(dto).forEach(i => formData.append(i[0], i[1]))

            const { data } = await createTrack(formData, setProgress)
            setUploadTrack(state => ({ ...state, loading: false, success: true }))
        } catch(e) {
            setUploadTrack(state => ({ ...state, loading: false, error: true }))
        }
    }

    const submitButtonClick = (handleSubmit: HandleSubmit) => () => handleSubmit()

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
                                        error={errors?.track?.additionalData?.mbsize || errors?.track?.additionalData?.duration || null}
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
                                <SuccessMessage isActive={uploadTrack.success}/>
                                <TrackCard 
                                    imagePreview={!errors.image && values?.image?.additionalData?.preview}
                                    trackPath={values?.track?.file?.path}
                                    name={values.description?.name}
                                    artist={values.description?.artist}
                                    trackSize={values.track?.additionalData?.mbsize}
                                    trackDuration={values.track?.additionalData?.duration}
                                    className={uploadTrack.success && "blur-sm brightness-35"}
                                />
                            </div>
                            <Button 
                                className="mt-4 w-full"
                                type='primary' 
                                size="large"
                                onClick={!uploadTrack.success ? submitButtonClick(handleSubmit) : handleResetForm(resetForm)}
                                disabled={ !uploadTrack.success && (!isValid || uploadTrack.loading)}
                                loading={uploadTrack.loading}
                            >
                                {
                                    uploadTrack.success ? 'Upload another one' : 'Upload'
                                }
                            </Button>
                        </div>
                    </div>
                )}
            </Formik>
            {
                uploadTrack.loading || uploadTrack.progress === 100 && <Progress percent={uploadTrack.progress ?? 0} showInfo={uploadTrack.progress !== null} className="mt-8"/>
            }
        </>
    )
}   

export default UploadForm