import Section from '@/components/primitives/Section';
import TeamsSection from '@/components/teams/TeamsSection';
import { mapTeamsBlock, WPTeamsBlockCMS } from '@/lib/mappers/mapTeamsBlock'
import React from 'react'

const TeamsBlock = ({data}: {data: WPTeamsBlockCMS}) => {

  const block = mapTeamsBlock(data);
  return (
   <Section  className={`${block.cssClass || ""} overflow-x-hidden`} sectionWidth={block.sectionWidth} backgroundColor={block.backgroundColor || 'transparent'} backgroundImageUrl={block?.backgroundImage} backgroundImageAlt={block?.backgroundImageAlt}>
     <TeamsSection block={block} />
   </Section>
  )
}

export default TeamsBlock
