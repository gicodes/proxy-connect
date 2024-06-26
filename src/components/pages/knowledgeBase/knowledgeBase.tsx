import { Stack, Heading, Text } from "@chakra-ui/react";
import { IntroSection } from "./introSection";
import { UsageSection } from "./usageSection";
import { JSX } from "react";

function mailTo() {
    window.location.href = "mailto:gicodes9@gmail.com";
}

const SelectSection = (
    heading1: string, 
    heading2: string, 
    text: any | JSX.Element 
) => {
    return (
        <>
            <div>
                <Stack p={"2"}>
                    <Heading className="h5b pl-5 sm-mx">
                        {heading1}
                    </Heading>
                    
                    <Heading 
                        p={"5"} 
                        fontSize={"medium"} 
                        className="pt-6 subtitle-aura sm-mx"
                        >
                        {heading2}
                    </Heading>

                    <Text className="pl-5 mx-auto">
                        {text}
                    </Text>
                </Stack>
            </div>
        </>
    )
}

export const renderSection = (section: any) => {
    switch (section) {
        case 'introduction':
            return SelectSection(
                "Introduction",
                "What is ProxyConnect?",
                <IntroSection />
            );
        case 'usage':
            return SelectSection(
                "Usage",
                "How to use ProxyConnect",
                <UsageSection />
            );
        case 'videos':
            return SelectSection(
                "Videos",
                "Watch Tutourial Videos",
                "Visit our incoming Youtube channels to learn more about ProxyConnect..."
            );
        case 'community':
            return SelectSection(
                "Community",
                "Join the Community",
                "Engage with our community to share and gain knowledge..."
            );
        case 'documentation':
            return SelectSection(
                "Documentation",
                "Technical Documentation",
                "Refer to the technical documentation for detailed information..."
            );
        default:
            return <div>Select a section</div>;
        }
    };