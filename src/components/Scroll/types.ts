export type RenderThumb = (props: {
    thumbHeight: string;
    thumbTop: string;
    handleThumbMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    thumbRef: React.RefObject<HTMLDivElement>;
}) => React.ReactNode;
  
export type RenderTrack = (props: {
    trackRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    thumbHeight: string;
    showScrollbar: boolean;
}) => React.ReactNode;
