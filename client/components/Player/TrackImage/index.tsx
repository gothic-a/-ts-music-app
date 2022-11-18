import Image from 'next/image'
import React from 'react'

interface TrackImageProps {
    image: string
}

const TrackImage = ({ image }: TrackImageProps): JSX.Element => {
    return (
        <div className="max-h-full mr-8">
            <Image 
                width={78}
                height={78}
                src={image}
            />
        </div>
    )
}

export default React.memo(TrackImage)