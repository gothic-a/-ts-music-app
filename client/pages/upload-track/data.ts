import { ProgressStep } from "../../types/upload"

export enum Direction {
    back = 'back',
    forward = 'forward'
}

export enum FormSteps {
    'image' = "image",
    'track' = "track",
    'description' = "description"
}

export const stepsData: ProgressStep[] = [
    {
        title: 'Image',
        description: 'Pick image file',
        isUnlock: true,
        isFailed: false,
        isSuccess: false,
        formStep: FormSteps.image
    },
    {
        title: 'Track',
        description: 'Pick track file',
        isUnlock: false,
        isFailed: false,
        isSuccess: false,
        formStep: FormSteps.track
    },
    {
        title: 'Description',
        description: 'Add description',
        isUnlock: false,
        isFailed: false,
        isSuccess: false,
        formStep: FormSteps.description
    }
]