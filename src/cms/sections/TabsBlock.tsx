

import Section from '@/components/primitives/Section';
import TabsSection from '@/components/tabs/TabsSection';
import { mapTabsBlock, WPTabsBlockCMS } from '@/lib/mappers/mapTabsBlock';
import React from 'react'

const TimelineBlock = ({ data }: { data: WPTabsBlockCMS }) => {
   

const block = mapTabsBlock(data);

    return (
        <Section className={`${block.cssClass || ""} `} sectionWidth={block.sectionWidth} 
        >
            <TabsSection block={block} />
        </Section>
    )
}

export default TimelineBlock
