const BASE_URL = "http://localhost:3000";

/**
 * Obtiene el ranking de todos los jugadores junto con el porcentaje de éxito medio.
 * Realiza una solicitud GET al servidor para recuperar el ranking ordenado
 * y el porcentaje de éxito medio de todos los jugadores.
 * 
 * @returns {Promise<Object>} Promesa que resuelve con los datos del ranking y el promedio de éxito.
 */
async function getRanking() {
  const response = await fetch(`${BASE_URL}/ranking`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

/**
 * Obtiene el jugador con el peor porcentaje de éxito.
 * Realiza una solicitud GET al servidor para recuperar los detalles
 * del jugador con el peor porcentaje de éxito.
 * 
 * @returns {Promise<Object>} Promesa que resuelve con los datos del jugador con el peor porcentaje de éxito.
 */
async function getLoser() {
  const response = await fetch(`${BASE_URL}/ranking/loser`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

/**
 * Obtiene el jugador con el mejor porcentaje de éxito.
 * Realiza una solicitud GET al servidor para recuperar los detalles
 * del jugador con el mejor porcentaje de éxito.
 * 
 * @returns {Promise<Object>} Promesa que resuelve con los datos del jugador con el mejor porcentaje de éxito.
 */
async function getWinner() {
  const response = await fetch(`${BASE_URL}/ranking/winner`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Exporta las funciones para su uso en otras partes de la aplicación.
export const rankingService = {
  getRanking,
  getLoser,
  getWinner,
};
