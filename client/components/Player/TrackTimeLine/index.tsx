import { Typography } from "antd"
import { useDeferredValue, useEffect, useMemo, useState } from "react"
import convertSecToMin from "../../../utils/convertSecToMin"
import StyledSlider from "../../UI/StyledSlider"
import React from "react"

const { Text } = Typography

interface TrackTimeLineProps { 
    artist: string,
    name: string,
    disabled?: boolean,
    onChange?: Function,
    duration: number,
    value: number,
    convertedDuration: string,
    onAfterChange: (value: number) => void,
}

const TrackTimeLine = ({ 
    artist, 
    name, 
    duration, 
    disabled, 
    value, 
    convertedDuration, 
    onAfterChange, 
    onChange 
}: TrackTimeLineProps) => {
    const [current, setCurrent] = useState(0)

    const handleChange = (value: number): void => {
        onChange()
        setCurrent(value)
    }

    useEffect(() => {
        setCurrent(value)
    }, [value])

    const defferedCurrent = useDeferredValue(current)
    const convertedCurrent = useMemo(() => convertSecToMin(defferedCurrent), [defferedCurrent])
    
    return (
        <div className="flex w-3/5 flex-col h-full justify-between">
            <div className="flex">
                <Text className="text-lg">{`${artist} - ${name}`}</Text>
            </div>
            <div className="flex flex-col">
                <StyledSlider 
                    disabled={disabled}
                    max={duration} 
                    value={current}
                    onChange={handleChange}
                    onAfterChange={onAfterChange}
                    tooltip={{formatter: convertSecToMin}}
                />
                <div className="flex justify-between font-semibold mt-1">
                    <Text>{convertedCurrent}</Text>
                    <Text>{convertedDuration}</Text>
                </div>
            </div>
        </div>
    )
}

export default React.memo(TrackTimeLine)