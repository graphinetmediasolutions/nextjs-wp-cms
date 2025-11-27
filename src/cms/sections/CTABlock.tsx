import CTASection from '@/components/CTA/CTASection';
import Section from '@/components/primitives/Section';
// import TeamsSection from '@/components/teams/TeamsSection';
// import { mapTeamsBlock, WPTeamsBlockCMS } from '@/lib/mappers/mapTeamsBlock'
import { mapCTABlock, WPCTABlockCMS } from '@/lib/mappers/mapCTABlock';
import React from 'react'

const CTABlock = ({ data }: { data: WPCTABlockCMS }) => {

    const block = mapCTABlock(data);

    // console.log(block?.sectionWidth)

    return (
        <Section className={`${block.cssClass || ""} overflow-x-hidden relative`} padY='py-0' sectionWidth={["Box Width"]} 
        backgroundColor={block?.sectionWidth && block?.sectionWidth[0] === "Full Width" ? block?.backgroundColor : 'transparent'} 
        backgroundImageUrl={block?.sectionWidth && block?.sectionWidth[0] === "Full Width" ? block?.backgroundImage : ""} 
        backgroundImageAlt={block?.backgroundImageAlt}
        overlay={block?.sectionWidth?.[0] === "Full Width" && block?.backgroundImage ? "bg-black/40" : ""}
        >
              {/* {block?.sectionWidth?.[0] === "Full Width" && block?.backgroundImage && (
                <div className="absolute inset-0 z-0  bg-black/40 rounded-2xl"></div>
            )} */}
            <CTASection block={block} />
        </Section>
    )
}

export default CTABlock
