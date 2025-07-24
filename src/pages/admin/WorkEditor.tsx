
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useLiteraryWorks } from "@/hooks/useLiteraryWorks";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/ImageUpload";
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Calendar,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WorkEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { works, createWork, updateWork, loading } = useLiteraryWorks();
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    title: "",
    type: "article" as "novel" | "short_story" | "poem" | "essay" | "article",
    description: "",
    content: "",
    cover_image: "",
    tags: "",
    status: "draft" as "draft" | "published" | "archived",
    published_at: ""
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && works.length > 0 && id) {
      const work = works.find(w => w.id === id);
      if (work) {
        setFormData({
          title: work.title,
          type: work.type,
          description: work.description || "",
          content: work.content || "",
          cover_image: work.cover_image || "",
          tags: work.tags?.join(", ") || "",
          status: work.status,
          published_at: work.published_at ? work.published_at.split('T')[0] : ""
        });
      }
    }
  }, [id, isNew, works]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (status: string = formData.status) => {
    console.log('=== WORK EDITOR SAVE START ===');
    console.log('Form data:', formData);
    console.log('Status:', status);
    console.log('Is new:', isNew);
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    
    try {
      const workData = {
        title: formData.title.trim(),
        type: formData.type,
        description: formData.description || null,
        content: formData.content || null,
        cover_image: formData.cover_image || null,
        status: status as "draft" | "published" | "archived",
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        published_at: status === "published" ? 
          (formData.published_at ? new Date(formData.published_at).toISOString() : new Date().toISOString()) : 
          null
      };
      
      console.log('Work data to save:', workData);
      
      let result;
      if (isNew) {
        console.log('Creating new work...');
        result = await createWork(workData);
        console.log('Create work result:', result);
        toast({
          title: "Success",
          description: "Work created successfully!"
        });
      } else if (id) {
        console.log('Updating existing work...');
        result = await updateWork(id, workData);
        console.log('Update work result:', result);
        toast({
          title: "Success", 
          description: "Work updated successfully!"
        });
      }
      
      // Small delay to ensure the toast is visible before navigation
      setTimeout(() => {
        navigate("/admin/works");
      }, 1000);
      
    } catch (error: any) {
      console.error('=== WORK EDITOR SAVE ERROR ===');
      console.error('Error details:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save work. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (formData.title) {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      window.open(`/works/${slug}`, '_blank');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/works")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Works
            </Button>
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">
                {isNew ? "New Work" : "Edit Work"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isNew ? "Create a new literary work" : "Edit your literary work"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSave("draft")}
              disabled={saving}
            >
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave("published")}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="literary-shadow">
              <CardHeader>
                <CardTitle className="font-heading">Work Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter work title..."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novel">Novel</SelectItem>
                      <SelectItem value="short_story">Short Story</SelectItem>
                      <SelectItem value="poem">Poem</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of the work..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card className="literary-shadow">
              <CardHeader>
                <CardTitle className="font-heading">Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Write your work content here..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Publishing */}
            <Card className="literary-shadow">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.status === "published" && (
                  <div>
                    <Label htmlFor="published_at">Publish Date</Label>
                    <Input
                      id="published_at"
                      type="date"
                      value={formData.published_at}
                      onChange={(e) => handleInputChange("published_at", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Categories & Tags */}
            <Card className="literary-shadow">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Categorization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    placeholder="tag1, tag2, tag3"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate tags with commas
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card className="literary-shadow">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  onImageUpload={(imageUrl) => handleInputChange("cover_image", imageUrl)}
                  currentImage={formData.cover_image}
                  label="Cover Image"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default WorkEditor;
