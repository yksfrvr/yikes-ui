import GlassScroll from '../../components/Scroll/Glass';
import RainbowScroll from '../../components/Scroll/Rainbow';

const ScrollPreview = () => {
  return (
    <div className="p-4 w-full">
      <h2 className="text-4xl font-normal mb-8">Rainbow Scroll Preview</h2>
      <div className="flex flex-col items-center gap-8">
        <div className="w-[600px] h-[48vh] border border-gray-300 rounded overflow-hidden">
          <RainbowScroll>
            <div className="h-[128vh] p-4 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white text-xl">
              <p>Rainbow scroll</p>
            </div>
          </RainbowScroll>
        </div>

        <div className="w-[600px] h-[48vh] border border-gray-300 rounded overflow-hidden">
          <GlassScroll>
            <div className="h-[128vh] p-4 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white text-xl">
              <p>Glass scroll</p>
            </div>
          </GlassScroll>
        </div>
      </div>
    </div>
  );
};

export default ScrollPreview;
