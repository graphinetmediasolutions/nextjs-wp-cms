import PricingSection from '@/components/pricing/PricingSection';
import Section from '@/components/primitives/Section';
import { mapPricingBlock, WPPricingBlockCMS } from '@/lib/mappers/mapPricingBlock';
import React from 'react'

const PricingBlock = ({ data }: { data: WPPricingBlockCMS }) => {
   
    const block = mapPricingBlock(data);

    


    return (
        <Section className={`${block?.cssClass || ""} overflow-x-hidden relative`} padY='py-0'sectionWidth={block?.sectionWidth} 
        >
        
            <PricingSection block={block} />
        </Section>
    )
}

export default PricingBlock;
