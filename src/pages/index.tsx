import IndexButtonGroup from "@/components/routes/index/indexBtnGrp";
import ImageSlider from "@/components/routes/index/imageSlider";
import IndexBodyText from "@/components/routes/index/bodyText";

export default function Home() {
  return (
    <>
      <main className="noCss-sq">
        <div className="index-container-1">
          <div className="flex-1">
            <IndexBodyText />
          </div>
          <div className="flex-1">
            <ImageSlider />
          </div>   
        </div>
        <div className="index-btn-group">
          <IndexButtonGroup />
        </div> 
      </main>
    </>
  );
}
