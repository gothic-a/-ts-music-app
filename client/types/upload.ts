import { FormEvent } from "react"
import { FormikErrors } from "formik"
import { FormSteps } from "../pages/upload-track/config"

export type Status = 'error' | 'process' | 'finish' | 'wait'

export interface ProgressStep {
    title: string,
    description: string,
    isUnlock: boolean,
    isFailed: boolean,
    isSuccess: boolean,
    formStep: FormSteps
} 

export interface FileWithAdditionalData {
    file: File & { path: string }, 
    additionalData: {
        mbsize: number,
        preview?: string,
        duration?: number
    }
}

export type HandleStepStatus = (formStep: FormSteps) => void
export type OnChangeUploadStep = (value: number) => void 

export interface UploadFormInitialValues {
    image: FileWithAdditionalData,
    track: FileWithAdditionalData,
    description: {
        artist: string,
        name: string,
    }
}

export interface UploadFormErrors {
    errors?: {
        image?: {
            additionalData?: {
                mbsize?: string,
                preview?: string
            }
        },
        track?: {
            additionalData?: {
                mbsize?: string,
                duration?: string,
            }
        },
        description?: {
            artist?: string,
            name?: string
        }
    }
}

export type SetFile<F, R> = (field: F, file: FileWithAdditionalData) => R

export type SetFieldValue<F, E> = (field: F, value: any, shouldValidate?: boolean) => Promise<E | {}>;

export type SetUploadFormFieldValue = SetFieldValue<FormSteps, FormikErrors<UploadFormErrors>>
export type HandleSubmit = (e?: FormEvent<HTMLFormElement>) => void
export type HandleSetFile = (setFieldValue: SetUploadFormFieldValue) => SetFile<FormSteps, Promise<UploadFormErrors | void>>
