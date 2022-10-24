import { Formik, Form } from 'formik'
import type { FormikProps, FormikValues, FormikErrors } from 'formik'
import { FormEvent, MouseEventHandler, useCallback, useMemo } from 'react'
import UploadFileDropzone from '../../UploadFileDropzone'
import { Input } from 'formik-antd'
import TrackCard from '../../TrackCard'
import { Button } from 'antd'
import * as yup from 'yup'
import { Typography } from 'antd'
import type { FileWithAdditionalData } from '../../UploadFileDropzone'
import { FormSteps, HandleStep } from '../../../pages/add-track'
import { createTrack } from '../../../api'

const { Title, Text } = Typography

interface Props {
    step: number, 
    handleChangeStep: Function,
    handleSetStepSuccess: HandleStep,
    handleSetStepFail: HandleStep
}

export interface InitialValues {
    image: {
        file: File;
        additionalData: {
            mbsize: number,
            preview: string,
        }
    },
    track: FileWithAdditionalData,
    description: {
        artist: string,
        name: string,
    }
}

type Errors = FormikErrors<{
    errors?: {
        image?: {
            additionalData?: {
                mbsize?: string,
            }
        },
        track?: {
            additionalData?: {
                mbsize?: string,
                duration?: string,
            }
        }
    }
}>

export type SetFieldValue = (field: string, value: any, shouldValidate?: boolean) => Promise<Errors | {}>;
export type HandleSubmit = (e?: FormEvent<HTMLFormElement>) => void

const AddTrackForm = ({ step, handleChangeStep, handleSetStepFail, handleSetStepSuccess }: Props): JSX.Element => {
    const initialValues: InitialValues = {
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

            const { data } = await createTrack(formData)
        } catch(e) {
            console.log(e.response)
        }
    }

    const submitButtonClick = (handleSubmit: HandleSubmit) => () => handleSubmit()

    const handleSetFile = useCallback((setFieldValue: SetFieldValue) => async (field: FormSteps, value: FileWithAdditionalData): Promise<InitialValues | void> => {
        const set = await setFieldValue(field, value, true)
        if(('track' in set && field === 'track') || ('image' in set && field === 'image')) {
            handleSetStepFail(field)
            return
        }

        handleSetStepSuccess(field)
        handleChangeStep()
    }, [])

    const validationSchema = yup.object().shape({
        track: yup.object().shape({
            additionalData: yup.object().shape({
                mbsize: yup.number().required().max(20, 'Your file bigger than 20MB.'),
                duration: yup.number().required().max(3600, 'Your track longer then 1 hour.')
            })
        }),
        image: yup.object().shape({
            additionalData: yup.object().shape({
                mbsize: yup.number().required().max(1, 'Your file bigger than 1MB.'),
                preview: yup.string().required(),
            })
        }),
        description: yup.object().shape({
            artist: yup.string().required(),
            name: yup.string().required(),
        })
    })

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
            isInitialValid={false}
        >
            {({ values, setFieldValue, isValid, handleSubmit, errors }: FormikProps<FormikValues> & Errors) => (
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
                                    setFile={handleSetFile(setFieldValue as SetFieldValue)}
                                    fieldName="image"
                                    withPreview={true}
                                    errors={errors?.image?.additionalData?.mbsize ?? null}
                                />
                            )
                        }
                        {
                            step === 1 && (
                                <UploadFileDropzone 
                                    acceptFormat='audio/*'
                                    setFile={handleSetFile(setFieldValue as SetFieldValue)}
                                    fieldName="track"
                                    errors={errors?.track?.additionalData?.mbsize || errors?.track?.additionalData?.duration || null}
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

export default AddTrackForm