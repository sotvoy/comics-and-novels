/* ======================================================
   C&N — Full frontend JavaScript (single-file, localStorage)
   Paste into script.js or a <script> tag at the end of index.html
   ====================================================== */

/* ---------------------------
   Local "DB" backed by localStorage
   --------------------------- */
const storage = {
  users: JSON.parse(localStorage.getItem('cn_users') || '{}'),
  series: JSON.parse(localStorage.getItem('cn_series') || '{}'),
  playlists: JSON.parse(localStorage.getItem('cn_playlists') || '{}'),
  notifications: JSON.parse(localStorage.getItem('cn_notifications') || '{}'),
  session: JSON.parse(localStorage.getItem('cn_session') || 'null')
};

function saveAll() {
  localStorage.setItem('cn_users', JSON.stringify(storage.users));
  localStorage.setItem('cn_series', JSON.stringify(storage.series));
  localStorage.setItem('cn_playlists', JSON.stringify(storage.playlists));
  localStorage.setItem('cn_notifications', JSON.stringify(storage.notifications));
  localStorage.setItem('cn_session', JSON.stringify(storage.session));
}

/* ---------------------------
   Utilities
   --------------------------- */
function uid(prefix = 'id') { return prefix + '_' + Math.random().toString(36).slice(2, 10); }
function now() { return new Date().toISOString(); }
function currentUser() {
  return storage.session && storage.session.userId ? storage.users[storage.session.userId] : null;
}
function showToast(text) { try { alert(text); } catch (e) { console.log(text); } }

/* ---------------------------
   Seed some demo data if empty
   --------------------------- */
function seedDemoIfEmpty() {
  if (Object.keys(storage.users).length === 0) {
    const adminId = uid('user');
    storage.users[adminId] = {
      id: adminId,
      username: 'DemoCreator',
      email: 'demo@cn',
      password: 'demo',
      roles: ['author', 'artist'],
      verified: true,
      bio: 'Demo creator',
      avatar: null,
      followers: [],
      following: [],
      stats: { views: 0, likes: 0 },
      createdAt: now(),
      history: {},
      playlists: []
    };

    const s1 = uid('series');
    storage.series[s1] = {
      id: s1,
      title: 'Demo Manhwa',
      type: 'comic',
      format: 'manhwa',
      description: 'A demo manhwa for testing',
      cover: null,
      creatorId: adminId,
      language: 'ko',
      tags: ['fantasy', 'action'],
      status: 'ongoing',
      publishedAt: now(),
      stats: { views: 1200, likes: 300, follows: 150 },
      chapters: [
        {
          id: uid('ch'),
          title: 'Chapter 1',
          index: 1,
          contentType: 'images',
          images: [], // keep empty sample
          text: '',
          publishedAt: now(),
          stats: { views: 400, likes: 50 },
          comments: []
        }
      ]
    };

    storage.session = { userId: adminId };
    saveAll();
  }
}

/* ---------------------------
   DOM references (adapt to your HTML)
   --------------------------- */
