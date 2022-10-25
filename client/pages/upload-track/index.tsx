import React, { ReactElement, useCallback, useEffect, useState } from "react"
import { Progress } from "antd"
import AppLayout from "../../components/AppLayout"
import UploadSteps from "../../components/UploadView/UploadSteps"
import UploadForm from "../../components/UploadView/UploadForm"
import { Direction, stepsData } from "./data"

import type { NextPageWithLayout } from "../_app"
import type { ProgressStep, HandleStepStatus } from "../../types/upload"

const UploadPage: NextPageWithLayout = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [stepsList, setStepsList] = useState<ProgressStep[]>(stepsData)
    const [progress, setProgress] = useState<number>(null)

    function handleChangeStep(direction: Direction): () => void
    function handleChangeStep(value: number): void
    function handleChangeStep(directionOrValue: Direction | number) {
        if(typeof directionOrValue !== 'number') return () => setCurrentStep(state => directionOrValue === Direction.forward ? ++state : --state)
        else setCurrentStep(directionOrValue)
    }

    const handleSetStepSuccess: HandleStepStatus = (formStep) => {
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

    const handleSetStepFail: HandleStepStatus = (formStep) => {
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
            <UploadSteps 
                current={currentStep}
                steps={stepsList}
                onChangeStep={handleChangeStep}
            />
            <UploadForm
                handleChangeStep={handleChangeStep(Direction.forward)}
                step={currentStep}
                handleSetStepSuccess={handleSetStepSuccess}
                handleSetStepFail={handleSetStepFail}
                setProgress={setProgress}
            />
            <Progress percent={progress ?? 0} showInfo={progress !== null} className="mt-8"/>
        </div>
    )
}

UploadPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
    return (
        <AppLayout>
            {
                page
            }
        </AppLayout>
    )
}

export default UploadPage