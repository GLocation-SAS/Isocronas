import { HeartPulse, GraduationCap, Store, Pill, Utensils, TreePine, Train, Bus } from "lucide-react";

export const MOCK_POIS = [
  // Hospitales / Salud (Carmesí / HeartPulse icon como foto de referencia)
  { id: "h1", type: "hospitals", name: "Hospital San Ignacio", dx: -120, dy: -80, icon: HeartPulse, color: "bg-[#e11d48]" },
  { id: "h2", type: "hospitals", name: "Clínica Marly", dx: 80, dy: -140, icon: HeartPulse, color: "bg-[#e11d48]" },
  { id: "h3", type: "hospitals", name: "Centro de Salud La Candelaria", dx: -40, dy: 110, icon: HeartPulse, color: "bg-[#e11d48]" },
  { id: "h4", type: "hospitals", name: "Hospital Santa Clara", dx: 160, dy: 90, icon: HeartPulse, color: "bg-[#e11d48]" },
  { id: "h5", type: "hospitals", name: "Clínica del Country (Sede)", dx: -180, dy: 60, icon: HeartPulse, color: "bg-[#e11d48]" },
  { id: "h6", type: "hospitals", name: "Centro Médico Teusaquillo", dx: 140, dy: -60, icon: HeartPulse, color: "bg-[#e11d48]" },

  // Colegios / Educación (Indigo / GraduationCap icon)
  { id: "e1", type: "schools", name: "Colegio Mayor de San Bartolomé", dx: -90, dy: 40, icon: GraduationCap, color: "bg-[#6366f1]" },
  { id: "e2", type: "schools", name: "Universidad de los Andes", dx: 110, dy: -110, icon: GraduationCap, color: "bg-[#6366f1]" },
  { id: "e3", type: "schools", name: "Universidad del Rosario", dx: -30, dy: -70, icon: GraduationCap, color: "bg-[#6366f1]" },
  { id: "e4", type: "schools", name: "Colegio Manuela Beltrán", dx: 180, dy: 130, icon: GraduationCap, color: "bg-[#6366f1]" },

  // Tiendas / Comercio (Carmesí / Store icon)
  { id: "s1", type: "stores", name: "Éxito Calle 53", dx: -150, dy: -130, icon: Store, color: "bg-[#e11d48]" },
  { id: "s2", type: "stores", name: "Centro Comercial Santafé", dx: 60, dy: 60, icon: Store, color: "bg-[#e11d48]" },
  { id: "s3", type: "stores", name: "Supermercado Carulla", dx: -60, dy: -30, icon: Store, color: "bg-[#e11d48]" },
  { id: "s4", type: "stores", name: "Plaza de Mercado Paloquemao", dx: 130, dy: 160, icon: Store, color: "bg-[#e11d48]" },

  // Droguerías / Farmacias (Teal / Pill icon)
  { id: "p1", type: "pharmacies", name: "Droguería Cruz Verde", dx: -70, dy: -120, icon: Pill, color: "bg-[#0284c7]" },
  { id: "p2", type: "pharmacies", name: "Farmatodo Septima", dx: 40, dy: -50, icon: Pill, color: "bg-[#0284c7]" },
  { id: "p3", type: "pharmacies", name: "Droguerías La Rebaja", dx: 90, dy: 80, icon: Pill, color: "bg-[#0284c7]" },

  // Comida / Restaurantes (Orange / Utensils icon)
  { id: "f1", type: "food", name: "Restaurante Andrés DC", dx: 30, dy: -150, icon: Utensils, color: "bg-[#ea580c]" },
  { id: "f2", type: "food", name: "Café Pasaje", dx: -110, dy: 20, icon: Utensils, color: "bg-[#ea580c]" },
  { id: "f3", type: "food", name: "Crepes & Waffles Centro", dx: -10, dy: 80, icon: Utensils, color: "bg-[#ea580c]" },

  // Parques (Green / TreePine icon)
  { id: "pk1", type: "parks", name: "Parque de la Independencia", dx: -130, dy: -50, icon: TreePine, color: "bg-[#10b981]" },
  { id: "pk2", type: "parks", name: "Parque Tercer Milenio", dx: 120, dy: 120, icon: TreePine, color: "bg-[#10b981]" },

  // TM (Red / Train icon)
  { id: "tm1", type: "tm", name: "Estación Museo del Oro", dx: -20, dy: -90, icon: Train, color: "bg-[#ef4444]" },
  { id: "tm2", type: "tm", name: "Estación San Victorino", dx: 70, dy: 40, icon: Train, color: "bg-[#ef4444]" },

  // SITP (Blue / Bus icon)
  { id: "st1", type: "sitp", name: "Paradero Cra 7 Cl 19", dx: 50, dy: -80, icon: Bus, color: "bg-[#3b82f6]" },
  { id: "st2", type: "sitp", name: "Paradero Av Jiménez", dx: -80, dy: 10, icon: Bus, color: "bg-[#3b82f6]" },
];

