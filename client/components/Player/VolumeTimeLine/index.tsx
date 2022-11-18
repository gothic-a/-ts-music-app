import { Typography } from "antd"
import StyledSlider from "../../UI/StyledSlider"
import React from "react"
import { SoundOutlined } from "@ant-design/icons"

const { Text } = Typography

interface VolumeTimeLineProps {
    value: number,
    onChange: (value: number) => void,
}

const VolumeTimeLine = ({ value, onChange }: VolumeTimeLineProps) => {
    return (
        <div className="flex flex-col justify-around items-start w-40 h-full mx-6">
            <SoundOutlined className="text-3xl"/>
            <div className="flex w-full items-center">
                <StyledSlider 
                    value={value}
                    onChange={onChange}
                    max={100}
                    className="w-full"
                    step={10}
                    tooltip={{ formatter: null }}
                />
                <Text className="font-semibold text-base ml-6">
                    { 
                        value 
                    }
                </Text>
            </div>
        </div>
    )
}

export default React.memo(VolumeTimeLine)