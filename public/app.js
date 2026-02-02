// app.js - main client code (modular, single-file entry)
// Uses Firebase compat libraries loaded in index.html

const firebaseConfig = {
  apiKey: "AIzaSyCPp44zUE1rYsIpiiNq1DjRpXvJFA-zr4g",
  authDomain: "comics-and-novels.firebaseapp.com",
  projectId: "comics-and-novels",
  storageBucket: "comics-and-novels.firebasestorage.app",
  messagingSenderId: "438332137609",
  appId: "1:438332137609:web:1a6584ebcc4cc53224a658",
  measurementId: "G-2X748VJQ7K"
};

try{ firebase.initializeApp(firebaseConfig); }catch(e){ console.log('firebase init', e) }

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const functions = firebase.functions();

// ---------- Basic DOM shell ----------
const app = document.getElementById('app');
app.innerHTML = `
  <div class="topbar">
    <div class="left"><button id="openDrawer">☰</button><button id="genreBtn" class="tab">Manhwa ▾</button></div>
    <div class="center"><button id="tabComics" class="tab active">Comics</button><button id="tabNovels" class="tab">Novels</button></div>
    <div class="right"><button id="notifBtn">🔔</button><button id="searchBtn">🔍</button></div>
  </div>

  <main id="appMain">
    <section><h3>Featured</h3><div id="featuredRow" class="h-row"></div></section>
    <section><div id="tagsRow" style="display:flex;gap:8px;overflow:auto;padding-bottom:8px"></div></section>
    <section><h3 id="feedTitle">All Content</h3><div id="feed" class="grid"></div></section>
  </main>

  <nav class="bottom-nav">
    <button id="navHome" class="nav-btn">Home</button>
    <button id="navMyList" class="nav-btn">My List</button>
    <button id="plusBtn" class="plus">＋</button>
    <button id="navFollowing" class="nav-btn">Following</button>
    <button id="navProfile" class="nav-btn">Profile</button>
  </nav>

  <!-- Modals & overlays -->
  <div id="createModal" class="modal-backdrop"><div class="modal"><h3>Create</h3>
    <div style="display:flex;gap:8px;margin-bottom:10px">
      <button id="createArtworkBtn" class="btn-primary">Publish Artwork</button>
      <button id="createNovelBtn" class="btn-primary">Publish Novel</button>
      <button id="createPlaylistBtn">Create Playlist</button>
    </div><div style="display:flex;justify-content:flex-end"><button id="closeCreate" class="btn">Close</button></div>
  </div></div>

  <div id="uploadArtwork" class="modal-backdrop"><div class="modal">
    <h3>Publish Artwork</h3>
    <input id="artTitle" class="input" placeholder="Series title">
    <textarea id="artDesc" class="input" rows="3" placeholder="Description"></textarea>
    <input id="artTags" class="input" placeholder="tags,comma,separated">
    <select id="artLang" class="input"><option value="en">English</option><option value="ko">Korean</option></select>
    <hr>
    <input id="chapterTitle" class="input" placeholder="Chapter title">
    <input id="chapterImages" type="file" accept="image/*" multiple class="input">
    <div id="imagesPreview" style="display:flex;overflow:auto;margin-top:8px"></div>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
      <button id="saveChapter" class="btn">Save Chapter</button>
      <button id="publishArtwork" class="btn-primary">Publish Series</button>
    </div>
    <div style="display:flex;justify-content:flex-end;margin-top:6px"><button id="cancelArtwork" class="btn">Close</button></div>
  </div></div>

  <div id="uploadNovel" class="modal-backdrop"><div class="modal">
    <h3>Publish Novel</h3>
    <input id="novelTitle" class="input" placeholder="Novel title">
    <textarea id="novelDesc" class="input" rows="3" placeholder="Description"></textarea>
    <input id="novelTags" class="input" placeholder="tags,comma">
    <hr>
    <input id="novelChapterTitle" class="input" placeholder="Chapter title">
    <textarea id="novelChapterContent" class="input" rows="8" placeholder="Write chapter..."></textarea>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
      <button id="saveNovelChapter" class="btn">Save Chapter</button>
      <button id="publishNovelSeries" class="btn-primary">Publish Series</button>
    </div>
    <div style="display:flex;justify-content:flex-end;margin-top:6px"><button id="cancelNovel" class="btn">Close</button></div>
  </div></div>

  <div id="infoPage" class="info-page"><div style="display:flex;justify-content:space-between;align-items:center;padding:8px;background:var(--surface)"><button id="infoBackBtn" class="btn">← Back</button><div class="muted small">Series</div><div></div></div>
    <div style="padding:12px"><img id="infoCover" style="width:150px;border-radius:8px" src="" alt="cover"><h2 id="infoTitle"></h2><div id="infoMeta" class="muted small"></div><p id="infoDesc"></p><div id="infoTags"></div><div id="chapterList"></div><div style="display:flex;gap:8px;margin-top:8px"><button id="startReadBtn" class="btn-primary">Start Reading</button><button id="followBtn" class="btn">Follow</button></div></div>
  </div>

  <div id="readerPage" class="reader-page"><div class="reader-header"><div><button id="readerBackBtn" class="btn">←</button><span id="readerTitle" style="font-weight:700;margin-left:8px"></span></div><div><select id="chapterSelect" class="input" style="max-width:220px"></select><button id="prevChapter" class="btn">Prev</button><button id="nextChapter" class="btn">Next</button></div></div><div id="readerContent" class="reader-content"></div>
    <div style="position:sticky;bottom:0;background:var(--surface);padding:12px"><button id="readerLike" class="btn-primary">❤️ Like (<span id="likeCount">0</span>)</button><div style="margin-top:10px"><h4>Comments</h4><div id="commentsList" style="max-height:200px;overflow:auto;background:#0f1113;padding:8px;border-radius:8px"></div><div style="display:flex;gap:8px;margin-top:8px"><input id="commentInput" class="input" placeholder="Comment..."><button id="sendComment" class="btn-primary">Send</button></div></div></div>
  </div>

  <div id="authModal" class="modal-backdrop"><div class="modal"><h3>Sign up / Login</h3><input id="username" class="input" placeholder="Username"><input id="email" class="input" placeholder="Email"><input id="password" class="input" placeholder="Password" type="password"><div style="display:flex;gap:8px;margin-top:8px"><label><input type="checkbox" id="roleAuthor"> Author</label><label><input type="checkbox" id="roleArtist"> Artist</label></div><div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px"><button id="registerBtn" class="btn-primary">Register</button><button id="loginBtn" class="btn">Login</button></div><div style="display:flex;justify-content:flex-end;margin-top:8px"><button id="closeAuth" class="btn">Close</button></div></div></div>

  <div id="searchModal" class="modal-backdrop"><div class="modal"><h3>Search</h3><input id="searchInput" class="input" placeholder="Search"><div id="searchResults"></div><div style="display:flex;justify-content:flex-end;margin-top:8px"><button id="closeSearch" class="btn">Close</button></div></div></div>

  <div id="notifModal" class="modal-backdrop"><div class="modal"><h3>Notifications</h3><div id="notifList"></div><div style="display:flex;justify-content:flex-end;margin-top:8px"><button id="closeNotif" class="btn">Close</button></div></div></div>

`;

