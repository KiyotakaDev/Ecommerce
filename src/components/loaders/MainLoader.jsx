import { waveform } from "ldrs";
waveform.register();

const MainLoader = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <l-waveform size="140" stroke="3.5" speed="1" color="#000"  ></l-waveform>
    </div>
  );
};

export default MainLoader;
