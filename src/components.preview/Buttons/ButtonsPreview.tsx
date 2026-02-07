import { EmojiButton } from "../../components/Buttons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useState } from "react";
import { EMOJI_USAGE_DOC } from "../../const/docs";
import { useClickOutside } from "../../hooks";
import ComponentDoc from "../ComponentDoc";

const ButtonsPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("😱");

  const closeEmojiDropDown = () => {
    if (isOpen) setIsOpen(false);
  };

  const outsideRef = useClickOutside<HTMLDivElement>(closeEmojiDropDown);

  const handleSelect = (emoji: any) => {
    setSelectedEmoji(emoji.native);
    setIsOpen(false);
  };

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-4xl font-normal mb-8">Emoji buttons</h2>
      <div className="flex flex-col items-center my-8 relative">
        <p className="text-lg mb-4">Click to change an emoji</p>
        <button
          className="px-6 py-3 rounded-lg text-5xl border-none bg-secondary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedEmoji}
        </button>
        {isOpen && (
          <div
            className="absolute z-10 mt-2 shadow-lg rounded-lg"
            ref={outsideRef}
          >
            <Picker data={data} onEmojiSelect={handleSelect} theme="dark" />
          </div>
        )}
      </div>
      <div className="flex justify-around items-center w-full mb-32 text-xl">
        <div className="w-[320px] h-[160px]">
          <p className="mb-2 text-center">Burst</p>
          <div className="bg-secondary h-full text-center flex items-center justify-center rounded-lg">
            <EmojiButton emoji={selectedEmoji} animationType={"burst"} />
          </div>
        </div>
        <div className="w-[320px] h-[160px]">
          <p className="mb-2 text-center">Drop</p>
          <div className="bg-secondary h-full text-center flex items-center justify-center rounded-lg">
            <EmojiButton emoji={selectedEmoji} animationType={"drop"} />
          </div>
        </div>
      </div>
      <ComponentDoc docs={EMOJI_USAGE_DOC} />
    </div>
  );
};

export default ButtonsPreview;
