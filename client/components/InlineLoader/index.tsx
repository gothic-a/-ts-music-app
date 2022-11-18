import cn from 'classnames'
import { SyntheticEvent, useEffect, useState } from 'react'

interface InlineLoaderProps {
    isActive: boolean
}

enum LoaderState {
    transitionStart,
    transitionEnd,
    hide
}

const InlineLoader = ({ isActive }: InlineLoaderProps): JSX.Element => {
    const [loaderState, setLoaderState] = useState<LoaderState>(LoaderState.hide)

    const handleTransitionEnd = (e: SyntheticEvent): void => {
        const target = e.target as HTMLElement | null 
        const parent = target.parentElement as HTMLElement | null

        if(loaderState === LoaderState.hide) return
        if(target.offsetWidth === parent.offsetWidth) setLoaderState(LoaderState.hide)
    }   

    useEffect(() => {
        if(isActive) setLoaderState(LoaderState.transitionStart)
        else setLoaderState(LoaderState.transitionEnd)
    }, [isActive])

    return (
        <div 
            className={cn(
                `${
                    loaderState === LoaderState.transitionStart ? 'w-5/6' 
                        : loaderState === LoaderState.transitionEnd ? 'w-screen' 
                            : 'w-0' 
                }`,
                "fixed top-0 h-1.5 z-[1000] ease-in-out duration-1000",
            )}
            onTransitionEnd={handleTransitionEnd}
        >
            {
                loaderState !== LoaderState.hide && <div className="bg-[#177ddc] w-full h-full opacity-80"/>
            }
        </div>
    )
}

export default InlineLoader