
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Screen Stealth</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Protecting your privacy during video conferences by giving you control over what others see.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">How It Works</a></li>
                <li><a href="#compatible-apps" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">Compatible Apps</a></li>
                <li><a href="#privacy" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">Privacy Benefits</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Disclaimer</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Screen Stealth is not affiliated with any of the video conferencing platforms mentioned. All product names, logos, and brands are property of their respective owners.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for privacy {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
