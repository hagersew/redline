import { Box } from "@chakra-ui/react";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { DemoPreview } from "./components/DemoPreview";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { InstallSection } from "./components/InstallSection";

export default function App() {
  return (
    <Box as="main" minH="100vh" bg="page.bg" position="relative">
      <AnimatedBackground />
      <Box position="relative" zIndex={1}>
        <Header />
        <Hero />
        <DemoPreview />
        <HowItWorks />
        <Features />
        <InstallSection />
        <Footer />
      </Box>
    </Box>
  );
}
