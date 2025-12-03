import Section from '@/components/primitives/Section'
import VideoSection from '@/components/video/VideoSection'
import { mapVideoBlock, WPVideoBlockCMS } from '@/lib/mappers/mapVideoBlock'
import React from 'react'

const VideoBlock = ({data}: {data:  WPVideoBlockCMS}) => {
    console.log("video block", data)

    const block = mapVideoBlock(data)
    return (

        <Section className={`${block.cssClass || ""} overflow-x-hidden relative`} padY='py-0'sectionWidth={block.sectionWidth}>
            <VideoSection block={block} />
        </Section>
        
    )
}

export default VideoBlock
