import admin from 'c:/Users/jmateus/Documents/Proyectos/Glocation/glocationweb-backend/innovaciones/node_modules/firebase-admin';

// Initialize App
admin.initializeApp({
  projectId: 'pgweb26'
});

async function checkDbs() {
  const dbIds = ['(default)', 'desarrollo', 'stage', 'produccion'];
  for (const dbId of dbIds) {
    console.log(`\nChecking database: "${dbId}"`);
    try {
      const db = admin.app().firestore(dbId);
      const snapshot = await db.collection('usuarios').get();
      console.log(`-> usuarios count: ${snapshot.size}`);
      if (snapshot.size > 0) {
        console.log(`First user in ${dbId}:`, snapshot.docs[0].id, snapshot.docs[0].data());
      }
    } catch (err) {
      console.log(`-> error: ${err.message}`);
    }
  }
}

checkDbs();
