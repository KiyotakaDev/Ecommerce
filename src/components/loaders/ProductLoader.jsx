import { waveform } from "ldrs";
waveform.register();

const productLoader = () => {
  return (
    <div className="flex h-[90vh] w-full justify-center items-center py-14">
      <l-waveform size="160" speed="0.9" color="#000"></l-waveform>
    </div>
  );
};

export default productLoader;
