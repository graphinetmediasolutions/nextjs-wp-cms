import GallerySection from '@/components/gallery/GallerySection';
import Section from '@/components/primitives/Section';
import { mapMediaGalleryBlock, WPMediaGalleryBlockCMS } from '@/lib/mappers/mapGalleryBlock';
import React from 'react'

const GalleryBlock = ({ data }: { data: WPMediaGalleryBlockCMS }) => {

    console.log("data", data)

    const block = mapMediaGalleryBlock(data);

    console.log("gallery Block", block)


    return (
        <Section className={`${block.cssClass || ""} overflow-x-hidden relative my-8`} padY='py-0'sectionWidth={block.sectionWidth}
        >
        
            <GallerySection block={block} />
        </Section>
    )
}

export default GalleryBlock
