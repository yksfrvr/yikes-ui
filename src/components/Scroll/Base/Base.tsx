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
  autoHide?: boolean;
  autoHideDelay?: number;
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
  autoHide = true,
  autoHideDelay = 250,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbHeight, setThumbHeight] = useState('0px');
  const [thumbTop, setThumbTop] = useState('0px');
  const [isDragging, setIsDragging] = useState(false);
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(!autoHide);
  const [isTrackHovered, setIsTrackHovered] = useState(false);
  const startY = useRef(0);
  const startThumbTop = useRef(0);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showScrollbarTemporarily = useCallback(() => {
    if (!autoHide) return;

    setIsScrollbarVisible(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      if (!isDragging && !isTrackHovered) {
        setIsScrollbarVisible(false);
      }
    }, autoHideDelay);
  }, [autoHide, autoHideDelay, isDragging, isTrackHovered]);

  const handleTrackMouseEnter = useCallback(() => {
    setIsTrackHovered(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setIsScrollbarVisible(true);
  }, []);

  const handleTrackMouseLeave = useCallback(() => {
    setIsTrackHovered(false);
    if (autoHide && !isDragging) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setIsScrollbarVisible(false);
      }, autoHideDelay);
    }
  }, [autoHide, isDragging, autoHideDelay]);

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
        setThumbHeight(`${Math.max(newThumbHeight, 20)}px`);
        const scrollTop = content.scrollTop;
        const scrollTrackHeight = track.clientHeight;
        const newThumbTop = (scrollTop / (contentHeight - visibleHeight)) * (scrollTrackHeight - newThumbHeight);
        setThumbTop(`${newThumbTop}px`);
      } else {
        setThumbHeight('0px');
      }
    }
  }, []);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      updateScrollbar();
      showScrollbarTemporarily();
      onScroll?.(e);
    },
    [onScroll, updateScrollbar, showScrollbarTemporarily]
  );

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Ignore if the click was on the thumb itself
      if (!contentRef.current || !trackRef.current || !thumbRef.current) return;
      if (thumbRef.current.contains(e.target as Node)) return;

      const track = trackRef.current;
      const content = contentRef.current;
      const thumb = thumbRef.current;

      const trackRect = track.getBoundingClientRect();
      const clickY = e.clientY - trackRect.top;

      const contentHeight = content.scrollHeight;
      const visibleHeight = content.clientHeight;
      const scrollTrackHeight = track.clientHeight;
      const currentThumbHeight = thumb.clientHeight;
      const maxThumbTravel = scrollTrackHeight - currentThumbHeight;

      // Position thumb so cursor is at its center
      const newThumbTop = Math.min(Math.max(0, clickY - currentThumbHeight / 2), maxThumbTravel);

      const scrollRatio = (contentHeight - visibleHeight) / maxThumbTravel;
      content.scrollTop = newThumbTop * scrollRatio;

      setThumbTop(`${newThumbTop}px`);
    },
    []
  );

  const handleThumbMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!contentRef.current || !thumbRef.current) return;
      e.preventDefault();
      setIsDragging(true);
      setIsScrollbarVisible(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      startY.current = e.clientY;
      startThumbTop.current = parseFloat(thumbRef.current.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
      document.body.style.userSelect = 'none';
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
    if (autoHide) {
      showScrollbarTemporarily();
    }
  }, [autoHide, showScrollbarTemporarily]);

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
      const observer = new MutationObserver(updateScrollbar);
      observer.observe(contentRef.current, { childList: true, subtree: true, attributes: true });
      return () => observer.disconnect();
    }
  }, [updateScrollbar]);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const effectiveShowScrollbar = showScrollbar && (!autoHide || isScrollbarVisible || isTrackHovered);

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
        showScrollbar: effectiveShowScrollbar,
        onMouseEnter: handleTrackMouseEnter,
        onMouseLeave: handleTrackMouseLeave,
        onClick: handleTrackClick,
        children: renderThumb({ thumbHeight, thumbTop, handleThumbMouseDown, thumbRef }),
      })}
    </div>
  );
};

export default BaseScroll;
