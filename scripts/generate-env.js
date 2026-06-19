/* eslint-disable */
const fs = require('fs');
const path = require('path');

const environment = process.argv[2] || 'dev';
const yamlPath = path.join(__dirname, '..', `${environment}.yaml`);

if (!fs.existsSync(yamlPath)) {
  console.error(`Yaml file not found: ${yamlPath}`);
  process.exit(1);
}

const yaml = fs.readFileSync(yamlPath, 'utf8');
const envVars = {};
let inEnvVars = false;

yaml.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed.startsWith('env_variables:')) {
    inEnvVars = true;
    return;
  }
  if (inEnvVars) {
    if (line.startsWith(' ') || line.startsWith('\t')) {
      const parts = trimmed.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        let val = parts.slice(1).join(':').trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        envVars[key] = val;
      }
    } else if (trimmed !== '') {
      inEnvVars = false;
    }
  }
});

// ─── URLs de microservicios independientes ──────────────────────────────────
// Cada servicio backend se despliega en Cloud Run con el patrón:
// https://${environment}-${servicio}-330426731666.us-east1.run.app
const microservices = [
  'usuarios',
  'areas',
  'cargos',
  'roles',
  'parentescos',
  'contacto',
  'upload',
  'upload-documents',
  'innovaciones',
  'rutas',
  'document-repository',
  'folders',
];

const projectNumber = '330426731666';
const region = 'us-east1';

let envContent = '';

// Generar la URL fallback general (apunta al servicio de usuarios por defecto)
envContent += `NEXT_PUBLIC_API_URL=https://${environment}-usuarios-${projectNumber}.${region}.run.app\n`;

// Generar una variable por cada microservicio
microservices.forEach(svc => {
  const key = `NEXT_PUBLIC_API_URL_${svc.replace(/-/g, '_').toUpperCase()}`;
  const url = `https://${environment}-${svc}-${projectNumber}.${region}.run.app`;
  envContent += `${key}=${url}\n`;
});

// Añadir las variables del yaml (Firebase, etc.)
Object.entries(envVars).forEach(([k, v]) => {
  envContent += `${k}=${v}\n`;
});

const envPath = path.join(__dirname, '..', '.env');
fs.writeFileSync(envPath, envContent);
console.log(`Generated .env for ${environment} successfully.`);
console.log(`Microservice URLs configured for: ${microservices.join(', ')}`);
