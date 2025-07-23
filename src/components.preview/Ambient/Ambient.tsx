import Ambient from "../../components/Image/Ambient";
import { AMBIENT_USAGE_DOC } from "../../const/docs";
import ComponentDoc from "../ComponentDoc";

const AmbientPreview = () => {
  return (
    <div className="p-4">
      <h2 className="text-4xl font-normal mb-8">Image ambient background</h2>
      <div className="flex flex-col w-full h-full gap-2">
        <Ambient imageSrc="https://isem4zg14k.ufs.sh/f/mufUz19XUjVC2cah6i4EzsMgjv04PnfurISNitC73AKZDmqL" />
      </div>
      <ComponentDoc docs={AMBIENT_USAGE_DOC} />
    </div>
  );
};

export default AmbientPreview;
