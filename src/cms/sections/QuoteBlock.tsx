import Section from '@/components/primitives/Section';
import QuoteSection from '@/components/quote/QuoteSection';
import { mapQuoteBlock, WPQuoteBlockCMS } from '@/lib/mappers/mapQuoteBlock';
import React from 'react'

const PricingBlock = ({ data }: { data: WPQuoteBlockCMS }) => {
 
    const block = mapQuoteBlock(data);


    return (
        <Section className={`${block?.cssClass || ""} overflow-x-hidden relative`} padY='py-0'sectionWidth={block?.sectionWidth} 
        >
        
            <QuoteSection block={block} />
        </Section>
    )
}

export default PricingBlock;
