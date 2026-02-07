import { useState } from "react";
import Alert from "../../components/Notifications/Alert";
import { ALERT_USAGE_DOC } from "../../const/docs";
import ComponentDoc from "../ComponentDoc";
import { RainbowBorder, ShadowBorder } from "../../components/Border";
import { BASE_PALETTES } from "../../const/palette";
import PaletteSelect from "../PaletteSelect";

const AlertPreview = () => {
  const [shadowAlert, setShadowAlert] = useState(false);
  const [rainbowAlert, setRainbowAlert] = useState(false);

  const defaultShadowPalette = BASE_PALETTES[7];
  const defaultRainbowPalette = BASE_PALETTES[0];

  const [shadowPalette, setShadowPalette] = useState(defaultShadowPalette);
  const [rainbowPalette, setRainbowPalette] = useState(defaultRainbowPalette);

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-4xl font-normal mb-8">Rainbow Scroll Preview</h2>
      <div className="flex justify-around items-center my-8">
        <PaletteSelect
          defaultPalette={defaultShadowPalette}
          onChange={setShadowPalette}
        />
        <PaletteSelect
          defaultPalette={defaultRainbowPalette}
          onChange={setRainbowPalette}
        />
      </div>
      <div className="flex justify-around items-center my-16">
        <ShadowBorder palette={shadowPalette}>
          <button onClick={() => setShadowAlert(true)} className="px-6 py-3">
            Show Alert
          </button>
        </ShadowBorder>
        <RainbowBorder>
          <button onClick={() => setRainbowAlert(true)} className="px-6 py-3">
            Show Alert
          </button>
        </RainbowBorder>
      </div>
      <ComponentDoc docs={ALERT_USAGE_DOC} />
      {shadowAlert && (
        <Alert
          palette={shadowPalette}
          border="shadow"
          message="Whats cooking good looking"
          duration={5000}
          onClose={() => setShadowAlert(false)}
        />
      )}
      {rainbowAlert && (
        <Alert
          palette={rainbowPalette}
          border="rainbow"
          message="Whats cooking good looking"
          duration={5000}
          onClose={() => setRainbowAlert(false)}
        />
      )}
    </div>
  );
};

export default AlertPreview;
