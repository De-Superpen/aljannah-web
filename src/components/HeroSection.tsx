
import { ArrowRight, Download, BookOpen, Award, Users, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import profileImage from "@/assets/profile-image.jpg";

const HeroSection = () => {
  const achievements = [
    { icon: BookOpen, label: "15+ Published Works", description: "Across multiple genres" },
    { icon: Award, label: "Literary Excellence", description: "Recognition in academic circles" },
    { icon: Users, label: "Community Impact", description: "Advocating for mental health" },
    { icon: Target, label: "Social Focus", description: "Gender, culture, and identity" }
  ];

  const specializations = [
    "Social Work & Public Health",
    "African Literature & Culture", 
    "Mental Health Advocacy",
    "Gender Studies & Feminism",
    "Family Dynamics & Marriage",
    "Literary Criticism & Analysis"
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-accent/5"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20 animate-fade-in">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Literary Professional & Social Work Specialist
                </Badge>
                
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight animate-fade-in">
                  AlJannah Adedamola
                  <span className="block text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Sanni
                  </span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-muted-foreground font-medium mt-2">
                    (Umm Firdaus)
                  </span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl animate-fade-in">
                A multifaceted writer, poetess, and literary critic with expertise in social work and public health. 
                I craft narratives that explore the intersections of culture, identity, mental health, and human resilience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                {specializations.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button asChild variant="elegant" size="lg" className="group">
                <Link to="/works">
                  Explore My Works
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="literary" size="lg" className="group">
                <Link to="/blog">
                  Read My Blog
                  <BookOpen className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/contact">
                  Get In Touch
                  <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4 animate-fade-in">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="literary-shadow bg-background/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-4 text-center">
                      <Icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="font-semibold text-sm text-foreground">{achievement.label}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative animate-fade-in">
              <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden literary-shadow bg-gradient-to-br from-primary/10 to-accent/10 p-2">
                <img
                  src={profileImage}
                  alt="AlJannah Adedamola Sanni"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              
              {/* Floating badge */}
              <div className="absolute top-8 -left-4 md:-left-8">
                <Badge className="bg-background/90 backdrop-blur-sm text-foreground border-primary/20 literary-shadow animate-bounce">
                  ✨ Available for collaborations
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
