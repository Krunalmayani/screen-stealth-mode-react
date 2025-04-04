
import { Card, CardContent } from "@/components/ui/card";
import { Check, Monitor, FileText, EyeOff } from "lucide-react";

const StealthModeGuide = () => {
  const steps = [
    {
      id: 1,
      title: "Open your video conferencing app",
      description: "Start Google Meet, Zoom, Microsoft Teams, or any other supported application",
      icon: <Monitor className="w-6 h-6 text-blue-600" />
    },
    {
      id: 2,
      title: "Click 'Share Screen'",
      description: "Look for the share screen button in your video conferencing app",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      id: 3,
      title: "Select 'Application Window'",
      description: "Choose to share a specific window rather than your entire screen",
      icon: <EyeOff className="w-6 h-6 text-blue-600" />
    },
    {
      id: 4,
      title: "Share only what you need",
      description: "Select the specific application window you want others to see",
      icon: <Check className="w-6 h-6 text-blue-600" />
    }
  ];

  return (
    <section id="how-it-works" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How Screen Stealth Works</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Follow these simple steps to keep your desktop private during video conferences
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step) => (
          <Card key={step.id} className="border border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="mb-5 bg-blue-50 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                {step.icon}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-xl mb-2 text-gray-800 dark:text-gray-200">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 max-w-4xl mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-3">How AI-Assisted Screen Sharing Works:</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Our application functions similarly to platforms like InterviewCoder, where:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Only your shared screen content is visible to other participants</li>
          <li>The video conferencing UI and other participants' video feeds are not shown</li>
          <li>AI assistance provides communication support without requiring video of the other person</li>
          <li>You maintain complete privacy while sharing only essential content with your audience</li>
        </ul>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          This approach creates a distraction-free environment focused solely on the content being shared, 
          while providing AI-powered assistance to facilitate communication without requiring video feeds.
        </p>
      </div>
    </section>
  );
};

export default StealthModeGuide;
