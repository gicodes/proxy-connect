import { renderSection } from "@/components/app-routes/knowledgeBase/knowledgeBase";
import { SetStateAction, useState } from "react";

const knowledgeBasePage = () => {
  const [ section, setSection ] = useState("introduction");

  const toggleSection = (page: SetStateAction<string>) => {
    setSection(page)
  }

  const sectionList = [ "Introduction", "Usage", "Videos", "Community", "Documentation"];
  
  return (
    <>
      <div className="section-container">
        <div className="section-list">
          {sectionList.map((sectionItem, index) => {
            return (
              <div key={index}
                onClick={() => toggleSection(`${sectionItem.toLowerCase()}`)}
                >
                <button 
                  key={index}
                  className={section === sectionItem.toLowerCase() ? 'active-section' : ''}>
                    {sectionItem}</button>
              </div>
            )
          })}
        </div>

        <div className="section-page">
          {renderSection(section)}
        </div>
      </div> 
    </>
  )
};

export default knowledgeBasePage;