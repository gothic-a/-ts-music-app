import type { NextPageWithLayout } from "../_app"
import React, { ReactElement } from "react"
import AppLayout from "../../components/AppLayout"
import AddTrackSteps from "../../components/AddTrackView/AddTrackSteps"
import { useState } from "react"
import { Button } from 'antd'
import { Space } from "antd"

export enum Direction {
    back = 'back',
    forward = 'forward'
}

const AddTrackPage: NextPageWithLayout = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)

    function handleChangeStep(direction: Direction): () => void
    function handleChangeStep(value: number): void
    function handleChangeStep(directionOrValue: Direction | number) {
        if(typeof directionOrValue !== 'number') return () => setCurrentStep(state => directionOrValue === Direction.forward ? ++state : --state)
        else setCurrentStep(directionOrValue)
    }

    return (
        <div className="flex flex-col justify-between">
            <div className="flex flex-row-reverse justify-between sm:flex-col">
                <AddTrackSteps 
                    current={currentStep}
                    onChangeStep={handleChangeStep}
                />
                <div className="flex w-full mr-4 sm:mr-0">
                    
                </div>
            </div>
            <Space>
                <Button 
                    className="hidden sm:flex"
                    size="large"
                    disabled={currentStep < 1}
                    onClick={handleChangeStep(Direction.back)}
                >
                    Prev
                </Button>
            </Space>
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