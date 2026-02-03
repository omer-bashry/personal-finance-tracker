import { Button } from "@headlessui/react";
import { Camera } from "lucide-react";
// import CustomBandScaleExample from "./TestChars";
import Step1 from "./TestChars";
function App() {
  return (
    <>
      <div className="text-3xl font-bold underline">omer</div>
      <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
        Save changes
      </Button>
      <Step1 />
      <Camera color="red" size={48} />;
    </>
  );
}

export default App;
