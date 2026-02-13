import { useState } from "react";
import { PointerTrail } from "../../components/Pointer";
import { BASE_PALETTES } from "../../const/palette";
import { Palette } from "../../utils/palette";
import PaletteSelect from "../PaletteSelect";

const TrailPreview = () => {
  const defaultPalette = BASE_PALETTES[0];

  const [palette, setPalette] = useState<Palette>(defaultPalette);

  return (
    <div className="p-4 h-full w-full">
      <h2 className="text-4xl font-normal mb-8">Pointer trail</h2>
      <div className="w-full flex justify-end items-center">
        <PaletteSelect defaultPalette={defaultPalette} onChange={setPalette} />
      </div>
      <PointerTrail palette={palette} />
    </div>
  );
};

export default TrailPreview;
