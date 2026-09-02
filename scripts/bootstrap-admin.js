/**
 * One-time admin bootstrap for Hello Customer Fintech Solutions.
 *
 * Run only from a trusted local/admin environment with Firebase Admin credentials.
 * It never belongs in the browser or GitHub Pages runtime.
 *
 * Usage:
 *   npm install firebase-admin
 *   GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/service-account.json \
 *   HC_ADMIN_EMAIL=admin@example.com \
 *   HC_ADMIN_USERNAME=adminuser \
 *   HC_ADMIN_NAME="Platform Administrator" \
 *   HC_ADMIN_MOBILE=9876543210 \
 *   HC_ADMIN_PASSWORD='StrongPassword!123' \
 *   node scripts/bootstrap-admin.js
 */
const admin = require('firebase-admin');

const required = ['HC_ADMIN_EMAIL','HC_ADMIN_USERNAME','HC_ADMIN_NAME','HC_ADMIN_MOBILE','HC_ADMIN_PASSWORD'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
}

const email = process.env.HC_ADMIN_EMAIL.trim().toLowerCase();
const username = process.env.HC_ADMIN_USERNAME.trim().toLowerCase();
const fullName = process.env.HC_ADMIN_NAME.trim();
const mobile = process.env.HC_ADMIN_MOBILE.replace(/\D/g, '');
const password = process.env.HC_ADMIN_PASSWORD;

if (!/^[a-zA-Z0-9._-]{4,30}$/.test(username)) throw new Error('Admin username must be 4–30 characters.');
if (!/^[6-9]\d{9}$/.test(mobile)) throw new Error('Admin mobile must be a valid 10-digit Indian mobile number.');
if (password.length < 12 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
  throw new Error('Admin password must be 12+ characters with uppercase, lowercase, number and special character.');
}

admin.initializeApp({ projectId: 'hcfintechsolutions' });
const db = admin.firestore();

(async () => {
  let user;
  try {
    user = await admin.auth().getUserByEmail(email);
    await admin.auth().updateUser(user.uid, { displayName: fullName, password, disabled: false });
  } catch (e) {
    if (e.code !== 'auth/user-not-found') throw e;
    user = await admin.auth().createUser({ email, password, displayName: fullName, disabled: false });
  }

  const usernameRef = db.collection('usernames').doc(username);
  const existingUsername = await usernameRef.get();
  if (existingUsername.exists && existingUsername.data().uid && existingUsername.data().uid !== user.uid) {
    throw new Error('Admin username is already assigned to another account.');
  }

  await db.collection('users').doc(user.uid).set({
    uid: user.uid,
    username,
    email,
    fullName,
    mobile,
    role: 'admin',
    status: 'active',
    executiveId: 'ADMIN',
    photoURL: '',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  await usernameRef.set({
    uid: user.uid,
    email,
    role: 'admin',
    reserved: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  await admin.auth().setCustomUserClaims(user.uid, { role: 'admin', active: true });
  console.log(`Admin bootstrap complete for ${email} (${user.uid}).`);
  process.exit(0);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
