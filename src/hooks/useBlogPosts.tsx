
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  status: 'draft' | 'published' | 'archived';
  tags: string[] | null;
  author_id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching blog posts...');
      console.log('Current user:', user?.id);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      
      console.log('Fetched posts:', data);
      setPosts((data || []) as BlogPost[]);
    } catch (err: any) {
      console.error('Error in fetchPosts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const createPost = async (postData: Partial<BlogPost>) => {
    console.log('=== CREATE POST START ===');
    console.log('User object:', user);
    console.log('User ID:', user?.id);
    console.log('Post data received:', postData);
    
    if (!user) {
      console.error('User not authenticated - user object is null/undefined');
      throw new Error('User not authenticated');
    }

    if (!user.id) {
      console.error('User ID is missing from user object:', user);
      throw new Error('User ID is missing');
    }

    try {
      const slug = generateSlug(postData.title || '');
      const insertData = {
        title: postData.title || '',
        content: postData.content || '',
        slug,
        author_id: user.id,
        excerpt: postData.excerpt || null,
        featured_image: postData.featured_image || null,
        status: postData.status || 'draft',
        tags: postData.tags || [],
        published_at: postData.status === 'published' ? (postData.published_at || new Date().toISOString()) : null
      };
      
      console.log('Final insert data:', insertData);
      console.log('About to call supabase.from("blog_posts").insert()');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(insertData)
        .select()
        .single();

      console.log('Supabase response - data:', data);
      console.log('Supabase response - error:', error);

      if (error) {
        console.error('Supabase insert error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      if (!data) {
        console.error('No data returned from insert operation');
        throw new Error('No data returned from insert operation');
      }
      
      console.log('Successfully created post:', data);
      
      // Add the new post to the current list
      setPosts(currentPosts => {
        const newPosts = [data as BlogPost, ...currentPosts];
        console.log('Updated posts list:', newPosts);
        return newPosts;
      });
      
      console.log('=== CREATE POST SUCCESS ===');
      return data;
    } catch (error) {
      console.error('=== CREATE POST ERROR ===');
      console.error('Error details:', error);
      throw error;
    }
  };

  const updatePost = async (id: string, postData: Partial<BlogPost>) => {
    try {
      console.log('Updating post:', id, postData);
      
      const updateData = {
        ...postData,
        published_at: postData.status === 'published' ? (postData.published_at || new Date().toISOString()) : postData.published_at
      };
      
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating post:', error);
        throw error;
      }
      
      console.log('Updated post:', data);
      
      // Update the post in the current list
      setPosts(currentPosts => 
        currentPosts.map(post => 
          post.id === id ? { ...post, ...data } as BlogPost : post
        )
      );
      
      return data;
    } catch (error) {
      console.error('Error in updatePost:', error);
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    try {
      console.log('Deleting post:', id);
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting post:', error);
        throw error;
      }
      
      console.log('Deleted post:', id);
      
      // Remove the post from the current list
      setPosts(currentPosts => currentPosts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error in deletePost:', error);
      throw error;
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user, fetchPosts]);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
};

export const usePublishedPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublishedPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching published posts...');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching published posts:', error);
        throw error;
      }
      
      console.log('Fetched published posts:', data);
      setPosts((data || []) as BlogPost[]);
    } catch (err: any) {
      console.error('Error in fetchPublishedPosts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublishedPosts();
  }, [fetchPublishedPosts]);

  return { posts, loading, error, refetch: fetchPublishedPosts };
};
