import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { PlayIcon, PauseIcon } from '@/components/icons';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  duration: string;
}

const PlayerContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(3)};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const PlayButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ProgressContainer = styled.div`
  flex: 1;
  margin: 0 ${({ theme }) => theme.spacing(2)};
`;

const ProgressBar = styled.input.attrs({ type: 'range' })`
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    border: none;
  }
`;

const TimeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.h3};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function AudioPlayer({ audioUrl, title, duration }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setTotalDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <PlayerContainer>
      <Title>{title}</Title>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <PlayerControls>
        <PlayButton onClick={togglePlayPause}>
          {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
        </PlayButton>

        <ProgressContainer>
          <ProgressBar
            value={currentTime}
            max={totalDuration}
            onChange={handleProgressChange}
          />
          <TimeInfo>
            <span>{formatTime(currentTime)}</span>
            <span>{duration}</span>
          </TimeInfo>
        </ProgressContainer>
      </PlayerControls>
    </PlayerContainer>
  );
}
