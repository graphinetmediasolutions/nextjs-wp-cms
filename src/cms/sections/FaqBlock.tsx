
import FaqSection from '@/components/faq/FaqSection';
import Section from '@/components/primitives/Section';
import { mapFaqBlock, WPFaqBlockCMS } from '@/lib/mappers/mapFaqBlock';
import React from 'react'

const FaqBlock = ({ data }: { data: WPFaqBlockCMS }) => {

    const block = mapFaqBlock(data);


    return (
        <Section className={`${block.cssClass || ""} overflow-x-hidden relative`} padY='py-0' sectionWidth={["Box Width"]} 
        >
        
            <FaqSection block={block} />
        </Section>
    )
}

export default FaqBlock