/* If your HTML uses different IDs/classes, set them here. */
const dom = {
  // main containers
  appMain: document.getElementById('app') || document.querySelector('main'),
  top10El: document.getElementById('top10'),
  tagsRow: document.getElementById('tagsRow'),
  tagsContent: document.getElementById('tagsContent'),
  feedEl: document.getElementById('feed'),

  // create modal and upload forms
  createModal: document.getElementById('createModal'),
  uploadArtwork: document.getElementById('uploadArtwork'),
  uploadNovel: document.getElementById('uploadNovel'),
  createPlaylistModal: document.getElementById('createPlaylistModal'),

  // create modal buttons
  openCreateBtn: document.getElementById('openCreate'),
  closeCreateBtn: document.getElementById('closeCreate'),
  createArtworkBtn: document.getElementById('createArtworkBtn'),
  createNovelBtn: document.getElementById('createNovelBtn'),
  createPlaylistBtn: document.getElementById('createPlaylistBtn'),

  // artwork inputs
  artTitle: document.getElementById('artTitle'),
  artDesc: document.getElementById('artDesc'),
  artTags: document.getElementById('artTags'),
  artLang: document.getElementById('artLang'),
  chapterTitle: document.getElementById('chapterTitle'),
  chapterImages: document.getElementById('chapterImages'),
  saveChapterBtn: document.getElementById('saveChapter'),
  publishArtworkBtn: document.getElementById('publishArtwork'),
  artPreview: document.getElementById('artPreview'),
  cancelArtwork: document.getElementById('cancelArtwork'),

  // novel inputs
  novelTitle: document.getElementById('novelTitle'),
  novelDesc: document.getElementById('novelDesc'),
  novelTags: document.getElementById('novelTags'),
  novelChapterTitle: document.getElementById('novelChapterTitle'),
  novelChapterContent: document.getElementById('novelChapterContent'),
  saveNovelChapter: document.getElementById('saveNovelChapter'),
  publishNovelSeries: document.getElementById('publishNovelSeries'),
  novelPreview: document.getElementById('novelPreview'),
  cancelNovel: document.getElementById('cancelNovel'),

  // playlist create
  playlistName: document.getElementById('playlistName'),
  savePlaylistBtn: document.getElementById('savePlaylistBtn'),
  closePlaylistBtn: document.getElementById('closePlaylist'),

  // auth modal
  authModal: document.getElementById('authModal'),
  registerBtn: document.getElementById('registerBtn'),
  loginBtn: document.getElementById('loginBtn'),
  closeAuthBtn: document.getElementById('closeAuth'),
  usernameInput: document.getElementById('username'),
  emailInput: document.getElementById('email'),
  passwordInput: document.getElementById('password'),
  roleReader: document.getElementById('roleReader'),
  roleAuthor: document.getElementById('roleAuthor'),
  roleArtist: document.getElementById('roleArtist'),

  // reader modal
  readerModal: document.getElementById('readerModal'),
  readerContent: document.getElementById('readerContent'),
  readerSeriesTitle: document.getElementById('readerSeriesTitle'),
  readerSeriesBy: document.getElementById('readerSeriesBy'),
  readerChapterSelect: document.getElementById('readerChapterSelect'),
  nextChapterBtn: document.getElementById('nextChapter'),
  closeReaderBtn: document.getElementById('closeReader'),
  readerLikeBtn: document.getElementById('readerLike'),
  likeCountEl: document.getElementById('likeCount'),
  readerAddListBtn: document.getElementById('readerAddList'),
  commentsList: document.getElementById('commentsList'),
  commentText: document.getElementById('commentText'),
  publishCommentBtn: document.getElementById('publishComment'),

  // search / notifications / drawer
  searchBtn: document.getElementById('searchBtn'),
  notifBtn: document.getElementById('notifBtn'),
  drawerBtn: document.getElementById('openDrawer'),
  drawerEl: document.getElementById('drawer'),

  // profile & nav
  navHome: document.getElementById('navHome'),
  navMyList: document.getElementById('navMyList'),
  navFollowing: document.getElementById('navFollowing'),
  navProfile: document.getElementById('navProfile'),
  genreBtn: document.getElementById('genreBtn'),
  tabComics: document.getElementById('tabComics'),
  tabNovels: document.getElementById('tabNovels')
};

/* If any of the required nodes are missing, try to find fallback selectors */
for (let key in dom) {
  if (!dom[key]) {
    // try some common fallbacks
    const fallback = document.getElementById(key) || document.querySelector('#' + key) || document.querySelector('.' + key);
    if (fallback) dom[key] = fallback;
  }
}

/* ---------------------------
   Temporary buffers for creating series
   --------------------------- */
let artChaptersTemp = { seriesMeta: null, chapters: [] };
let novelChaptersTemp = { seriesMeta: null, chapters: [] };

/* ---------------------------
   File -> base64 helper (for images)
   --------------------------- */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject('read-error');
    reader.readAsDataURL(file);
  });
}

/* ---------------------------
   Create / Publish Artwork flows
   --------------------------- */
