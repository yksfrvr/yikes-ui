import GlassScroll from '../../components/Scroll/Glass';
import RainbowScroll from '../../components/Scroll/Rainbow';

const ScrollPreview = () => {
  return (
    <div className="flex flex-col items-center p-4 gap-8">
      <h2 className="text-2xl font-bold mb-4">Rainbow Scroll Preview</h2>
      <div className="w-96 h-[50vh] border border-gray-300 rounded overflow-hidden">
        <RainbowScroll>
          <div className="h-[100vh] p-4 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white text-xl">
            <p>Rainbow scroll</p>
          </div>
        </RainbowScroll>
      </div>

      <div className="w-96 h-[50vh] border border-gray-300 rounded overflow-hidden">
        <GlassScroll>
          <div className="h-[100vh] p-4 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white text-xl">
            <p>Glass scroll</p>
          </div>
        </GlassScroll>
      </div>
    </div>
  );
};

export default ScrollPreview;
