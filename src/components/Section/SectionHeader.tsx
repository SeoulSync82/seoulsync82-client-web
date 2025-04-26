import React from 'react';
import { Link } from 'react-router';

interface SectionHeaderProps {
  title: string;
  link: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, link }) => (
  <div className="flex h-[60px] w-full items-center justify-between px-[20px]">
    <h2 className="text-[20px] font-bold text-black">{title}</h2>
    <Link to={link} className="text-[14px] font-bold text-primary-500">
      더보기
    </Link>
  </div>
);

export default SectionHeader; 