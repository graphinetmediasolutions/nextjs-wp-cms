import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading'
import VideoPlayer from '@/components/VideoPlayer'
import { VideoBlockData } from '@/lib/mappers/mapVideoBlock'
import React from 'react'

const VideoLayou1 = ({ block }: { block: VideoBlockData }) => {
  const { url, posterImage, title } = block
  return (

    <>
      <div className='headings mb-5 md:mb-10'>
        {
          block?.heading && (
            <SafeHeading
              className={`text-4xl md:text-5xl md:leading-[60px] font-semibold max-w-xxl mt-5 mb-5 relative`}
              as={block?.headingTag?.[0] as HeadingTag ?? "h2"}
              position={(block?.headingPosition?.[0] as HeadingPosition) ?? "Left"}

              style={{ color: "inherit" }}
              html={block.heading}

            />
          )
        }

      </div>


      <div className='w-full overflow-hidden relative rounded-lg '>
        {
          title && <SafeHeading
          className='absolute top-10 z-10 left-1/2 -translate-x-1/2 text-white'
            html={title}
          />
        }

        <VideoPlayer
          url={url}
          className="w-full h-full object-cover object-center"
          autoPlay={false}
          controls={false}
          poster={posterImage ?? ""}
          videoParentClass='w-full max-h-[600px]'


        />

      </div>

    </>

  )
}

export default VideoLayou1
