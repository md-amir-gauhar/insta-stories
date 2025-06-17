"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Loader from "./Loader";
import { stories, Story } from "@/constants/stories";

const IMAGE_DURATION = 5000; // 10 seconds
const MAX_VIDEO_DURATION = 30000; // 30 seconds

const Stories: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setCurrentIndex(stories.findIndex((s) => s.id === story.id));
    setProgress(0);
    setVideoDuration(0);
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedStory(null);
    setProgress(0);
    setVideoDuration(0);
  };

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setIsLoading(true);
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setCurrentIndex((prev) => prev - 1);
      setSelectedStory(stories[currentIndex - 1]);
      setProgress(0);
      setVideoDuration(0);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setIsLoading(true);
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setCurrentIndex((prev) => prev + 1);
      setSelectedStory(stories[currentIndex + 1]);
      setProgress(0);
      setVideoDuration(0);
    }
  }, [currentIndex]);

  // Progress bar logic
  useEffect(() => {
    if (!selectedStory) return;
    setProgress(0);
    if (progressInterval.current) clearInterval(progressInterval.current);

    if (selectedStory.type === "image") {
      const start = Date.now();
      progressInterval.current = setInterval(() => {
        const elapsed = Date.now() - start;
        setProgress(Math.min(elapsed / IMAGE_DURATION, 1));
        if (elapsed >= IMAGE_DURATION) {
          clearInterval(progressInterval.current!);
          handleNext();
        }
      }, 50);
      return () => clearInterval(progressInterval.current!);
    }
    if (selectedStory.type === "video" && videoRef.current) {
      const updateProgress = () => {
        if (videoRef.current) {
          const duration = Math.min(videoRef.current.duration * 1000, MAX_VIDEO_DURATION);
          setVideoDuration(duration);
          setProgress(Math.min(videoRef.current.currentTime * 1000 / duration, 1));
        }
      };
      videoRef.current.addEventListener("timeupdate", updateProgress);
      videoRef.current.addEventListener("loadedmetadata", updateProgress);
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("timeupdate", updateProgress);
          videoRef.current.removeEventListener("loadedmetadata", updateProgress);
        }
      };
    }
  }, [selectedStory, handleNext]);

  useEffect(() => {
    if (selectedStory && selectedStory.type === "video" && videoRef.current) {
      // If video is longer than 30s, jump to end at 30s
      const onLoadedMetadata = () => {
        if (videoRef.current) {
          const duration = videoRef.current.duration * 1000;
          setVideoDuration(Math.min(duration, MAX_VIDEO_DURATION));
          if (duration > MAX_VIDEO_DURATION) {
            videoRef.current.currentTime = MAX_VIDEO_DURATION / 1000;
          }
        }
      };
      videoRef.current.addEventListener("loadedmetadata", onLoadedMetadata);
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("loadedmetadata", onLoadedMetadata);
        }
      };
    }
  }, [selectedStory]);

  useEffect(() => {
    if (selectedStory && selectedStory.type === "video" && videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          // Autoplay might be blocked
          console.warn('Autoplay prevented:', e);
        });
      }
    }
  }, [selectedStory, isMuted]);

  const handleVideoEnded = () => {
    handleNext();
  };

  const handleMediaLoad = () => {
    setIsLoading(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div className="max-w-full mx-auto px-2.5">
      <div className="flex overflow-x-auto gap-2.5 py-2.5 scrollbar-hide">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex-none w-[70px] h-[70px] rounded-full overflow-hidden relative cursor-pointer"
            onClick={() => handleStoryClick(story)}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743] p-[2px] rounded-full">
              <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
                <img
                  src={story.avatarUrl}
                  alt={`${story.username}'s avatar`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <span className="absolute -bottom-5 left-0 right-0 text-center text-xs text-[#262626] truncate">
              {story.username}
            </span>
          </div>
        ))}
      </div>

      {selectedStory && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="p-2.5 flex justify-between items-center text-white bg-black/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={selectedStory.avatarUrl}
                  alt={`${selectedStory.username}'s avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-medium">{selectedStory.username}</span>
            </div>
            <div className="flex items-center gap-2">
              {selectedStory.type === 'video' && (
                <button
                  onClick={toggleMute}
                  className="bg-transparent border-none text-white cursor-pointer p-1.5 hover:opacity-80 transition-opacity"
                >
                  {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              )}
              <button
                className="bg-transparent border-none text-white text-2xl cursor-pointer p-1.5"
                onClick={handleClose}
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex items-center justify-center">
            <div
              className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
              onClick={handlePrevious}
            />
            {isLoading && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Loader />
              </div>
            )}
            {selectedStory.type === 'image' ? (
              <img
                src={selectedStory.imageUrl}
                alt={`${selectedStory.username}'s story`}
                onLoad={handleMediaLoad}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                ref={videoRef}
                src={selectedStory.videoUrl}
                onLoadedData={handleMediaLoad}
                onEnded={handleVideoEnded}
                onError={(e) => {
                  console.error('Video loading error:', e);
                  setIsLoading(false);
                  handleNext();
                }}
                className="max-w-full max-h-full object-contain"
                playsInline
                autoPlay
                muted={isMuted}
                preload="auto"
              >
                Sorry, your browser doesn't support embedded videos.
              </video>
            )}
            <div
              className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
              onClick={handleNext}
            />
          </div>

          {/* Progress Bar */}
          <div className="flex gap-1 p-2.5 bg-black/50">
            {stories.map((story, index) => (
              <div
                key={index}
                className={`flex-1 h-0.5 rounded-sm bg-white/30`}
              >
                {index === currentIndex && (
                  <div
                    className={`h-full rounded-sm bg-white ${selectedStory?.type === 'video' ? '' : 'transition-all duration-75'}`}
                    style={{
                      width: `${progress * 100}%`,
                      transition: selectedStory?.type === 'video' ? 'width 0.2s linear' : undefined,
                    }}
                  />
                )}
                {index < currentIndex && (
                  <div className="h-full rounded-sm bg-white w-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
