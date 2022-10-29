import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface VideoProps {
  src: string;
}

export default function Video({ src }: VideoProps): JSX.Element {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPaused(false);
  };

  const handlePause = () => {
    videoRef.current.pause();
    setIsPaused(true);
  };

  const handleClick = () => {
    isPaused ? handlePlay() : handlePause();
  };

  return (
    <div className="relative h-full w-full" onClick={() => handleClick()}>
      <div
        className={`absolute top-0 left-0 z-10 h-full w-full bg-midnight duration-200 ${
          isPaused ? "bg-opacity-40 opacity-100" : "bg-opacity-0 opacity-0"
        }`}
      >
        <motion.div
          className="flex h-full w-full items-center justify-center gap-4"
          initial={{ scale: 0.4 }}
          animate={isPaused ? { scale: 1 } : { scale: 0.4 }}
        >
          <div className="h-1/6 w-4 rounded-full bg-white" />
          <div className="h-1/6 w-4 rounded-full bg-white" />
        </motion.div>
      </div>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        style={{ objectFit: "cover" }}
        className="absolute top-0 block h-full w-full"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
