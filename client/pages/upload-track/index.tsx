import React, { ReactElement, useEffect, useState } from "react"
import AppLayout from "../../components/AppLayout"
import UploadSteps from "../../components/UploadView/UploadSteps"
import UploadForm from "../../components/UploadView/UploadForm"
import { Direction, initialStepsData } from "./data"
import JSONClone from "../../utils/deepClone"

import type { NextPageWithLayout } from "../_app"
import type { ProgressStep, HandleStepStatus } from "../../types/upload"

const UploadPage: NextPageWithLayout = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [stepsList, setStepsList] = useState<ProgressStep[]>(null)

    useEffect(() => {
        setStepsList(JSONClone<ProgressStep[]>(initialStepsData))
    }, [])


    function handleChangeStep(direction: Direction): () => void
    function handleChangeStep(value: number): void
    function handleChangeStep(directionOrValue: Direction | number) {
        if(typeof directionOrValue !== 'number') return () => setCurrentStep(state => directionOrValue === Direction.forward ? ++state : --state)
        else setCurrentStep(directionOrValue)
    }

    const handleResetSteps = (): void => {
        setCurrentStep(0)
        setStepsList(JSONClone<ProgressStep[]>(initialStepsData)) 
    }

    const handleSetStepSuccess: HandleStepStatus = (formStep) => {
        setStepsList(state => {
            const idx = state.findIndex(s => s.formStep === formStep)
            const step = state[idx]
            const nextStep = state[idx + 1]
            step.isUnlock = true
            step.isSuccess = true
            if(step.isFailed) step.isFailed = false
            if(nextStep) nextStep.isUnlock = true

            if(nextStep) {
                return [
                    ...state.slice(0, idx),
                    step,
                    nextStep,
                    ...state.slice(idx + 2)
                ]
            } else {
                return [
                    ...state.slice(0, idx),
                    step
                ]
            }

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
            {
                stepsList && (
                    <>
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
                            onReset={handleResetSteps}
                        />
                    </>
                )
            }
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