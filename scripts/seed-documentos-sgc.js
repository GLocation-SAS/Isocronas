/**
 * Script para crear la colección documentosSGC y un documento de ejemplo
 * en Firestore (base de datos "desarrollo" del proyecto pgweb26)
 * 
 * Uso: node scripts/seed-documentos-sgc.js
 */

const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

// Inicializar con credenciales por defecto (Application Default Credentials)
const app = initializeApp({
  projectId: "pgweb26",
  credential: applicationDefault(),
});

// Conectar a la base de datos "desarrollo"
const db = getFirestore(app, "desarrollo");

async function seedDocumentosSGC() {
  const now = Timestamp.now();

  const docData = {
    id: "doc_001",
    categoriaId: "cat_001",
    nombre: "Arquitectura en capas",
    estado: "PUBLICADO",
    urlDrive: "https://drive.google.com/...",
    createdAt: now,
    updatedAt: now,
    createdBy: "uid123",
    updatedBy: "uid456",
  };

  try {
    // Crear el documento con ID personalizado "doc_001" en la colección "documentosSGC"
    const docRef = db.collection("documentosSGC").doc("doc_001");
    await docRef.set(docData);

    console.log("✅ Documento creado exitosamente en documentosSGC/doc_001");
    console.log("📄 Datos:", JSON.stringify({
      ...docData,
      createdAt: now.toDate().toISOString(),
      updatedAt: now.toDate().toISOString(),
    }, null, 2));
  } catch (error) {
    console.error("❌ Error al crear el documento:", error.message);
  } finally {
    await app.delete();
  }
}

seedDocumentosSGC();
