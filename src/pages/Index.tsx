
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedWorks from "@/components/FeaturedWorks";
import LatestBlogPosts from "@/components/LatestBlogPosts";
import AboutPreview from "@/components/AboutPreview";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="overflow-hidden">
        <HeroSection />
        <StatsSection />
        <AboutPreview />
        <FeaturedWorks />
        <LatestBlogPosts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
