import { useState } from "react";
import { Palette } from "../../../utils/palette";
import { GradientCanvas } from "./GradientCanvas";
import { RangeSlider } from "./RangeSlider";
import { AngleSelector } from "./AngleSelector";
import { linearRainbowToColor, MAX_RAINBOW_COLOR_VALUE } from "./utils";
import { addAlphaToHex } from "../../../utils/colors";
import TextPreview from "../../../components.preview/TextPreview";
import SavePalette from "./SavePalette";
import ColorsRange from "./ColorsRange";
import { BASE_COLORS } from "../../../const/colors";

import { PaletteJSON } from "../../../types/palette";

const rainbowPalette = new Palette(BASE_COLORS.BASE_RAINBOW);
const whitePalette = new Palette(["#fff", "#ffffff00"], 180);

type Props = {
  storePalettes: (p: PaletteJSON[]) => void;
};

const PaletteBuilder = ({ storePalettes }: Props) => {
  const [colorAlpha, setColorAlpha] = useState<number>(255);
  const [colorGradient, setColorGradient] = useState<string>("#fff");
  const [baseColor, setBaseColor] = useState<string>("#ff0000");

  const [colors, setColors] = useState<string[]>(["#fff", "#cb95fd", "#000"]);
  const [angle, setAngle] = useState<number>(90);

  const palette = new Palette(colors, angle);

  const onAddColor = () => {
    setColors((colors) => [
      ...colors,
      addAlphaToHex(colorGradient, colorAlpha),
    ]);
  };

  const onUpdateBaseColor = (v: number) => {
    setBaseColor(linearRainbowToColor(v));
  };

  return (
    <div>
      <div className="py-8 flex gap-8 justify-between">
        <ColorsRange colors={colors} setColors={setColors} />
        <div className="flex gap-4">
          <div className="w-32 h-32 flex flex-col gap-2">
            <div
              className="rounded-lg w-32 flex-1 relative flex items-end"
              style={{
                backgroundColor: addAlphaToHex(colorGradient, colorAlpha),
              }}
            >
              <input
                type="text"
                value={colorGradient}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow any input but validate before setting
                  setColorGradient(value);
                }}
                onBlur={(e) => {
                  const value = e.target.value;
                  // Validate on blur and reset if invalid
                  if (!(value === "#" || /^#([0-9A-F]{3}){1,2}$/i.test(value))) {
                    setColorGradient("#000");
                  }
                }}
                className="w-full mx-2 mb-2 bg-[#24242424] text-white px-2 py-1 rounded-md focus:outline-none font-medium text-sm shadow-md"
                placeholder="#RRGGBB"
              />
            </div>
            <div
              className="flex justify-center items-center w-32 h-10 border-2 rounded-lg cursor-pointer text-4xl text-white border-white select-none"
              onClick={onAddColor}
            >
              <span>+</span>
            </div>
          </div>
          <GradientCanvas baseColor={baseColor} setColor={setColorGradient} />
          <RangeSlider
            palette={rainbowPalette}
            thumbColor={"#fff"}
            minV={0}
            maxV={MAX_RAINBOW_COLOR_VALUE}
            onValueChange={onUpdateBaseColor}
          />
          <RangeSlider
            palette={whitePalette}
            thumbColor={"#000"}
            minV={0}
            maxV={255}
            onValueChange={setColorAlpha}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div
          className="h-32 rounded-lg flex-1"
          style={{
            background: `${palette.getLinearGradient()}`,
          }}
        ></div>
        <AngleSelector angle={angle} setAngle={setAngle} />
      </div>
      <div className="pt-8">
        <TextPreview gradient={`${palette.getLinearGradient()}`} />
      </div>
      <SavePalette palette={palette} storePalettes={storePalettes} />
    </div>
  );
};

export default PaletteBuilder;
