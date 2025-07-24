import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface LiteraryWork {
  id: string;
  title: string;
  type: 'novel' | 'short_story' | 'poem' | 'essay' | 'article';
  description: string | null;
  content: string | null;
  cover_image: string | null;
  status: 'draft' | 'published' | 'archived';
  tags: string[] | null;
  author_id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useLiteraryWorks = () => {
  const [works, setWorks] = useState<LiteraryWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchWorks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching literary works...');
      console.log('Current user:', user?.id);
      
      const { data, error } = await supabase
        .from('literary_works')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching works:', error);
        throw error;
      }
      
      console.log('Fetched works:', data);
      setWorks((data || []) as LiteraryWork[]);
    } catch (err: any) {
      console.error('Error in fetchWorks:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const createWork = async (workData: Partial<LiteraryWork>) => {
    console.log('=== CREATE WORK START ===');
    console.log('User object:', user);
    console.log('User ID:', user?.id);
    console.log('Work data received:', workData);
    
    if (!user) {
      console.error('User not authenticated - user object is null/undefined');
      throw new Error('User not authenticated');
    }

    if (!user.id) {
      console.error('User ID is missing from user object:', user);
      throw new Error('User ID is missing');
    }

    try {
      const insertData = {
        title: workData.title || '',
        type: workData.type || 'article',
        author_id: user.id,
        description: workData.description,
        content: workData.content,
        cover_image: workData.cover_image,
        status: workData.status || 'draft',
        tags: workData.tags || [],
        published_at: workData.status === 'published' ? (workData.published_at || new Date().toISOString()) : null
      };
      
      console.log('Final insert data:', insertData);
      console.log('About to call supabase.from("literary_works").insert()');

      const { data, error } = await supabase
        .from('literary_works')
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
      
      console.log('Successfully created work:', data);
      
      // Add the new work to the current list
      setWorks(currentWorks => {
        const newWorks = [data as LiteraryWork, ...currentWorks];
        console.log('Updated works list:', newWorks);
        return newWorks;
      });
      
      console.log('=== CREATE WORK SUCCESS ===');
      return data;
    } catch (error) {
      console.error('=== CREATE WORK ERROR ===');
      console.error('Error details:', error);
      throw error;
    }
  };

  const updateWork = async (id: string, workData: Partial<LiteraryWork>) => {
    try {
      console.log('Updating work:', id, workData);
      
      const updateData = {
        ...workData,
        published_at: workData.status === 'published' ? (workData.published_at || new Date().toISOString()) : workData.published_at
      };
      
      const { data, error } = await supabase
        .from('literary_works')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating work:', error);
        throw error;
      }
      
      console.log('Updated work:', data);
      
      // Update the work in the current list
      setWorks(currentWorks => 
        currentWorks.map(work => 
          work.id === id ? { ...work, ...data } as LiteraryWork : work
        )
      );
      
      return data;
    } catch (error) {
      console.error('Error in updateWork:', error);
      throw error;
    }
  };

  const deleteWork = async (id: string) => {
    try {
      console.log('Deleting work:', id);
      
      const { error } = await supabase
        .from('literary_works')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting work:', error);
        throw error;
      }
      
      console.log('Deleted work:', id);
      
      // Remove the work from the current list
      setWorks(currentWorks => currentWorks.filter(work => work.id !== id));
    } catch (error) {
      console.error('Error in deleteWork:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchWorks();
    }
  }, [user, fetchWorks]);

  return {
    works,
    loading,
    error,
    createWork,
    updateWork,
    deleteWork,
    refetch: fetchWorks,
  };
};

export const usePublishedWorks = () => {
  const [works, setWorks] = useState<LiteraryWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublishedWorks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching published works...');
      
      const { data, error } = await supabase
        .from('literary_works')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching published works:', error);
        throw error;
      }
      
      console.log('Fetched published works:', data);
      setWorks((data || []) as LiteraryWork[]);
    } catch (err: any) {
      console.error('Error in fetchPublishedWorks:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublishedWorks();
  }, [fetchPublishedWorks]);

  return { works, loading, error, refetch: fetchPublishedWorks };
};