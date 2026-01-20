import React, { CSSProperties } from 'react';
import BaseScroll from '../Base/Base';
import './Glass.css';
import { RenderThumb, RenderTrack } from '../types';

interface GlassScrollProps {
  children: React.ReactNode;
  thumbWidth?: string;
  thumbRadius?: string;
  showScrollbar?: boolean;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  className?: string;
  style?: CSSProperties;
}

const GlassScroll: React.FC<GlassScrollProps> = ({
  children,
  thumbWidth = '8px',
  thumbRadius = '4px',
  showScrollbar = true,
  onScroll,
  className,
  style,
}) => {
  const renderThumb: RenderThumb = ({ thumbHeight, thumbTop, handleThumbMouseDown, thumbRef }) => (
    <div
      ref={thumbRef}
      className="custom-scrollbar-thumb"
      style={{
        height: thumbHeight,
        transform: `translateY(${thumbTop})`,
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
      onMouseDown={handleThumbMouseDown}
    />
  );

  const renderTrack: RenderTrack = ({ trackRef, children: thumb, thumbHeight, showScrollbar }) => (
    <div
      ref={trackRef}
      className="custom-scrollbar-track"
      style={{
        opacity: showScrollbar && thumbHeight !== '0px' ? 1 : 0,
      }}
    >
      {thumb}
    </div>
  );

  return (
    <BaseScroll
      thumbWidth={thumbWidth}
      showScrollbar={showScrollbar}
      onScroll={onScroll}
      className={className}
      style={{
        ...style,
        '--thumb-radius': thumbRadius,
      } as CSSProperties}
      renderThumb={renderThumb}
      renderTrack={renderTrack}
    >
      {children}
    </BaseScroll>
  );
};

export default GlassScroll;