if (dom.saveChapterBtn) {
  dom.saveChapterBtn.onclick = async () => {
    const title = (dom.chapterTitle && dom.chapterTitle.value.trim()) || ('Chapter ' + (artChaptersTemp.chapters.length + 1));
    const files = dom.chapterImages && dom.chapterImages.files;
    if (!files || files.length === 0) { showToast('Select one or more images for this chapter'); return; }
    const images = [];
    for (let f of files) {
      try {
        const b = await fileToBase64(f);
        images.push(b);
      } catch (e) { console.error(e); }
    }
    artChaptersTemp.chapters.push({
      id: uid('ch'),
      title,
      index: artChaptersTemp.chapters.length + 1,
      contentType: 'images',
      images,
      publishedAt: now(),
      stats: { views: 0, likes: 0 },
      comments: []
    });
    if (dom.chapterTitle) dom.chapterTitle.value = '';
    if (dom.chapterImages) dom.chapterImages.value = '';
    renderArtPreview();
    showToast('Chapter saved locally (preview). When ready, Publish Series.');
  };
}

function renderArtPreview() {
  if (!dom.artPreview) return;
  dom.artPreview.innerHTML = '';
  artChaptersTemp.chapters.forEach(ch => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = '8px';
    wrapper.style.border = '1px solid rgba(0,0,0,0.08)';
    wrapper.style.marginBottom = '8px';
    wrapper.innerHTML = `<strong>${ch.title}</strong><div style="display:flex;gap:6px;overflow:auto;margin-top:6px">${ch.images.slice(0,6).map(i => `<img src="${i}" style="height:70px;border-radius:6px">`).join('')}</div>`;
    dom.artPreview.appendChild(wrapper);
  });
}

if (dom.publishArtworkBtn) {
  dom.publishArtworkBtn.onclick = () => {
    const title = dom.artTitle && dom.artTitle.value.trim();
    if (!title) { showToast('Enter series title'); return; }
    if (artChaptersTemp.chapters.length === 0) { showToast('Add at least one chapter'); return; }
    const sid = uid('series');
    const meta = {
      id: sid,
      title,
      type: 'comic',
      format: 'manhwa', // we can allow user to choose later
      description: (dom.artDesc && dom.artDesc.value) || '',
      cover: (artChaptersTemp.chapters[0].images[0]) || null,
      creatorId: storage.session.userId,
      language: (dom.artLang && dom.artLang.value) || 'en',
      tags: ((dom.artTags && dom.artTags.value) || '').split(',').map(x => x.trim()).filter(Boolean),
      status: 'ongoing',
      publishedAt: now(),
      stats: { views: 0, likes: 0, follows: 0 },
      chapters: artChaptersTemp.chapters
    };
    storage.series[sid] = meta;
    saveAll();
    artChaptersTemp = { seriesMeta: null, chapters: [] };
    if (dom.uploadArtwork) dom.uploadArtwork.classList.add('hidden');
    showToast('Series published locally!');
    renderHome();
  };
}

if (dom.cancelArtwork) {
  dom.cancelArtwork.onclick = () => {
    artChaptersTemp = { seriesMeta: null, chapters: [] };
    if (dom.uploadArtwork) dom.uploadArtwork.classList.add('hidden');
  };
}

/* ---------------------------
   Novel flows
   --------------------------- */
