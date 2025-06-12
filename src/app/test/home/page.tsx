import React from "react";
import HeroSection from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { FeaturesSection } from "./FeaturesSection";
import { CallToActionSection } from "./CallToActionSection";
import { Footer } from "./Footer";

const page = () => {
  return (
    <div className="mt-25">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 font-inter text-gray-800">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Call to Action Section */}
        <CallToActionSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default page;
