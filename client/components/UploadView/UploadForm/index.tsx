import { Formik, Form, FormikErrors } from 'formik'
import { useCallback, useMemo } from 'react'
import UploadFileDropzone from '../UploadFileDropzone'
import { Input } from 'formik-antd'
import TrackCard from '../../TrackCard'
import { Button, Typography } from 'antd'
import { SetProgress } from '../../../types/api'

import { createTrack } from '../../../api'
import { validationSchema } from './validationSchema'

import type { FormikProps, FormikValues } from 'formik'
import type { UploadFormInitialValues, UploadFormErrors, HandleSubmit, HandleStepStatus, HandleSetFile, SetUploadFormFieldValue } from '../../../types/upload'

const { Title } = Typography

interface Props {
    step: number, 
    handleChangeStep: Function,
    handleSetStepSuccess: HandleStepStatus,
    handleSetStepFail: HandleStepStatus,
    setProgress: SetProgress
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

const UploadForm = ({ step, handleChangeStep, handleSetStepFail, handleSetStepSuccess, setProgress }: Props): JSX.Element => {
    const titleText = useMemo(() => (
        step === 0 
            ? 'Upload image for track (1MB max)' 
            : step === 1  
                ? 'Upload track file (20MB max)' 
                : 'Input track description'
    ), [step])



    const handleFormSubmit = async (values: FormikValues): Promise<void> => {
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
        } catch(e) {
            console.log(e.response)
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
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
            isInitialValid={false}
        >
            {({ values, setFieldValue, isValid, handleSubmit, errors }: FormikProps<FormikValues> & FormikErrors<UploadFormErrors>) => (
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
                                        className="mb-5"
                                    />
                                    <Input 
                                        name="description[name]"
                                        size="large"
                                        placeholder='Input track name'
                                    />
                                </>
                            )
                        }
                    </Form>
                    <div>
                        <TrackCard 
                            imagePreview={!errors.image && values?.image?.additionalData?.preview}
                            trackPath={values?.track?.file?.path}
                            name={values.description?.name}
                            artist={values.description?.artist}
                            trackSize={values.track?.additionalData?.mbsize}
                            trackDuration={values.track?.additionalData?.duration}
                        />
                        <Button 
                            className="mt-4 w-full"
                            type='primary' 
                            size="large"
                            onClick={submitButtonClick(handleSubmit)}
                            disabled={!isValid}
                        >
                            Upload
                        </Button>
                    </div>
                </div>
            )}
        </Formik>
    )
}   

export default UploadForm