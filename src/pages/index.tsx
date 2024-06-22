import ImageSlider from "@/components/templates/imageSlider";
import IndexBodyText, { IndexButtonGroup } from "@/components/templates/bodyText";
import { useState } from "react";

export default function Home({}) {
  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false,
  });
  
  function handleOptionChange(e: any) {
    const { name, checked } = e.target;
    setOptions((options) => ({ ...options, [name]: checked }));
  };

  return (
    <>
      <main className="noCss-sq">
        <div className="index-container-1">
          <div className="flex-1">
            <IndexBodyText/>
          </div>
          <div className="flex-1">
            <ImageSlider/>
          </div>   
        </div>
        <div className="index-btn-group">
          <IndexButtonGroup />
        </div> 
      </main>
    </>
  );
}
