import "./Info.css";

type Props = {
  symbol?: string;
  message: string;
};

const Info = ({ symbol = "!", message }: Props) => {
  return (
    <div className="info-tooltip-wrapper">
      <div className="info-tooltip-icon">
        <span>{symbol}</span>
      </div>
      <div className="info-tooltip-popup">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Info;
