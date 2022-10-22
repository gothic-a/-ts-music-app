import { Steps } from 'antd'

const { Step } = Steps

interface Props {
    current: number,
    onChangeStep: any
}

export interface Step {
    title: string,
    description: string
} 

const stepsData: Step[] = [
    {
        title: 'Track',
        description: 'Pick the track file'
    },
    {
        title: 'Image',
        description: 'Pick the track image'
    },
    {
        title: 'Upload',
        description: 'Wait for upload'
    }
]

const AddTrackSteps = ({ current, onChangeStep }: Props): JSX.Element => {
    const isMobile = false

    const steps: React.ReactElement[] = stepsData.map((s, idx) => (
        <Step 
            key={idx + s.title}
            disabled={idx > current}
            title={!isMobile ? s.title : null}
            description={!isMobile ? s.description : null}
        />
    ))

    return (
        <Steps 
            initial={0} 
            current={current}
            onChange={onChangeStep}
            size="small"
            className="w-6 h-56 sm:w-full sm:h-max"
        >
            {
                steps
            }
        </Steps>
    )
}

export default AddTrackSteps