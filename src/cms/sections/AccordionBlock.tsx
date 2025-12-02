import React from 'react'
import Section from '@/components/primitives/Section';
import { mapAccordionBlock, WPAccordionBlockCMS } from '@/lib/mappers/mapAccordionBlock';
import AccordionSection from '@/components/Accordion/AccordionSection';

const AccordionBlock = ({ data }: { data: WPAccordionBlockCMS }) => {

    const block = mapAccordionBlock(data);
    return (
        <Section className={`${block.cssClass || ""} overflow-x-hidden relative`} padY='py-0' sectionWidth={["Box Width"]} 
        >
            <AccordionSection block={block} />
        </Section>
    )
}

export default AccordionBlock