// ---------- references ----------
const featuredRow = document.getElementById('featuredRow');
const tagsRow = document.getElementById('tagsRow');
const feed = document.getElementById('feed');

const openDrawer = document.getElementById('openDrawer');
const genreBtn = document.getElementById('genreBtn');
const tabComics = document.getElementById('tabComics');
const tabNovels = document.getElementById('tabNovels');

const plusBtn = document.getElementById('plusBtn');
const createModal = document.getElementById('createModal');
const createArtworkBtn = document.getElementById('createArtworkBtn');
const createNovelBtn = document.getElementById('createNovelBtn');
const createPlaylistBtn = document.getElementById('createPlaylistBtn');
const closeCreate = document.getElementById('closeCreate');

const uploadArtwork = document.getElementById('uploadArtwork');
const artTitle = document.getElementById('artTitle');
const artDesc = document.getElementById('artDesc');
const artTags = document.getElementById('artTags');
const artLang = document.getElementById('artLang');
const chapterTitle = document.getElementById('chapterTitle');
const chapterImages = document.getElementById('chapterImages');
const imagesPreview = document.getElementById('imagesPreview');
const saveChapter = document.getElementById('saveChapter');
const publishArtwork = document.getElementById('publishArtwork');
const cancelArtwork = document.getElementById('cancelArtwork');

