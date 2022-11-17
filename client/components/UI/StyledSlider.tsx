import { Slider } from "antd"
import type { SliderSingleProps } from "antd/lib/slider"
import cn from 'classnames'

const StyledSlider = ({ className, ...props }: SliderSingleProps): JSX.Element => {
    return (
        <Slider 
            {...props}
            className={cn("m-0", className)}
            trackStyle={{backgroundColor: '#177ddc'}}
            handleStyle={{borderColor: '#177ddc'}}
        />
    )
}

export default StyledSlider