if (dom.saveNovelChapter) {
  dom.saveNovelChapter.onclick = () => {
    const title = (dom.novelChapterTitle && dom.novelChapterTitle.value.trim()) || ('Chapter ' + (novelChaptersTemp.chapters.length + 1));
    const text = (dom.novelChapterContent && dom.novelChapterContent.value) || '';
    novelChaptersTemp.chapters.push({
      id: uid('ch'),
      title,
      index: novelChaptersTemp.chapters.length + 1,
      contentType: 'text',
      text,
      publishedAt: now(),
      stats: { views: 0, likes: 0 },
      comments: []
    });
    if (dom.novelChapterTitle) dom.novelChapterTitle.value = '';
    if (dom.novelChapterContent) dom.novelChapterContent.value = '';
    renderNovelPreview();
    showToast('Novel chapter saved locally');
  };
}
function renderNovelPreview() {
  if (!dom.novelPreview) return;
  dom.novelPreview.innerHTML = '';
  novelChaptersTemp.chapters.forEach(ch => {
    const el = document.createElement('div');
    el.style.padding = '8px'; el.style.border = '1px solid rgba(0,0,0,0.08)'; el.style.marginBottom = '8px';
    el.innerHTML = `<strong>${ch.title}</strong><div class="sm muted">${(ch.text||'').slice(0,200)}${(ch.text||'').length>200?'...':''}</div>`;
    dom.novelPreview.appendChild(el);
  });
}
if (dom.publishNovelSeries) {
  dom.publishNovelSeries.onclick = () => {
    const title = (dom.novelTitle && dom.novelTitle.value.trim());
    if (!title) { showToast('Enter novel title'); return; }
    if (novelChaptersTemp.chapters.length === 0) { showToast('Add at least one chapter'); return; }
    const sid = uid('series');
    const meta = {
      id: sid,
      title,
      type: 'novel',
      format: 'novel',
      description: (dom.novelDesc && dom.novelDesc.value) || '',
      cover: null,
      creatorId: storage.session.userId,
      language: 'en',
      tags: ((dom.novelTags && dom.novelTags.value) || '').split(',').map(x => x.trim()).filter(Boolean),
      status: 'ongoing',
      publishedAt: now(),
      stats: { views: 0, likes: 0, follows: 0 },
      chapters: novelChaptersTemp.chapters
    };
    storage.series[sid] = meta;
    saveAll();
    novelChaptersTemp = { seriesMeta: null, chapters: [] };
    if (dom.uploadNovel) dom.uploadNovel.classList.add('hidden');
    showToast('Novel published locally!');
    renderHome();
  };
}
if (dom.cancelNovel) {
  dom.cancelNovel.onclick = () => {
    novelChaptersTemp = { seriesMeta: null, chapters: [] };
    if (dom.uploadNovel) dom.uploadNovel.classList.add('hidden');
  };
}

/* ---------------------------
   Playlist flows
   --------------------------- */
if (dom.savePlaylistBtn) {
  dom.savePlaylistBtn.onclick = () => {
    const name = (dom.playlistName && dom.playlistName.value.trim());
    if (!name) { showToast('Enter playlist name'); return; }
    const pid = uid('pl');
    storage.playlists[pid] = { id: pid, title: name, owner: storage.session ? storage.session.userId : null, items: [], createdAt: now() };
    saveAll();
    if (dom.createPlaylistModal) dom.createPlaylistModal.classList.add('hidden');
    showToast('Playlist created');
  };
}
if (dom.closePlaylistBtn) {
  dom.closePlaylistBtn.onclick = () => {
    if (dom.createPlaylistModal) dom.createPlaylistModal.classList.add('hidden');
  };
}

/* ---------------------------
   AUTH (register / login)
   --------------------------- */
if (dom.registerBtn) {
  dom.registerBtn.onclick = () => {
    const u = dom.usernameInput && dom.usernameInput.value.trim();
    const e = dom.emailInput && dom.emailInput.value && dom.emailInput.value.trim();
    const p = dom.passwordInput && dom.passwordInput.value;
    const roles = [];
    if (dom.roleReader && dom.roleReader.checked) roles.push('reader');
    if (dom.roleAuthor && dom.roleAuthor.checked) roles.push('author');
    if (dom.roleArtist && dom.roleArtist.checked) roles.push('artist');
    if (!u || !e || !p) { showToast('Fill username, email and password'); return; }
    // unique username
    for (let k in storage.users) { if (storage.users[k].username === u) { showToast('Username taken'); return; } }
    const id = uid('user');
    storage.users[id] = {
      id, username: u, email: e, password: p, roles, verified: false, avatar: null, bio: '', followers: [], following: [], stats: { views: 0, likes: 0 }, createdAt: now(), history: {}, playlists: []
    };
    storage.session = { userId: id };
    saveAll();
    if (dom.authModal) dom.authModal.classList.add('hidden');
    showToast('Registered and logged in');
    renderProfile();
  };
}
if (dom.loginBtn) {
  dom.loginBtn.onclick = () => {
    const u = dom.usernameInput && dom.usernameInput.value.trim();
    const p = dom.passwordInput && dom.passwordInput.value;
    for (let k in storage.users) {
      const user = storage.users[k];
      if ((user.username === u || user.email === u) && user.password === p) {
        storage.session = { userId: k };
        saveAll();
        if (dom.authModal) dom.authModal.classList.add('hidden');
        showToast('Logged in');
        renderProfile();
        return;
      }
    }
    showToast('Invalid credentials');
  };
}
if (dom.closeAuthBtn) {
  dom.closeAuthBtn.onclick = () => { if (dom.authModal) dom.authModal.classList.add('hidden'); };
}

