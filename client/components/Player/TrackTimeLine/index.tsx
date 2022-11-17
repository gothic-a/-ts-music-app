import { Typography } from "antd"
import { useDeferredValue, useEffect, useMemo, useState } from "react"
import convertSecToMin from "../../../utils/convertSecToMin"
import StyledSlider from "../../UI/StyledSlider"
import React from "react"

const { Text } = Typography

interface Props { 
    artist: string,
    name: string,
    disabled: boolean,
    duration: number,
    value: number,
    convertedDuration: string,
    onAfterChange: (value: number) => void,
}

const TrackTimeLine = ({ artist, name, duration, disabled, value, convertedDuration, onAfterChange }: Props) => {
    const [current, setCurrent] = useState(0)

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
                    onChange={setCurrent}
                    onAfterChange={(value) => onAfterChange(value)}
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