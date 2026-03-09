'use client';

import { useState, useEffect } from 'react';

export function useSeries(params: Record<string, string> = {}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSeries() {
      try {
        setLoading(true);
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`/api/series?${query}`);
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSeries();
  }, [JSON.stringify(params)]);

  return { data, loading, error };
}

export function useSeriesBySlug(slug: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    async function fetchSeries() {
      try {
        setLoading(true);
        const res = await fetch(`/api/series/${slug}`);
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSeries();
  }, [slug]);

  return { data, loading, error };
}

export function useSearch(query: string, filters: Record<string, string> = {}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query && Object.keys(filters).length === 0) {
      setData([]);
      return;
    }

    async function search() {
      try {
        setLoading(true);
        const params = new URLSearchParams({ q: query, ...filters }).toString();
        const res = await fetch(`/api/search?${params}`);
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    const timeout = setTimeout(search, 300);
    return () => clearTimeout(timeout);
  }, [query, JSON.stringify(filters)]);

  return { data, loading, error };
}

export function useGenres() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch('/api/genres');
        const json = await res.json();
        setData(json || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGenres();
  }, []);

  return { data, loading, error };
}

export function useRankings(type?: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRankings() {
      try {
        setLoading(true);
        const url = type ? `/api/rankings?type=${type}` : '/api/rankings';
        const res = await fetch(url);
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRankings();
  }, [type]);

  return { data, loading, error };
}

export function useComments(seriesId?: string, chapterId?: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (seriesId) params.set('series_id', seriesId);
        if (chapterId) params.set('chapter_id', chapterId);
        const res = await fetch(`/api/comments?${params}`);
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [seriesId, chapterId]);

  return { data, loading, error };
}
