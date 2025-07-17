"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import PlayerControls from "./player-controls";
import { useVideoContext } from "@/src/hooks/use-video-context";

interface VideoPlayer360Props {
  src: string;
  videoId: string;
  initialMuted?: boolean;
  initialVolume?: number;
}

export default function VideoPlayer360({
  src,
  videoId,
  initialMuted = true,
  initialVolume = 0.5,
}: VideoPlayer360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const zoomRef = useRef(0.8);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(initialMuted);
  const [volume, setVolume] = useState(initialVolume);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [zoom, setZoom] = useState(0.75); // Zoom level (1 = normal, 0.5 = zoomed in, 2 = zoomed out)

  const { activeVideoId, playVideo, pauseVideo } = useVideoContext();

  const shouldBePlaying = activeVideoId === videoId;

  // Sync video state with context
  useEffect(() => {
    if (!videoRef.current) return;

    if (shouldBePlaying && !playing) {
      // Context says this video should be playing, but it's not
      videoRef.current.play().catch(() => {});
    } else if (!shouldBePlaying && playing) {
      // Context says this video should not be playing, but it is
      videoRef.current.pause();
    }
  }, [shouldBePlaying, playing]);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;
    const video = videoRef.current;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let sphere: THREE.Mesh;
    let texture: THREE.VideoTexture;
    let handleResize: () => void;
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);

      // Check if WebGL is supported and working
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) {
          setUseFallback(true);
          return;
        }
        createThreeJSScene();
        video.play().catch(() => {});
      } catch (error) {
        console.warn("WebGL not supported, using fallback video player");
        setUseFallback(true);
      }
    };

    const createThreeJSScene = () => {
      if (scene) return;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(window.devicePixelRatio);

      // Set initial size to match container
      const container = containerRef.current!;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      renderer.setSize(containerWidth, containerHeight, false);
      container.appendChild(renderer.domElement);

      // Ensure canvas fills container properly
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.objectFit = "contain";
      renderer.domElement.style.display = "block";
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      const geometry = new THREE.SphereGeometry(500, 120, 60);
      geometry.scale(-1, -1, 1);
      texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;
      texture.generateMipmaps = false;
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;

      // Force texture update for Safari/Arc compatibility
      texture.needsUpdate = true;
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
      });
      sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      camera.position.z = 1;
      // Mouse controls
      const handleMouseDown = (event: MouseEvent) => {
        isMouseDown = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
      };
      const handleMouseMove = (event: MouseEvent) => {
        if (!isMouseDown) return;
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        targetRotationX = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, targetRotationX)
        );
        mouseX = event.clientX;
        mouseY = event.clientY;
      };
      const handleMouseUp = () => {
        isMouseDown = false;
      };
      renderer.domElement.addEventListener("mousedown", handleMouseDown);
      renderer.domElement.addEventListener("mousemove", handleMouseMove);
      renderer.domElement.addEventListener("mouseup", handleMouseUp);
      renderer.domElement.addEventListener("mouseleave", handleMouseUp);

      // Add wheel event for zoom
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const zoomSpeed = 0.1;
        const zoomDelta = event.deltaY > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
        setZoom((prevZoom) => {
          const newZoom = Math.max(0.3, Math.min(3, prevZoom * zoomDelta));
          zoomRef.current = newZoom; // Update ref for animation loop
          return newZoom;
        });
      };

      renderer.domElement.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      const animate = () => {
        requestAnimationFrame(animate);
        currentRotationX += (targetRotationX - currentRotationX) * 0.1;
        currentRotationY += (targetRotationY - currentRotationY) * 0.1;
        sphere.rotation.x = currentRotationX;
        sphere.rotation.y = currentRotationY;

        // Apply zoom to camera FOV
        camera.fov = 75 / zoomRef.current;
        camera.updateProjectionMatrix();

        if (texture && video.readyState >= video.HAVE_CURRENT_DATA) {
          texture.needsUpdate = true;
        }
        renderer.render(scene, camera);
      };
      animate();
      handleResize = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);

        // Ensure canvas maintains proper sizing
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
      };
      window.addEventListener("resize", handleResize);

      // Cleanup wheel event listener
      return () => {
        renderer.domElement.removeEventListener("wheel", handleWheel);
      };
    };

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleTimeUpdate = () => setCurrent(video.currentTime);
    const handleError = () => {};

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
      if (renderer) {
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
      }
    };
  }, [src]);

  const togglePlay = async () => {
    if (!videoRef.current) return;
    try {
      if (videoRef.current.paused) {
        // Notify context that this video is starting to play
        playVideo(videoId);
        await videoRef.current.play();
      } else {
        // Notify context that this video is pausing
        pauseVideo(videoId);
        videoRef.current.pause();
      }
    } catch {}
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    videoRef.current.muted = newVolume === 0;
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleSeek = (newTime: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(newTime, duration));
  };

  const handleSkipBackward = () => {
    handleSeek(current - 5);
  };

  const handleSkipForward = () => {
    handleSeek(current + 5);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => {
      const newZoom = Math.max(0.3, prevZoom * 0.8);
      zoomRef.current = newZoom;
      return newZoom;
    });
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => {
      const newZoom = Math.min(3, prevZoom * 1.2);
      zoomRef.current = newZoom;
      return newZoom;
    });
  };

  const handleZoomReset = () => {
    setZoom(0.8);
    zoomRef.current = 0.8;
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {useFallback ? (
        <video
          ref={videoRef}
          src={src}
          crossOrigin="anonymous"
          playsInline
          muted={muted}
          className="w-full h-full object-cover"
          preload="metadata"
          webkit-playsinline="true"
          x-webkit-airplay="allow"
        />
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            crossOrigin="anonymous"
            playsInline
            muted={muted}
            style={{
              position: "absolute",
              top: "-9999px",
              left: "-9999px",
              width: "auto",
              height: "auto",
              opacity: 0,
              pointerEvents: "none",
            }}
            preload="metadata"
            webkit-playsinline="true"
            x-webkit-airplay="allow"
          />
          <div
            ref={containerRef}
            className="size-full relative cursor-grab active:cursor-grabbing"
          />
        </>
      )}
      <PlayerControls
        playing={playing}
        muted={muted}
        volume={volume}
        current={current}
        duration={duration}
        zoom={zoom}
        onPlayPause={togglePlay}
        onMute={toggleMute}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
        onSkipBackward={handleSkipBackward}
        onSkipForward={handleSkipForward}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
      />
    </div>
  );
}