const uploadNovel = document.getElementById('uploadNovel');
const novelTitle = document.getElementById('novelTitle');
const novelDesc = document.getElementById('novelDesc');
const novelTags = document.getElementById('novelTags');
const novelLang = document.getElementById('novelLang');
const novelChapterTitle = document.getElementById('novelChapterTitle');
const novelChapterContent = document.getElementById('novelChapterContent');
const saveNovelChapter = document.getElementById('saveNovelChapter');
const publishNovelSeries = document.getElementById('publishNovelSeries');
const cancelNovel = document.getElementById('cancelNovel');

const infoPage = document.getElementById('infoPage');
const infoBackBtn = document.getElementById('infoBackBtn');
const infoTitle = document.getElementById('infoTitle');
const infoCover = document.getElementById('infoCover');
const infoDesc = document.getElementById('infoDesc');
const infoMeta = document.getElementById('infoMeta');
const infoTags = document.getElementById('infoTags');
const chapterList = document.getElementById('chapterList');
const startReadBtn = document.getElementById('startReadBtn');
const followBtn = document.getElementById('followBtn');

const readerPage = document.getElementById('readerPage');
const readerBackBtn = document.getElementById('readerBackBtn');
const readerTitle = document.getElementById('readerTitle');
const chapterSelect = document.getElementById('chapterSelect');
const prevChapter = document.getElementById('prevChapter');
const nextChapter = document.getElementById('nextChapter');
const readerContent = document.getElementById('readerContent');
const readerLike = document.getElementById('readerLike');
const likeCount = document.getElementById('likeCount');
const commentsList = document.getElementById('commentsList');
const commentInput = document.getElementById('commentInput');
const sendComment = document.getElementById('sendComment');

const authModal = document.getElementById('authModal');
const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const roleAuthor = document.getElementById('roleAuthor');
const roleArtist = document.getElementById('roleArtist');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const closeAuth = document.getElementById('closeAuth');

const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const closeSearch = document.getElementById('closeSearch');

const notifModal = document.getElementById('notifModal');
const notifList = document.getElementById('notifList');
const closeNotif = document.getElementById('closeNotif');

// ---------- app state ----------
let state = { tab: 'comic', filter: 'new' };
let currentUser = null;
let currentSeries = null;
let currentChapterIndex = 0;
let artTemp = { chapters: [] };
let novelTemp = { chapters: [] };

// ---------- helpers ----------
const showModalByEl = el => el.classList.add('show') || (el.style.display='flex');
const hideModalByEl = el => el.classList.remove('show') || (el.style.display='none');
const toast = txt => alert(txt);

// close modals on backdrop click
document.querySelectorAll('.modal-backdrop').forEach(b => {
  b.addEventListener('click', e => { if(e.target === b) hideModalByEl(b); });
});

// ---------- auth ----------
auth.onAuthStateChanged(async (u) => {
  if(u){
    // load or create profile
    const ref = db.collection('users').doc(u.uid);
    const doc = await ref.get();
    if(!doc.exists){
      const profile = { id: u.uid, username: u.email.split('@')[0], email: u.email, roles: [], createdAt: Date.now(), following: [], playlists: [], history: {} };
      await ref.set(profile);
      currentUser = profile;
    } else currentUser = doc.data();
  } else currentUser = null;
  renderProfileBadge();
  renderFeed();
});

