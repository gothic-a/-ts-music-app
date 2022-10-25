import { Steps } from 'antd'
import { useMemo } from 'react'
import type { ProgressStep, OnChangeUploadStep } from '../../../types/upload'

const { Step } = Steps

interface Props {
    current: number,
    onChangeStep: OnChangeUploadStep,
    steps: ProgressStep[]
}

const UploadSteps = ({ current, onChangeStep, steps }: Props): JSX.Element => {
    const renderSteps: React.ReactElement[] = useMemo(() => steps.map((s, idx) => (
        <Step 
            key={idx + s.title}
            disabled={s.isUnlock ? false : !(idx <= current)}
            title={s.title}
            status={s.isFailed ? 'error' : current === idx ? 'process' : s.isSuccess ? 'finish' : 'wait'}
        />
    )), [steps, current])

    return (
        <Steps 
            initial={0} 
            current={current}
            onChange={onChangeStep}
            className="w-6 h-56 sm:w-full sm:h-max"
        >
            {
                renderSteps
            }
        </Steps>
    )
}

export default UploadSteps