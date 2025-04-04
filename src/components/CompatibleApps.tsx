
import { Card, CardContent } from "@/components/ui/card";

const CompatibleApps = () => {
  const apps = [
    {
      id: 1,
      name: "Google Meet",
      logo: "https://lh3.googleusercontent.com/a-/AOh14GgN7UZ-9R0Y0Pm3agfK0jCzrcHQO_Xz6NpJcmtPUw=s288-p-rw-no",
      description: "Click Share screen > Choose 'A window' > Select your application",
    },
    {
      id: 2,
      name: "Zoom",
      logo: "https://st1.zoom.us/static/6.3.10815/image/new/home/meetings.png",
      description: "Click Share > Select 'Window' tab > Choose your application",
    },
    {
      id: 3,
      name: "Microsoft Teams",
      logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4HCqV",
      description: "Click Share content > Choose 'Window' > Select your application",
    },
    {
      id: 4,
      name: "Slack",
      logo: "https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png",
      description: "Click Share screen > Select 'Application window' > Choose your app",
    },
    {
      id: 5,
      name: "Webex",
      logo: "https://www.webex.com/content/dam/wbx/global/images/webex-logo.png",
      description: "Click Share content > Choose 'Application' > Select your window",
    },
    {
      id: 6,
      name: "BlueJeans",
      logo: "https://cdn.freebiesupply.com/logos/large/2x/bluejeans-logo-png-transparent.png",
      description: "Click Share Screen > Select 'Application' > Choose your window",
    }
  ];

  return (
    <section id="compatible-apps" className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Compatible Applications</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Screen Stealth Mode works with all major video conferencing platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {apps.map((app) => (
            <Card key={app.id} className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                    <span className="text-xl font-bold text-blue-600">{app.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1 text-gray-800 dark:text-gray-200">{app.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{app.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompatibleApps;