export const getTransportFactor = (mode: string) => {
  switch (mode) {
    case "walk": return 0.65;
    case "bike": return 1.0;
    case "transit": return 1.2;
    case "car": return 1.6;
    case "motorcycle": return 1.7;
    default: return 1.0;
  }
};

export const getTransportSpeed = (mode: string) => {
  switch (mode) {
    case "walk": return 4.5;
    case "bike": return 15;
    case "transit": return 25;
    case "car": return 30;
    case "motorcycle": return 35;
    default: return 15;
  }
};

export const getRoadNetworkRadius = (angle: number, baseR: number) => {
  const rad = (angle * Math.PI) / 180;
  
  // Simulate main avenues at 0, 90, 180, 270 (North, South, East, West axes)
  // and diagonal main roads at 45, 135, 225, 315
  const avenue1 = Math.abs(Math.cos(rad * 2));
  const avenue2 = Math.abs(Math.sin(rad * 2));
  const avenueEffect = 0.45 * Math.pow(Math.max(avenue1, avenue2), 4);
  
  // Grid block structure noise
  const gridEffect = 0.08 * Math.sin(angle * 8) * Math.cos(angle * 6);
  
  const factor = 0.55 + avenueEffect + gridEffect;
  return baseR * factor;
};

export const isPoiInsideIsochrone = (
  poi: { dx: number; dy: number },
  travelTime: number,
  transportMode: string
) => {
  const transportFactor = getTransportFactor(transportMode);
  // maxSize inside SVG viewport logic mapping to scale
  const maxSize = (travelTime / 30) * 550 * transportFactor;
  
  const poiAngle = Math.atan2(poi.dy, poi.dx) * (180 / Math.PI);
  const angleDeg = poiAngle < 0 ? poiAngle + 360 : poiAngle;
  
  const baseR = travelTime <= 5 ? 75 : travelTime <= 10 ? 150 : travelTime <= 15 ? 225 : travelTime <= 30 ? 300 : 450;
  const boundaryR = getRoadNetworkRadius(angleDeg, baseR) * (maxSize / 1000);
  const D = Math.sqrt(poi.dx * poi.dx + poi.dy * poi.dy);
  
  return D <= boundaryR;
};

export const calculateMockRoute = (
  pointA: { lat: number; lng: number },
  pointB: { lat: number; lng: number },
  transportMode: string
) => {
  // Simple euclidian distance for mock purposes (not geographically accurate)
  const dx = (pointB.lng - pointA.lng) * 111.32; // approx km per degree
  const dy = (pointB.lat - pointA.lat) * 110.57; // approx km per degree
  const distanceKm = Math.sqrt(dx * dx + dy * dy);
  
  // Sinuosity factor (roads aren't straight lines)
  const sinuosity = 1.4;
  const actualDistanceKm = distanceKm * sinuosity;
  
  const speedKmh = getTransportSpeed(transportMode);
  
  // Time in minutes
  const timeMin = Math.round((actualDistanceKm / speedKmh) * 60);
  
  return {
    time: Math.max(1, timeMin),
    distance: actualDistanceKm.toFixed(1)
  };
};
