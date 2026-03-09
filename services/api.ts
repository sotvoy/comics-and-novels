const API_BASE = '/api';

export const api = {
  // Series
  async getSeries(params: Record<string, string> = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/series?${query}`);
    return res.json();
  },

  async getSeriesBySlug(slug: string) {
    const res = await fetch(`${API_BASE}/series/${slug}`);
    return res.json();
  },

  async createSeries(data: any) {
    const res = await fetch(`${API_BASE}/series`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Chapters
  async getChapter(id: string) {
    const res = await fetch(`${API_BASE}/chapters/${id}`);
    return res.json();
  },

  async createChapter(data: any) {
    const res = await fetch(`${API_BASE}/chapters/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Search
  async search(params: Record<string, string> = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/search?${query}`);
    return res.json();
  },

  // Comments
  async getComments(params: Record<string, string> = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/comments?${query}`);
    return res.json();
  },

  async createComment(data: any) {
    const res = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Likes
  async toggleLike(data: any) {
    const res = await fetch(`${API_BASE}/likes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Follows
  async toggleFollow(data: any) {
    const res = await fetch(`${API_BASE}/follows`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Bookmarks
  async getBookmarks(userId: string) {
    const res = await fetch(`${API_BASE}/bookmarks?user_id=${userId}`);
    return res.json();
  },

  async toggleBookmark(data: any) {
    const res = await fetch(`${API_BASE}/bookmarks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Genres
  async getGenres() {
    const res = await fetch(`${API_BASE}/genres`);
    return res.json();
  },

  // Rankings
  async getRankings(params: Record<string, string> = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/rankings?${query}`);
    return res.json();
  },

  // Notifications
  async getNotifications(userId: string) {
    const res = await fetch(`${API_BASE}/notifications?user_id=${userId}`);
    return res.json();
  },

  async markNotificationRead(id: string) {
    const res = await fetch(`${API_BASE}/notifications`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read: true })
    });
    return res.json();
  },

  // Users
  async getUser(id: string) {
    const res = await fetch(`${API_BASE}/users/${id}`);
    return res.json();
  },

  async updateUser(id: string, data: any) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};

export default api;
