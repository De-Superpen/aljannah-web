
import { ArrowRight, BookOpen, Heart, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const AboutPreview = () => {
  const highlights = [
    {
      icon: BookOpen,
      title: "Literary Excellence",
      description: "Crafting compelling narratives that explore human experiences",
      color: "text-blue-600"
    },
    {
      icon: Heart,
      title: "Mental Health Advocacy",
      description: "Promoting awareness and understanding through storytelling",
      color: "text-rose-600"
    },
    {
      icon: Users,
      title: "Social Impact",
      description: "Addressing critical social issues through literature",
      color: "text-green-600"
    },
    {
      icon: Award,
      title: "Academic Recognition",
      description: "Recognized expertise in social work and public health",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                About the Author
              </Badge>
              
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                A Voice for
                <span className="text-primary block">Social Change</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                AlJannah Adedamola Sanni (Umm Firdaus) is a multifaceted literary professional 
                whose work bridges the gap between creative expression and social advocacy. 
                With expertise in social work and public health, she uses her platform to 
                address critical issues affecting communities worldwide.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Her writing explores themes of identity, mental health, gender studies, 
                and cultural analysis, providing fresh perspectives on contemporary social issues 
                through the lens of African literature and Islamic values.
              </p>
            </div>

            <Button asChild variant="elegant" size="lg" className="group">
              <Link to="/about">
                Learn More About Me
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card key={index} className="literary-shadow bg-background/80 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 ${highlight.color}`} />
                    </div>
                    
                    <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {highlight.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
