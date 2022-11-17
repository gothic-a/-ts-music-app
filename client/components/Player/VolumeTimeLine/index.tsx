import { Typography } from "antd"
import StyledSlider from "../../UI/StyledSlider"

const { Text } = Typography

interface Props {
    value: number,
    onChange: (value: number) => void,
}

const VolumeTimeLine = ({ value, onChange }: Props) => {
    return (
        <div className="flex flex-col justify-around w-40 h-full mx-6">
            <Text className="text-lg">Volume</Text>
            <div className="flex w-full items-center">
                <StyledSlider 
                    value={value}
                    onChange={onChange}
                    max={100}
                    className="w-full"
                    step={10}
                    tooltip={{ formatter: null }}
                />
                <Text className="font-semibold ml-6">
                    { 
                        value 
                    }
                </Text>
            </div>
        </div>
    )
}

export default VolumeTimeLine