/* ---------------------------
   Create modal open/close
   --------------------------- */
if (dom.openCreateBtn) {
  dom.openCreateBtn.onclick = () => {
    if (!storage.session) { // open auth if not logged in
      if (dom.authModal) dom.authModal.classList.remove('hidden');
      return;
    }
    if (dom.createModal) dom.createModal.classList.remove('hidden');
  };
}
if (dom.closeCreateBtn) {
  dom.closeCreateBtn.onclick = () => { if (dom.createModal) dom.createModal.classList.add('hidden'); };
}
if (dom.createArtworkBtn) {
  dom.createArtworkBtn.onclick = () => { if (dom.createModal) dom.createModal.classList.add('hidden'); if (dom.uploadArtwork) dom.uploadArtwork.classList.remove('hidden'); artChaptersTemp = { seriesMeta: null, chapters: [] }; renderArtPreview(); };
}
if (dom.createNovelBtn) {
  dom.createNovelBtn.onclick = () => { if (dom.createModal) dom.createModal.classList.add('hidden'); if (dom.uploadNovel) dom.uploadNovel.classList.remove('hidden'); novelChaptersTemp = { seriesMeta: null, chapters: [] }; renderNovelPreview(); };
}
if (dom.createPlaylistBtn) {
  dom.createPlaylistBtn.onclick = () => { if (dom.createModal) dom.createModal.classList.add('hidden'); if (dom.createPlaylistModal) dom.createPlaylistModal.classList.remove('hidden'); };
}

/* ---------------------------
   Home rendering: top10, tags, feed
   --------------------------- */
const defaultTags = ['New Chapters from Followed', 'Most Popular', 'Recently Added', 'Popular New Comics', 'Most Recent Popular', 'Adapted to Anime This Season'];

function renderHome() {
  buildTop10();
  buildTags();
  rebuildFeed();
}

function buildTop10() {
  if (!dom.top10El) return;
  dom.top10El.innerHTML = '';
  const arr = Object.values(storage.series).sort((a, b) => (b.stats && b.stats.views || 0) - (a.stats && a.stats.views || 0)).slice(0, 10);
  arr.forEach(s => {
    const c = document.createElement('div'); c.className = 'card';
    c.innerHTML = `<div class="cover" style="height:110px;background:#222;border-radius:8px;margin-bottom:8px"></div><div style="padding:8px"><strong>${s.title}</strong><div class="sm muted">${(storage.users[s.creatorId] && storage.users[s.creatorId].username) || 'Unknown'}</div></div>`;
    c.onclick = () => openSeries(s.id);
    dom.top10El.appendChild(c);
  });
}

function buildTags() {
  if (!dom.tagsRow || !dom.tagsContent) return;
  dom.tagsRow.innerHTML = '';
  dom.tagsContent.innerHTML = '';
  defaultTags.forEach(t => {
    const btn = document.createElement('div'); btn.className = 'chip'; btn.textContent = t;
    btn.onclick = () => renderTagSection(t);
    dom.tagsRow.appendChild(btn);
  });
  renderTagSection(defaultTags[0]);
}

function renderTagSection(tag) {
  if (!dom.tagsContent) return;
  dom.tagsContent.innerHTML = `<h3 style="margin-bottom:8px">${tag}</h3>`;
  const container = document.createElement('div'); container.className = 'h-row';
  let arr = Object.values(storage.series);
  if (tag === 'Most Popular') arr = Object.values(storage.series).sort((a, b) => (b.stats.likes || 0) - (a.stats.likes || 0));
  if (tag === 'Recently Added') arr = Object.values(storage.series).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  if (tag === 'New Chapters from Followed') {
    const me = currentUser();
    const followed = me ? me.following || [] : [];
    arr = Object.values(storage.series).filter(s => followed.includes(s.creatorId)).sor
