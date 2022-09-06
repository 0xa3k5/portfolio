import cx from 'classnames';
import { NotionPost } from '../../../../@types/schema';
import { useState } from 'react';
import Image from 'next/image';
import Button from '../../Button';
import { hexToRGB } from '../../../utils/hexToRGB';
import { motion } from 'framer-motion';

import RightArrowIcon from '../../../../public/icons/right-arrow-plain.svg';
interface SideProjectCardProps {
  className?: string;
  post: NotionPost;
}

export default function SideProjectCard({
  className,
  post,
}: SideProjectCardProps): JSX.Element {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cx(
        className,
        'flex flex-col items-center justify-between overflow-clip rounded-xl duration-200 md:h-[30rem] md:flex-row md:rounded-2xl'
      )}
      style={{
        backgroundColor: isHover
          ? `rgba(${hexToRGB(post.properties.bgColor)},1)`
          : `rgba(255,255,255,0.05)`,
      }}
    >
      <div className='flex p-24 md:w-1/2'>
        <div className='flex max-w-full flex-col flex-wrap items-center space-y-4 text-center md:max-w-md md:items-start md:space-y-6 md:text-left'>
          <span className='text-sm uppercase tracking-widest opacity-80'>
            {post.details.period} – {post.org.orgName}
          </span>
          <h3 className='text-3xl font-semibold md:text-4xl'>
            {post.details.title}
          </h3>
          <Button.Secondary
            hover={isHover}
            href={`/works/${encodeURIComponent(post.properties.slug)}`}
            color={post.properties.color}
            bgColor={post.properties.bgColor}
            icon={<RightArrowIcon />}
          />
        </div>
      </div>
      <div className='relative hidden h-full w-2/3 md:block'>
        <Image
          src={post.details.img}
          alt=''
          layout='fill'
          objectFit='contain'
          objectPosition='bottom'
        />
      </div>
    </motion.div>
  );
}
