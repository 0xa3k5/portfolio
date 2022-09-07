import Image from 'next/image';
import { Exploration } from '../../../../@types/schema';

interface ExplorationsCardProps {
  exploration: Exploration;
}

export default function ExplorationsCard({
  exploration,
}: ExplorationsCardProps): JSX.Element {
  return (
    <div className='aspect-square overflow-clip rounded-xl bg-white bg-opacity-10'>
      {exploration.type === 'video' ? (
        <video
          autoPlay
          muted
          loop
          style={{ objectFit: 'cover' }}
          className='h-full w-full'
        >
          <source src={exploration.img} type='video/mp4' />
        </video>
      ) : (
        <div className='relative h-full w-full'>
          <Image
            src={exploration.img}
            alt={exploration.name}
            layout='fill'
            objectFit='cover'
          />
        </div>
      )}
    </div>
  );
}
