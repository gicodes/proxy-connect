import IndexButtonGroup from "@/components/app-routes/index/indexBtnGroup";
import ImageSlider from "@/components/app-routes/index/imageSlider";
import IndexBodyText from "@/components/app-routes/index/bodyText";

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
