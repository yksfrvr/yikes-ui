import React, { CSSProperties, useRef, useEffect, useState, useCallback } from 'react';
import './Base.css';
import { RenderThumb, RenderTrack } from '../types';

interface BaseScrollProps {
  children: React.ReactNode;
  thumbWidth?: string;
  showScrollbar?: boolean;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  className?: string;
  style?: CSSProperties;
  renderThumb: RenderThumb;
  renderTrack: RenderTrack;
}

const BaseScroll: React.FC<BaseScrollProps> = ({
  children,
  thumbWidth = '8px',
  showScrollbar = true,
  onScroll,
  className,
  style,
  renderThumb,
  renderTrack,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbHeight, setThumbHeight] = useState('0px');
  const [thumbTop, setThumbTop] = useState('0px');
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startThumbTop = useRef(0);

  const updateScrollbar = useCallback(() => {
    const content = contentRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;

    if (content && thumb && track) {
      const contentHeight = content.scrollHeight;
      const visibleHeight = content.clientHeight;
      const scrollRatio = visibleHeight / contentHeight;

      if (scrollRatio < 1) {
        const newThumbHeight = visibleHeight * scrollRatio;
        setThumbHeight(`${Math.max(newThumbHeight, 20)}px`); // Minimum thumb height
        const scrollTop = content.scrollTop;
        const scrollTrackHeight = track.clientHeight;
        const newThumbTop = (scrollTop / (contentHeight - visibleHeight)) * (scrollTrackHeight - newThumbHeight);
        setThumbTop(`${newThumbTop}px`);
      } else {
        setThumbHeight('0px'); // Hide thumb if no scroll needed
      }
    }
  }, []);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      updateScrollbar();
      onScroll?.(e);
    },
    [onScroll, updateScrollbar]
  );

  const handleThumbMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!contentRef.current || !thumbRef.current) return;
      e.preventDefault();
      setIsDragging(true);
      startY.current = e.clientY;
      startThumbTop.current = parseFloat(thumbRef.current.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
      document.body.style.userSelect = 'none'; // Prevent text selection during drag
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !contentRef.current || !thumbRef.current || !trackRef.current) return;

      const deltaY = e.clientY - startY.current;
      const content = contentRef.current;
      const track = trackRef.current;
      const thumb = thumbRef.current;

      const contentHeight = content.scrollHeight;
      const visibleHeight = content.clientHeight;
      const scrollTrackHeight = track.clientHeight;
      const currentThumbHeight = thumb.clientHeight;

      const maxThumbTravel = scrollTrackHeight - currentThumbHeight;
      const newThumbTop = Math.min(Math.max(0, startThumbTop.current + deltaY), maxThumbTravel);

      const scrollRatio = (contentHeight - visibleHeight) / maxThumbTravel;
      content.scrollTop = newThumbTop * scrollRatio;

      setThumbTop(`${newThumbTop}px`);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    updateScrollbar();
    window.addEventListener('resize', updateScrollbar);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('resize', updateScrollbar);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [updateScrollbar, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (contentRef.current) {
      // Re-calculate scrollbar when content changes
      const observer = new MutationObserver(updateScrollbar);
      observer.observe(contentRef.current, { childList: true, subtree: true, attributes: true });
      return () => observer.disconnect();
    }
  }, [updateScrollbar]);

  return (
    <div
      className={`scroll-container ${className || ''}`}
      style={{
        ...style,
        '--thumb-width': thumbWidth,
      } as CSSProperties}
    >
      <div ref={contentRef} className="scroll-content" onScroll={handleScroll}>
        {children}
      </div>
      {renderTrack({
        trackRef,
        thumbHeight: thumbHeight,
        showScrollbar: showScrollbar,
        children: renderThumb({ thumbHeight, thumbTop, handleThumbMouseDown, thumbRef }),
      })}
    </div>
  );
};

export default BaseScroll;
