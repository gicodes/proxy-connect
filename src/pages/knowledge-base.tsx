import { renderSection } from "@/components/pages/knowledgeBase/knowledgeBase";
import { HStack, Stack, VStack } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";

const knowledgeBasePage = () => {
  const [ section, setSection ] = useState("introduction");

  const toggleSection = (page: SetStateAction<string>) => {
    setSection(page)
  }

  const sectionList = [ "Introduction", "Usage", "Videos", "Community", "Documentation"];
  
  return (
    <div className="min-h-full">
      <Stack p={"6"}>
        <HStack p={"6"}>
          <VStack 
            w={"25%"} 
            height={"100%"}
            lineHeight={"50px"}
            borderRight={"1px solid gray"}
            >
              {sectionList.map((section, index) => {
                return (
                  <div key={index}
                    onClick={() => toggleSection(`${section.toLowerCase()}`)}
                    >
                    <button key={index}>{section}</button>
                  </div>
                )
              })}
          </VStack>
          <VStack 
            w={"75%"}
            >
            {renderSection(section)}
          </VStack>
        </HStack>    
      </Stack>
    </div>
  )
};

export default knowledgeBasePage;