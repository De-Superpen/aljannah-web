
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, Calendar, Clock, ArrowRight, FileText, Filter, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePublishedPosts } from "@/hooks/useBlogPosts";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { posts, loading } = usePublishedPosts();

  // Extract unique categories from posts
  const categories = ["all", ...new Set(posts.flatMap(post => post.tags || []))];

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === "all" || (post.tags && post.tags.includes(filterCategory));
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.published_at || a.created_at).getTime() - new Date(b.published_at || b.created_at).getTime();
      }
      return 0;
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const featuredPost = posts[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-lg font-medium text-foreground">Loading blog posts...</p>
              <p className="text-muted-foreground">Please wait while we fetch the latest content</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-secondary/10 to-accent/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Literary Insights & Social Commentary
                </Badge>
                
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Blog &
                  <span className="text-primary block">Writings</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Thoughts, insights, and creative expressions on literature, society, mental health, 
                  and the human experience. Join me on this journey of exploration through words.
                </p>
              </div>
              
              {/* Topic Tags */}
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {["Mental Health", "African Literature", "Social Work", "Poetry", "Gender Studies", "Cultural Analysis", "Literary Criticism", "Family Dynamics"].map((topic) => (
                  <Badge key={topic} variant="outline" className="bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-colors">
                    {topic}
                  </Badge>
                ))}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="font-heading text-2xl md:text-3xl font-bold text-primary">{posts.length}+</div>
                  <div className="text-sm text-muted-foreground">Published Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-2xl md:text-3xl font-bold text-primary">5K+</div>
                  <div className="text-sm text-muted-foreground">Monthly Readers</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-2xl md:text-3xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">Topics Covered</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-2xl md:text-3xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">Years Writing</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16 lg:py-20 bg-secondary/20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-4">
                    <Star className="w-3 h-3 mr-1" />
                    Featured Post
                  </Badge>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                    Latest Insights
                  </h2>
                </div>
                
                <Card className="literary-shadow bg-background/80 backdrop-blur-sm border-0 overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                      {featuredPost.featured_image ? (
                        <img
                          src={featuredPost.featured_image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <FileText className="h-16 w-16 text-primary/50" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(featuredPost.published_at || featuredPost.created_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {calculateReadTime(featuredPost.content)}
                          </div>
                        </div>
                        
                        <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {featuredPost.title}
                        </h3>
                        
                        {featuredPost.excerpt && (
                          <p className="text-muted-foreground leading-relaxed">
                            {featuredPost.excerpt}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between pt-4">
                          {featuredPost.tags && featuredPost.tags.length > 0 && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {featuredPost.tags[0]}
                            </Badge>
                          )}
                          
                          <Button asChild variant="elegant" className="group">
                            <Link to={`/blog/${featuredPost.slug}`}>
                              Read Full Article
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="py-12 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 literary-shadow border-0 bg-background/80 backdrop-blur-sm"
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="md:w-48 h-12 literary-shadow border-0 bg-background/80 backdrop-blur-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="md:w-40 h-12 literary-shadow border-0 bg-background/80 backdrop-blur-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="literary-shadow hover:shadow-xl transition-all duration-300 overflow-hidden group bg-background/80 backdrop-blur-sm border-0">
                  <div className="aspect-video overflow-hidden">
                    {post.featured_image ? (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-primary/50" />
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      {post.tags && post.tags.length > 0 && (
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                          {post.tags[0]}
                        </Badge>
                      )}
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {calculateReadTime(post.content)}
                      </div>
                    </div>
                    
                    <CardTitle className="font-heading text-lg leading-tight group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(post.published_at || post.created_at)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto space-y-4">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto opacity-50" />
                  <h3 className="font-heading text-xl font-semibold text-foreground">No posts found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || filterCategory !== "all"
                      ? "Try adjusting your search terms or category filter to find what you're looking for."
                      : "No blog posts have been published yet. Check back soon for new content!"
                    }
                  </p>
                  {(searchTerm || filterCategory !== "all") && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setFilterCategory("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
