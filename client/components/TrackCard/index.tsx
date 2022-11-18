import { Typography, Divider } from 'antd'
import cn from 'classnames'
import convertSecToMin from '../../utils/convertSecToMin'
import React from 'react'

const { Text } = Typography

interface TrackCardProps {
    imagePreview?: string,
    trackPath?: string,
    name?: string,
    artist?: string,
    trackSize?: number,
    trackDuration?: number,
    className?: string
}

const TrackCard = ({ 
    imagePreview, 
    trackPath, 
    name, 
    artist, 
    trackSize, 
    trackDuration, 
    className 
}: TrackCardProps): JSX.Element => {
    const convertedDuration = trackDuration && convertSecToMin(trackDuration, { label: true })
    
    return (
        <div className={cn(
            "flex flex-col w-full p-4 bg-[#1f1f1f] rounded-lg h-max items-center duration-700",
            className
        )}>
            <div className="w-36 h-36 rounded-full flex mb-4 bg-[#141414]">
                {
                    imagePreview && (
                        <img 
                            className="rounded-full object-cover"
                            src={imagePreview} 
                            alt="image"  
                        />
                    )
                }
            </div>
            <div className="flex flex-col items-start text-base leading-5">
                {
                    trackPath && (
                        <>
                            <div className='flex w-full justify-between items-center'>
                                <Text className="w-4/5">{trackPath}</Text>
                                <div className="flex flex-col w-1/5 text-xs opacity-60 bg-[#141414] py-1 px-2 rounded-lg">
                                    <Text className="mb-1">{ trackSize } MB</Text>
                                    <Text>{ convertedDuration }</Text>
                                </div>
                            </div>
                            <Divider className="my-4"/>
                        </>
                    ) 
                }
                { 
                    (artist || name) && <Text>{`${artist ?? ''} - ${name ?? ''}`}</Text>
                }
            </div>
        </div>
    )
}

export default React.memo(TrackCard)