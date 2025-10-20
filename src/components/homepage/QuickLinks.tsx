import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Wrench, 
  FolderOpen, 
  Download, 
  Phone, 
  Calendar, 
  Briefcase, 
  Mail 
} from "lucide-react";

const quickLinks = [
  {
    icon: FileText,
    title: "Request Free Estimate",
    description: "Get a detailed quote for your project",
    link: "/estimate",
    color: "from-blue-500/10 to-blue-600/5",
  },
  {
    icon: Wrench,
    title: "View All Services",
    description: "Explore our 21 specialized services",
    link: "/services",
    color: "from-green-500/10 to-green-600/5",
  },
  {
    icon: FolderOpen,
    title: "See Our Projects",
    description: "Browse our portfolio of completed work",
    link: "/projects",
    color: "from-purple-500/10 to-purple-600/5",
  },
  {
    icon: Download,
    title: "Prequalification Package",
    description: "For contractors and developers",
    link: "#prequalification",
    color: "from-orange-500/10 to-orange-600/5",
  },
  {
    icon: Phone,
    title: "Emergency Service",
    description: "24/7 rapid response available",
    link: "/contact",
    color: "from-red-500/10 to-red-600/5",
  },
  {
    icon: Calendar,
    title: "Maintenance Programs",
    description: "Scheduled property maintenance",
    link: "/property-managers",
    color: "from-cyan-500/10 to-cyan-600/5",
  },
  {
    icon: Briefcase,
    title: "Careers",
    description: "Join our growing team",
    link: "/careers",
    color: "from-indigo-500/10 to-indigo-600/5",
  },
  {
    icon: Mail,
    title: "Contact Us",
    description: "Get in touch with our team",
    link: "/contact",
    color: "from-pink-500/10 to-pink-600/5",
  },
];

const QuickLinks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Quick Access
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find what you need fast with our most popular pages and services
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {quickLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} to={item.link}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm mb-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
