import type { NextPageWithLayout } from "../_app"
import React, { ReactElement, useCallback, useEffect } from "react"
import AppLayout from "../../components/AppLayout"
import AddTrackSteps from "../../components/AddTrackView/AddTrackSteps"
import { useState } from "react"
import AddTrackForm from "../../components/AddTrackView/AddTrackForm"
import type { Status } from "../../components/AddTrackView/AddTrackSteps"
import { Progress } from "antd"

export enum Direction {
    back = 'back',
    forward = 'forward'
}

export enum FormSteps {
    'image' = "image",
    'track' = "track",
    'description' = "description"
}

export interface Step {
    title: string,
    description: string,
    isUnlock: boolean,
    isFailed: boolean,
    isSuccess: boolean,
    formStep: FormSteps
} 

const stepsData: Step[] = [
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

export type HandleStep = (formStep: FormSteps) => void

const AddTrackPage: NextPageWithLayout = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [stepsList, setStepsList] = useState<Step[]>(stepsData)

    function handleChangeStep(direction: Direction): () => void
    function handleChangeStep(value: number): void
    function handleChangeStep(directionOrValue: Direction | number) {
        if(typeof directionOrValue !== 'number') return () => setCurrentStep(state => directionOrValue === Direction.forward ? ++state : --state)
        else setCurrentStep(directionOrValue)
    }

    const handleSetStepSuccess: HandleStep = (formStep: FormSteps): void => {
        setStepsList(state => {
            const idx = state.findIndex(s => s.formStep === formStep)
            const step = state[idx]
            const nextStep = state[idx + 1]
            step.isUnlock = true
            step.isSuccess = true
            if(step.isFailed) step.isFailed = false
            nextStep.isUnlock = true

            return [
                ...state.slice(0, idx),
                step,
                nextStep,
                ...state.slice(idx + 2)
            ]
        })
    }

    const handleSetStepFail: HandleStep = (formStep: FormSteps): void => {
        setStepsList(state => {
            const idx = state.findIndex(s => s.formStep === formStep)
            const step = state[idx]
            step.isFailed = true

            return [
                ...state.slice(0, idx),
                step,
                ...state.slice(idx + 1)
            ]
        })
    }

    return (
        <div className="flex flex-row-reverse justify-between sm:flex-col h-max">
            <AddTrackSteps 
                current={currentStep}
                steps={stepsList}
                onChangeStep={handleChangeStep}
            />
            <AddTrackForm
                handleChangeStep={handleChangeStep(Direction.forward)}
                step={currentStep}
                handleSetStepSuccess={handleSetStepSuccess}
                handleSetStepFail={handleSetStepFail}
            />
            <Progress percent={100} className="mt-8"/>
        </div>
    )
}

AddTrackPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
    return (
        <AppLayout>
            {
                page
            }
        </AppLayout>
    )
}

export default AddTrackPage