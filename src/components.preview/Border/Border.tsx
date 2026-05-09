import { useState } from "react";
import { RainbowBorder, ShadowBorder } from "../../components/Border";
import { BORDER_USAGE_DOC } from "../../const/docs";
import ComponentDoc from "../ComponentDoc";
import { Palette } from "../../utils/palette";
import { BASE_PALETTES } from "../../const/palette";
import PaletteSelect from "../PaletteSelect";

const RainbowBorderPreview = () => {
  const defaultShadowPalette = BASE_PALETTES[7];
  const [shadowPalette, setShadowPalette] =
    useState<Palette>(defaultShadowPalette);

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-4xl font-normal mb-8">Border</h2>
      <div className="my-8">
        <ComponentDoc docs={[BORDER_USAGE_DOC[0]]} />
        <div className="bg-secondary p-6 rounded-md ml-4">
          <div className="flex justify-around items-center">
            <RainbowBorder>
              <button className="preview-button"></button>
            </RainbowBorder>
            <RainbowBorder>
              <button className="preview-button text-red-100 font-medium text-xl p-4">
                Look at me
              </button>
            </RainbowBorder>
            <RainbowBorder type="rb-hover">
              <button className="preview-button text-red-100 font-medium text-xl p-4">
                Hover me
              </button>
            </RainbowBorder>
          </div>
        </div>
      </div>
      <div className="mb-8 mt-16">
        <ComponentDoc docs={[BORDER_USAGE_DOC[1]]} />

        <div className="bg-secondary p-6 rounded-md ml-4">
          <div className="pb-10 flex gap-10 items-center justify-between">
            <h2 className="text-xl">With customizable pulse color</h2>
            <PaletteSelect
              defaultPalette={defaultShadowPalette}
              onChange={setShadowPalette}
            />
          </div>

          <div className="flex justify-around items-center">
            <ShadowBorder palette={shadowPalette}>
              <button className="preview-button"></button>
            </ShadowBorder>
            <ShadowBorder palette={shadowPalette}>
              <button className="preview-button text-red-100 font-medium text-xl p-4">
                Look at me
              </button>
            </ShadowBorder>
            <ShadowBorder palette={shadowPalette} showOnHover>
              <button className="preview-button text-red-100 font-medium text-xl p-4">
                Hover me
              </button>
            </ShadowBorder>
          </div>
        </div>
      </div>
      <div className="mb-8 mt-16">
        <ComponentDoc docs={[BORDER_USAGE_DOC[2]]} />
        <div className="bg-secondary p-6 rounded-md ml-4">
          <div className="flex justify-around items-center">
            <RainbowBorder type="with-shadow">
              <button className="preview-button"></button>
            </RainbowBorder>
            <RainbowBorder type="with-shadow">
              <button className="preview-button text-red-100 font-medium text-xl p-4">
                Look at me
              </button>
            </RainbowBorder>
            <RainbowBorder type="shadow-hover">
              <button className="preview-button text-red-100 font-medium text-xl p-4">
                Hover me
              </button>
            </RainbowBorder>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RainbowBorderPreview;