function renderProfileBadge(){
  // small indicator in the UI (navProfile text)
  const navProfile = document.getElementById('navProfile');
  if(currentUser) navProfile.innerText = currentUser.username || 'Profile';
  else navProfile.innerText = 'Profile';
}

// register
registerBtn.onclick = async ()=>{
  const uname = usernameEl.value.trim();
  const email = emailEl.value.trim();
  const pwd = passwordEl.value;
  if(!uname || !email || !pwd) return toast('Fill username, email, password');
  try{
    const res = await auth.createUserWithEmailAndPassword(email, pwd);
    const uid = res.user.uid;
    const roles = [];
    if(roleAuthor.checked) roles.push('author');
    if(roleArtist.checked) roles.push('artist');
    const profile = { id: uid, username: uname, email, roles, createdAt: Date.now(), following: [], playlists: [], history: {} };
    await db.collection('users').doc(uid).set(profile);
    currentUser = profile;
    hideModalByEl(authModal);
    toast('Registered & logged in');
  }catch(err){ console.error(err); toast('Register error: '+err.message); }
};

// login
loginBtn.onclick = async ()=>{
  const email = emailEl.value.trim();
  const pwd = passwordEl.value;
  if(!email || !pwd) return toast('fill email/password');
  try{ await auth.signInWithEmailAndPassword(email, pwd); hideModalByEl(authModal); toast('Logged in'); }catch(err){console.error(err);toast('Login error: '+err.message);}
};
closeAuth.onclick = ()=> hideModalByEl(authModal);

// ---------- UI wiring ----------
openDrawer.onclick = ()=> document.getElementById('drawer')?.classList.toggle('open');
genreBtn.onclick = ()=> {
  const c = prompt('Choose: Manga / Manhwa / Manhua','Manhwa') || 'Manhwa';
  genreBtn.textContent = c + ' ▾';
};

tabComics.onclick = ()=> { state.tab='comic'; tabComics.classList.add('active'); tabNovels.classList.remove('active'); renderFeed(); };
tabNovels.onclick = ()=> { state.tab='novel'; tabNovels.classList.add('active'); tabComics.classList.remove('active'); renderFeed(); };

plusBtn.onclick = ()=> {
  if(!currentUser) showModalByEl(authModal);
  else showModalByEl(createModal);
};

createArtworkBtn.onclick = ()=> { hideModalByEl(createModal); showModalByEl(uploadArtwork); };
createNovelBtn.onclick = ()=> { hideModalByEl(createModal); showModalByEl(uploadNovel); };
closeCreate.onclick = ()=> hideModalByEl(createModal);

// search & notifications
document.getElementById('searchBtn').onclick = ()=> showModalByEl(searchModal);
closeSearch.onclick = ()=> hideModalByEl(searchModal);
document.getElementById('notifBtn').onclick = async ()=> { showModalByEl(notifModal); await renderNotifications(); };
closeNotif.onclick = ()=> hideModalByEl(notifModal);

// info page
infoBackBtn.onclick = ()=> hideModalByEl(infoPage);

// reader
readerBackBtn.onclick = ()=> hideModalByEl(readerPage);

