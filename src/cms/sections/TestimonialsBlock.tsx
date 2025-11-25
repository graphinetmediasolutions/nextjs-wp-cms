import React from 'react'
import Section from "@/components/primitives/Section";
import { mapTestimonialBlock, WPTestimonialBlockCMS } from '@/lib/mappers/mapTestimonialBlock'
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';

const TestimonialsBlock = ({data} : {data: WPTestimonialBlockCMS }) => {

  const block = mapTestimonialBlock(data);

     return (
        <Section className={`${block.cssClass || ""} overflow-x-hidden`} sectionWidth={block.sectionWidth} backgroundColor={block.backgroundColor || 'transparent'} backgroundImageUrl={block?.backgroundImage} backgroundImageAlt={block?.backgroundImageAlt}>
          <TestimonialsSection  block={block} />
        </Section>
      );

}

export default TestimonialsBlock
