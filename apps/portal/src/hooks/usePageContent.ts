import { useState, useEffect } from 'react';
import { supabase } from '@bus2ride/shared/supabase';

export function usePageContent<T = any>(slug: string, sectionId: string) {
    const [content, setContent] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchContent() {
            try {
                setLoading(true);
                const { data, error: sbError } = await supabase
                    .from('pages_content')
                    .select('content')
                    .eq('slug', slug)
                    .eq('section_id', sectionId)
                    .single();

                if (sbError) throw sbError;
                setContent(data?.content as T);
            } catch (err) {
                console.error(`Error fetching content for ${slug}/${sectionId}:`, err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, [slug, sectionId]);

    return { content, loading, error };
}

export function useSiteSettings() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('key, value');

                if (error) throw error;

                const settingsMap = data.reduce((acc, curr) => {
                    acc[curr.key] = curr.value;
                    return acc;
                }, {} as Record<string, string>);

                setSettings(settingsMap);
            } catch (err) {
                console.error('Error fetching site settings:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchSettings();
    }, []);

    return { settings, loading };
}