// ---------- Feed rendering ----------
async function renderFeed(){
  feed.innerHTML = '<div class="muted">Loading...</div>';
  const snap = await db.collection('series').orderBy('created','desc').get();
  feed.innerHTML = '';
  let count = 0;
  snap.forEach(doc=>{
    const s = doc.data();
    if(s.type !== state.tab) return;
    count++;
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<div style="height:140px;background:url('${s.cover||'https://via.placeholder.com/400x600'}') center/cover;border-radius:8px"></div>
      <div style="margin-top:8px">
        <div class="title">${s.title}</div>
        <div class="muted small">${s.creatorName||'Unknown'} • ${s.language||'en'}</div>
        <div style="display:flex;gap:8px;margin-top:8px"><button class="btn" data-id="${doc.id}" data-action="open">Read</button><button class="btn" data-id="${doc.id}" data-action="follow">Follow</button></div>
      </div>`;
    el.querySelectorAll('button').forEach(b=>{
      b.onclick = (ev)=>{
        ev.stopPropagation();
        const id = b.dataset.id; const action = b.dataset.action;
        if(action==='open') openSeriesInfo(id);
        if(action==='follow') followSeries(id);
      };
    });
    el.onclick = ()=> openSeriesInfo(doc.id);
    feed.appendChild(el);
  });
  if(count===0) feed.innerHTML = '<div class="muted">No content found</div>';
  await renderFeatured();
}

// featured
async function renderFeatured(){
  featuredRow.innerHTML = '';
  const snap = await db.collection('series').orderBy('likes','desc').limit(6).get();
  snap.forEach(d=>{
    const s = d.data();
    const el = document.createElement('div'); el.className='card'; el.style.minWidth='220px';
    el.innerHTML = `<div style="height:120px;background:url('${s.cover||'https://via.placeholder.com/400x600'}') center/cover;border-radius:8px"></div><div style="margin-top:8px">${s.title}</div>`;
    el.onclick = ()=> openSeriesInfo(d.id);
    featuredRow.appendChild(el);
  });
}

// open series info
async function openSeriesInfo(seriesId){
  const doc = await db.collection('series').doc(seriesId).get();
  if(!doc.exists) return toast('Series not found');
  const s = doc.data(); currentSeries = { id: doc.id, ...s };
  infoTitle.innerText = s.title;
  infoCover.src = s.cover || 'https://via.placeholder.com/200x300';
  infoDesc.innerText = s.description || '';
  infoMeta.innerText = `${s.creatorName||'Unknown'} • ${s.language||'en'} • ${s.status||'ongoing'}`;
  infoTags.innerHTML = '';
  (s.tags||[]).forEach(t => { const span = document.createElement('span'); span.className='chip'; span.innerText = t; infoTags.appendChild(span); });
  chapterList.innerHTML = '';
  (s.chapters||[]).forEach((ch, idx) => {
    const el = document.createElement('div'); el.style.display='flex'; el.style.justifyContent='space-between'; el.style.alignItems='center'; el.style.padding='8px 0';
    el.innerHTML = `<div>${ch.title}</div><div><button class="btn" onclick="openChapter('${doc.id}', ${idx})">Read</button></div>`;
    chapterList.appendChild(el);
  });
  showModalByEl(infoPage);
}

// follow series
async function followSeries(seriesId){
  if(!auth.currentUser) return showModalByEl(authModal);
  const uid = auth.currentUser.uid; const uRef = db.collection('users').doc(uid);
  const uDoc = await uRef.get(); const u = uDoc.data();
  u.following = u.following || [];
  if(!u.following.includes(seriesId)){ u.following.push(seriesId); await uRef.update({ following: u.following }); toast('Following'); } else toast('Already following');
}

// open chapter (full-screen reader)
async function openChapter(seriesId, chIdx){
  const doc = await db.collection('series').doc(seriesId).get();
  if(!doc.exists) return toast('Not found');
  const s = doc.data(); currentSeries = { id: doc.id, ...s };
  currentChapterIndex = chIdx || 0;
  showModalByEl(readerPage);
  renderReader();
}

// render reader
function renderReader(){
  readerTitle.innerText = currentSeries.title || '';
  chapterSelect.innerHTML = '';
  (currentSeries.chapters || []).forEach((ch, i)=> {
    const o = document.createElement('option'); o.value = i; o.innerText = ch.title; chapterSelect.appendChild(o);
  });
  chapterSelect.value = currentChapterIndex;
  showCurrentChapter();
}

// show content of current chapter
function showCurrentChapter(){
  const ch = (currentSeries.chapters||[])[currentChapterIndex];
  if(!ch) return;
  readerContent.innerHTML = '';
  if(ch.contentType === 'text'){
    const div = document.createElement('div'); div.innerHTML = `<div style="padding:12px">${(ch.text||'').replace(/\n/g,'<br>')}</div>`; readerContent.appendChild(div);
  } else {
    (ch.images||[]).forEach(src=>{ const img = document.createElement('img'); img.src = src; img.style.width = '100%'; img.style.marginBottom='10px'; readerContent.appendChild(img); });
  }
  likeCount.innerText = ch.stats?.likes || 0;
  renderComments(ch.comments || []);
}

// nav within reader
prevChapter.onclick = ()=> { if(currentChapterIndex>0){ currentChapterIndex--; chapterSelect.value = currentChapterIndex; showCurrentChapter(); } };
nextChapter.onclick = ()=> { if(currentChapterIndex < (currentSeries.chapters||[]).length-1){ currentChapterIndex++; chapterSelect.value = currentChapterIndex; showCurrentChapter(); } };
chapterSelect.onchange = ()=> { currentChapterIndex = parseInt(chapterSelect.value); showCurrentChapter(); };

// like current chapter (persist)
readerLike.onclick = async ()=> {
  if(!auth.currentUser) return showModalByEl(authModal);
  const seriesRef = db.collection('series').doc(currentSeries.id);
  const doc = await seriesRef.get(); const s = doc.data();
  s.chapters[currentChapterIndex].stats = s.chapters[currentChapterIndex].stats || { likes: 0 };
  s.chapters[currentChapterIndex].stats.likes = (s.chapters[currentChapterIndex].stats.likes || 0) + 1;
  await seriesRef.update({ chapters: s.chapters });
  currentSeries = { id: doc.id, ...s };
  showCurrentChapter();
};

// comments
function renderComments(comments){
  commentsList.innerHTML = '';
  comments.forEach((c, idx) => {
    const div = document.createElement('div'); div.className = 'comment';
    div.innerHTML = `<b>${c.user}</b>: ${c.text} <div style="margin-top:8px" class="muted small">❤️ ${c.likes||0} • 👎 ${c.dislikes||0}</div>
      <div style="margin-top:6px"><button class="btn" onclick="likeComment(${idx})">Like</button><button class="btn" onclick="dislikeComment(${idx})">Dislike</button><button class="btn" onclick="replyComment(${idx})">Reply</button></div>`;
    if(c.replies && c.replies.length){ const repDiv = document.createElement('div'); repDiv.style.marginLeft='12px'; c.replies.forEach(r=> { const rEl = document.createElement('div'); rEl.innerHTML = `<i>${r.user}</i>: ${r.text}`; repDiv.appendChild(rEl);} ); div.appendChild(repDiv); }
    commentsList.appendChild(div);
  });
}

sendComment.onclick = async ()=>{
  if(!auth.currentUser) return showModalByEl(authModal);
  const text = commentInput.value.trim(); if(!text) return;
  const seriesRef = db.collection('series').doc(currentSeries.id);
  const doc = await seriesRef.get(); const s = doc.data();
  s.chapters = s.chapters || [];
  s.chapters[currentChapterIndex].comments = s.chapters[currentChapterIndex].comments || [];
  s.chapters[currentChapterIndex].comments.push({ user: currentUser?.username || currentUser?.email || auth.currentUser.email, text, likes:0, dislikes:0, replies:[] });
  await seriesRef.update({ chapters: s.chapters });
  commentInput.value = '';
  renderComments(s.chapters[currentChapterIndex].comments);
};

async function likeComment(idx){
  if(!auth.currentUser) return showModalByEl(authModal);
  const ref = db.collection('series').doc(currentSeries.id);
  const doc = await ref.get(); const s = doc.data();
  s.chapters[currentChapterIndex].comments[idx].likes = (s.chapters[currentChapterIndex].comments[idx].likes||0)+1;
  await ref.update({ chapters: s.chapters });
  renderComments(s.chapters[currentChapterIndex].comments);
}
async function dislikeComment(idx){
  if(!auth.currentUser) return showModalByEl(authModal);
  const ref = db.collection('series').doc(currentSeries.id);
  const doc = await ref.get(); const s = doc.data();
  s.chapters[currentChapterIndex].comments[idx].dislikes = (s.chapters[currentChapterIndex].comments[idx].dislikes||0)+1;
  await ref.update({ chapters: s.chapters });
  renderComments(s.chapters[currentChapterIndex].comments);
}
async function replyComment(idx){
  if(!auth.currentUser) return showModalByEl(authModal);
  const reply = prompt('Reply:'); if(!reply) return;
  const ref = db.collection('series').doc(currentSeries.id);
  const doc = await ref.get(); const s = doc.data();
  s.chapters[currentChapterIndex].comments[idx].replies = s.chapters[currentChapterIndex].comments[idx].replies || [];
  s.chapters[currentChapterIndex].comments[idx].replies.push({ user: currentUser?.username || currentUser?.email || auth.currentUser.email, text: reply });
  await ref.update({ chapters: s.chapters });
  renderComments(s.chapters[currentChapterIndex].comments);
}

// ---------- upload flows ----------
chapterImages.onchange = ()=>{
  imagesPreview.innerHTML = '';
  Array.from(chapterImages.files).forEach(f=> {
    const r = new FileReader();
    r.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.height='80px'; img.style.marginRight='8px'; img.style.borderRadius='6px';
      imagesPreview.appendChild(img);
    };
    r.readAsDataURL(f);
  });
};

saveChapter.onclick = ()=>{
  const title = chapterTitle.value.trim(); const files = Array.from(chapterImages.files);
  if(!title || !files.length) return toast('Add chapter title and images');
  const ch = { id: 'ch_'+Date.now().toString(36), title, contentType: 'images', images: [], stats:{likes:0}, comments:[] };
  let cnt = 0;
  files.forEach((f,i) => {
    const r = new FileReader();
    r.onload = e => { ch.images.push(e.target.result); cnt++; if(cnt===files.length){ artTemp.chapters.push(ch); toast('Chapter saved to buffer'); chapterTitle.value=''; chapterImages.value=''; imagesPreview.innerHTML=''; } };
    r.readAsDataURL(f);
  });
};

publishArtwork.onclick = async ()=>{
  if(!auth.currentUser) return showModalByEl(authModal);
  if(!artTitle.value || artTemp.chapters.length===0) return toast('Add title and at least one chapter');
  const seriesRef = await db.collection('series').add({
    title: artTitle.value,
    description: artDesc.value||'',
    tags: (artTags.value||'').split(',').map(s=>s.trim()).filter(Boolean),
    language: artLang.value||'en',
    type: 'comic',
    creatorId: auth.currentUser.uid,
    creatorName: currentUser?.username || auth.currentUser.email,
    cover: artTemp.chapters[0].images[0] || null,
    status: 'ongoing',
    created: Date.now(),
    likes: 0,
    chapters: []
  });
  const sid = seriesRef.id;
  // upload images (convert dataURL->blob)
  for(const ch of artTemp.chapters){
    const uploadedUrls = [];
    for(const [i, dataUrl] of ch.images.entries()){
      const blob = dataURLToBlob(dataUrl);
      const ref = storage.ref().child(`series/${auth.currentUser.uid}/${sid}/${ch.id}_${i}.jpg`);
      const snap = await ref.put(blob);
      uploadedUrls.push(await snap.ref.getDownloadURL());
    }
    ch.images = uploadedUrls;
    // push chapter into series document
    await db.collection('series').doc(sid).update({ chapters: firebase.firestore.FieldValue.arrayUnion(ch) });
  }
  artTemp = { chapters: [] };
  artTitle.value=''; artDesc.value=''; artTags.value='';
  hideModalByEl(uploadArtwork);
  toast('Published');
  renderFeed();
};

saveNovelChapter.onclick = ()=>{
  const t = novelChapterTitle.value.trim(); const txt = novelChapterContent.value.trim();
  if(!t || !txt) return toast('Add chapter title & content');
  novelTemp.chapters.push({ id:'ch_'+Date.now().toString(36), title:t, contentType:'text', text:txt, stats:{likes:0}, comments:[] });
  novelChapterTitle.value=''; novelChapterContent.value='';
  toast('Chapter saved');
};

publishNovelSeries.onclick = async ()=>{
  if(!auth.currentUser) return showModalByEl(authModal);
  if(!novelTitle.value || novelTemp.chapters.length===0) return toast('Add title and chapters');
  await db.collection('series').add({
    title: novelTitle.value,
    description: novelDesc.value||'',
    tags: (novelTags.value||'').split(',').map(s=>s.trim()).filter(Boolean),
    language: novelLang.value||'en',
    type: 'novel',
    creatorId: auth.currentUser.uid,
    creatorName: currentUser?.username || auth.currentUser.email,
    cover: null,
    status: 'ongoing',
    created: Date.now(),
    likes: 0,
    chapters: novelTemp.chapters
  });
  novelTemp = { chapters: [] };
  novelTitle.value=''; novelDesc.value=''; novelTags.value='';
  hideModalByEl(uploadNovel);
  toast('Published');
  renderFeed();
};

cancelArtwork.onclick = ()=> hideModalByEl(uploadArtwork);
cancelNovel.onclick = ()=> hideModalByEl(uploadNovel);

// helper
function dataURLToBlob(dataURL){
  const arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]); let n=bstr.length; const u8arr = new Uint8Array(n);
  while(n--) u8arr[n]=bstr.charCodeAt(n);
  return new Blob([u8arr],{type:mime});
}

// ---------- notifications ----------
async function renderNotifications(){
  notifList.innerHTML = '<div class="muted">Loading...</div>';
  if(!auth.currentUser){ notifList.innerHTML = '<div class="muted">Sign in to view notifications</div>'; showModalByEl(notifModal); return; }
  const snap = await db.collection('notifications').where('to','==', auth.currentUser.uid).orderBy('created','desc').limit(50).get();
  notifList.innerHTML = '';
  snap.forEach(d => { const n = d.data(); const div = document.createElement('div'); div.className='card'; div.innerHTML = `<div>${n.text}</div><div class="muted small">${new Date(n.created).toLocaleString()}</div>`; notifList.appendChild(div); });
  showModalByEl(notifModal);
}

// ---------- search ----------
searchInput.oninput = async ()=>{
  const q = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = 'Searching...';
  const snap = await db.collection('series').get();
  searchResults.innerHTML = '';
  snap.forEach(d=>{
    const s = d.data();
    if(s.title.toLowerCase().includes(q) || (s.tags||[]).join(' ').toLowerCase().includes(q)){
      const item = document.createElement('div'); item.className='card'; item.innerHTML = `<div>${s.title}</div><div class="muted small">${s.creatorName||'Unknown'}</div>`;
      item.onclick = ()=> { hideModalByEl(searchModal); openSeriesInfo(d.id); };
      searchResults.appendChild(item);
    }
  });
};

// initial seed check (creates demo series if none)
(async function seedIfEmpty(){
  const snap = await db.collection('series').limit(1).get();
  if(snap.empty){
    const uid = 'demo_'+Date.now().toString(36);
    await db.collection('users').doc(uid).set({id:uid,username:'DemoAuthor',email:'demo@cn',roles:['author'],createdAt:Date.now(),followers:[],following:[],playlists:[],history:{}});
    await db.collection('series').add({
      title:'Demo Manhwa',
      description:'Demo series to get started',
      tags:['demo'],
      language:'ko',
      type:'comic',
      creatorId: uid,
      creatorName: 'DemoAuthor',
      cover: 'https://via.placeholder.com/400x600',
      status: 'ongoing',
      created: Date.now(),
      likes: 10,
      chapters: [{ id:'ch_demo',title:'Chapter 1',contentType:'images',images:['https://via.placeholder.com/800x1200?text=Demo'],stats:{likes:0},comments:[] }]
    });
  }
  await renderFeed();
})();

console.log('App initialized');
