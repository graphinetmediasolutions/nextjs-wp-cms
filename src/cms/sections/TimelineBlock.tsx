
// import FaqSection from '@/components/faq/FaqSection';
// import FeaturesSection from '@/components/features/FeaturesSection';
import Section from '@/components/primitives/Section';
import TimelineSection from '@/components/timeline/TimlineSection';
// import { mapFeaturesBlock, WPFeaturesBlockCMS } from '@/lib/mappers/mapFeaturesBlock';
import { mapTimelineBlock, WPTimelineBlockCMS } from '@/lib/mappers/mapTimelineBlock';
import React from 'react'

const TimelineBlock = ({ data }: { data: WPTimelineBlockCMS }) => {
   

const block = mapTimelineBlock(data);

    return (
        <Section className={`${block.cssClass || ""} `} sectionWidth={block.sectionWidth} 
        >
        
            {/* <FeaturesSection block={data} /> */}
            <TimelineSection block={block} />
        </Section>
    )
}

export default TimelineBlock
