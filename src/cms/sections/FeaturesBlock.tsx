
import FaqSection from '@/components/faq/FaqSection';
import FeaturesSection from '@/components/features/FeaturesSection';
import Section from '@/components/primitives/Section';
import { mapFeaturesBlock, WPFeaturesBlockCMS } from '@/lib/mappers/mapFeaturesBlock';
import React from 'react'

const FeaturesBlock = ({ data }: { data: WPFeaturesBlockCMS }) => {
   

const block = mapFeaturesBlock(data);

    return (
        <Section className={`${block.cssClass || ""} overflow-x-hidden`} sectionWidth={block.sectionWidth} backgroundColor={block.backgroundColor || 'transparent'} 
        >
        
            <FeaturesSection block={data} />
        </Section>
    )
}

export default FeaturesBlock
