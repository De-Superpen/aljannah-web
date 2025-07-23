
import { Users, BookOpen, MessageCircle, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatsSection = () => {
  const stats = [
    {
      icon: BookOpen,
      value: "25+",
      label: "Published Works",
      description: "Across multiple genres and platforms"
    },
    {
      icon: Users,
      value: "10K+",
      label: "Readers Reached",
      description: "Through digital and print publications"
    },
    {
      icon: MessageCircle,
      value: "100+",
      label: "Blog Posts",
      description: "Insights on literature and society"
    },
    {
      icon: Award,
      value: "5+",
      label: "Years Experience",
      description: "In literary and social work"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Impact & Recognition
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building bridges between literature and social change through meaningful storytelling
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="literary-shadow bg-background/80 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300 group text-center">
                <CardContent className="p-4 md:p-6 space-y-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="font-heading text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {stat.value}
                    </div>
                    <div className="font-medium text-sm md:text-base text-foreground">
                      {stat.label}
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
