import "./BackgroundAurora.css";

import { cssPrefix } from "../../../utils/css";

const BackgroundAurora = () => {
  const cm = cssPrefix("full-size-aurora");

  return <div className={cm("container")}></div>;
};

export default BackgroundAurora;