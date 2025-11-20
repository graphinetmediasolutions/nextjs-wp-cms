import React from 'react'
// import { mapListingBlock, type ListingBlockData } from "@/lib/mappers/mapListingBlock";
import Section from "@/components/primitives/Section";
import { mapTestimonialBlock, type TestimonialBlockData, WPTestimonialBlockCMS } from '@/lib/mappers/mapTestimonialBlock'
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';

const TestimonialsBlock = ({data} : {data: WPTestimonialBlockCMS }) => {

  const block = mapTestimonialBlock(data);

     return (
        <Section className={`${block.cssClass || ""} overflow-x-hidden`} sectionWidth={block.sectionWidth} backgroundColor={block.backgroundColor || 'transparent'}>
          <TestimonialsSection  block={block} />
        </Section>
      );

}

export default TestimonialsBlock
