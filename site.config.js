/**
 * Configuración del sitio — Alexandra Ananga
 * 
 * MODO_CAMPANA (false por defecto):
 *   false → Sitio informativo, sin llamados explícitos a votar ni número de lista destacado.
 *   true  → Se activan los llamados al voto y el número de lista destacado.
 * 
 * MODO_SILENCIO (false por defecto):
 *   false → Se muestra todo el contenido.
 *   true  → Se oculta todo contenido de propaganda. Solo queda información neutra
 *           para votar: fecha, horario, enlace del CNE.
 */
const SITE_CONFIG = {
  MODO_CAMPANA: false,
  MODO_SILENCIO: false,

  // ─── Datos de la candidata ───────────────────────────────────────
  nombre: "Alexandra Ananga",
  cargo: "Candidata a la Alcaldía de Palora",
  organizacion: "Pachakutik",
  numeroLista: "18",
  lema: "Menos palabras más obras",
  canton: "Palora",
  provincia: "Morona Santiago",

  // ─── Fecha de elecciones ─────────────────────────────────────────
  fechaEleccion: "Domingo 29 de noviembre de 2026",
  horarioVotacion: "07:00 a 17:00",
  enlaceCNE: "[[POR COMPLETAR: URL verificada del CNE para consultar lugar de votación]]",

  // ─── Enlaces de redes y contacto ─────────────────────────────────
  enlaces: {
    tiktok: "https://www.tiktok.com/@alexandra_anangak",
    facebook: "https://www.facebook.com/profile.php?id=61583568122177",
    otros: []
  },

  // ─── Dominio ────────────────────────────────────────────────────
  dominio: "alexandraananga.com",

  // ─── Datos legales de campaña ───────────────────────────────────
  datosLegalesCampana: "Responsable del Manejo Económico: Por definir | RUC: Por definir | Campaña Electoral Alcaldía de Palora 2026",
};
