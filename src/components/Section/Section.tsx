import React from 'react';
import SectionHeader from './SectionHeader';

interface SectionProps {
  title: string;
  link: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, link, children }) => (
  <div className="w-full">
    <SectionHeader title={title} link={link} />
    {children}
  </div>
);

export default Section;
