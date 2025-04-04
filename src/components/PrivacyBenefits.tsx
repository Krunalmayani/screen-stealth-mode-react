
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Bell, FileText, MessageSquare } from "lucide-react";

const PrivacyBenefits = () => {
  const benefits = [
    {
      id: 1,
      title: "Hide Personal Notifications",
      description: "Prevent email, message, and other notifications from appearing during presentations",
      icon: <Bell className="w-6 h-6 text-blue-600" />
    },
    {
      id: 2,
      title: "Protect Sensitive Documents",
      description: "Keep confidential files and folders hidden from view during screen sharing",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      id: 3,
      title: "Conceal Private Conversations",
      description: "Prevent personal chats and messages from being visible to others",
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />
    },
    {
      id: 4,
      title: "Maintain Professional Image",
      description: "Present a clean, focused view without desktop clutter or personal information",
      icon: <Shield className="w-6 h-6 text-blue-600" />
    }
  ];

  return (
    <section id="privacy" className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Privacy Benefits</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Why you should use Screen Stealth Mode for every video conference
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <Card key={benefit.id} className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6 flex items-start">
                <div className="mr-4 bg-blue-50 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-800 dark:text-gray-200">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyBenefits;
