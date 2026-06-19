import admin from 'c:/Users/jmateus/Documents/Proyectos/Glocation/glocationweb-backend/innovaciones/node_modules/firebase-admin';

// Initialize App
admin.initializeApp({
  projectId: 'pgweb26'
});

const db = admin.app().firestore('desarrollo');

async function checkUsers() {
  console.log('Querying usuarios collection in desarrollo database...');
  try {
    const snapshot = await db.collection('usuarios').get();
    console.log(`Found ${snapshot.size} documents.`);
    snapshot.forEach(doc => {
      console.log(`ID: ${doc.id}, Data:`, doc.data());
    });
  } catch (err) {
    console.error('Error querying Firestore:', err);
  }
}

checkUsers();
