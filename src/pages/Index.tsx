
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppHeader from "@/components/AppHeader";
import StealthModeGuide from "@/components/StealthModeGuide";
import CompatibleApps from "@/components/CompatibleApps";
import PrivacyBenefits from "@/components/PrivacyBenefits";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto text-center mb-16 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            Screen Stealth Mode
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Share your screen during video calls without exposing your entire desktop
          </p>
          
          <div className="mt-10">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Learn How It Works
            </Button>
          </div>
        </section>

        <StealthModeGuide />
        <CompatibleApps />
        <PrivacyBenefits />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
