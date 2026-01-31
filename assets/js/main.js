/* ======================================================
   Comics & Novels — Full Complete JS
   For all UI interactions and Firebase placeholders
   ====================================================== */

/* ---------- SELECTORS ---------- */
const drawer = document.getElementById('drawer');
const menuBtn = document.getElementById('menuBtn');
const drawerClose = document.getElementById('drawerClose');

const createMenu = document.getElementById('createMenu');
const plusBtn = document.getElementById('plusBtn');
const closeCreate = document.getElementById('closeCreate');

const typeTabs = document.querySelectorAll('.tab');
const topTabs = document.querySelectorAll('.top-type');

const bottomNav = document.querySelectorAll('.nav-btn');

/* ---------- DRAWER (3-DOTS) ---------- */
menuBtn.addEventListener('click', () => {
  drawer.classList.add('open');
});

drawerClose.addEventListener('click', () => {
  drawer.classList.remove('open');
});

/* ---------- CREATE POPUP ---------- */
plusBtn.addEventListener('click', () => {
  createMenu.classList.remove('hidden');
});

closeCreate.addEventListener('click', () => {
  createMenu.classList.add('hidden');
});

/* ---------- CREATE OPTIONS ---------- */
document.querySelectorAll('.create-option').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.textContent.trim();
    alert(`You clicked: ${action}. Functionality coming soon!`);
    createMenu.classList.add('hidden');
  });
});

/* ---------- TOP TYPE TABS (Comics | Novels) ---------- */
typeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    typeTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loadContent(tab.textContent.trim());
  });
});

/* ---------- TOP GENRE BUTTON ---------- */
topTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const genre = btn.textContent.trim();
    document.getElementById('currentType').textContent = genre;
    loadContent(genre);
  });
});

/* ---------- BOTTOM NAV ---------- */
bottomNav.forEach(btn => {
  btn.addEventListener('click', () => {
    bottomNav.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const section = btn.dataset.section;
    alert(`Navigate to ${section}. Functionality coming soon!`);
  });
});

/* ---------- LOAD CONTENT FUNCTION (Placeholder) ---------- */
function loadContent(type) {
  const main = document.querySelector('main#app');
  main.innerHTML = `<h3>Loading ${type} content...</h3>`;
  // Here you would fetch comics/novels from Firebase
}

/* ---------- FIREBASE SETUP PLACEHOLDER ---------- */
// Your firebaseConfig goes here, already pasted in HTML
// Initialize Firebase (Auth, Firestore, Storage)
firebase.initializeApp(firebaseConfig);

// Firebase Auth
const auth = firebase.auth();
// Firebase Firestore
const db = firebase.firestore();
// Firebase Storage
const storage = firebase.storage();

/* ---------- USER AUTH PLACEHOLDER ---------- */
function signUp(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('User signed up:', userCredential.user.uid);
    })
    .catch(error => console.error(error.message));
}

function signIn(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('User signed in:', userCredential.user.uid);
    })
    .catch(error => console.error(error.message));
}

function signOut() {
  auth.signOut().then(() => console.log('User signed out'));
}

/* ---------- FIREBASE CONTENT PLACEHOLDER ---------- */
function uploadComic(file, title) {
  const storageRef = storage.ref(`comics/${file.name}`);
  storageRef.put(file).then(() => console.log('Comic uploaded:', title));
}

function uploadNovel(content, title) {
  db.collection('novels').add({ title, content, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
    .then(doc => console.log('Novel uploaded with ID:', doc.id));
}

/* ---------- READ TRACKING PLACEHOLDER ---------- */
function trackHistory(userId, contentId, chapter) {
  db.collection('history').doc(userId)
    .set({ [contentId]: chapter }, { merge: true })
    .then(() => console.log('History updated'));
}

/* ---------- FOLLOW AUTHOR / ARTIST ---------- */
function followUser(currentUserId, targetUserId) {
  db.collection('follows').doc(currentUserId)
    .set({ [targetUserId]: true }, { merge: true })
    .then(() => console.log('Now following user:', targetUserId));
}

/* ---------- COMMENTS PLACEHOLDER ---------- */
function postComment(userId, contentId, text) {
  db.collection('comments').add({ userId, contentId, text, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
    .then(() => console.log('Comment posted'));
}

/* ======================================================
   End of JS
   ====================================================== */
