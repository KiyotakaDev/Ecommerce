import { dotWave } from "ldrs";
dotWave.register();

const FeatureLoader = () => {
  return (
    <div className="flex h-[60vh] w-full justify-center items-center py-14">
      <l-dot-wave size="140" stroke="3.5" speed="0.6" color="#5b21b6"  ></l-dot-wave>
    </div>
  );
};

export default FeatureLoader;
