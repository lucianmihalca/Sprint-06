import axios from "axios";
const BASE_URL = "http://localhost:3000";

/**
 * Obtiene el ranking de todos los jugadores junto con el porcentaje de éxito medio.
 * Realiza una solicitud GET al servidor para recuperar el ranking ordenado
 * y el porcentaje de éxito medio de todos los jugadores.
 *
 * @returns {Promise<Object>} Promesa que resuelve con los datos del ranking y el promedio de éxito.
 */
async function getRanking() {
  try {
    const response = await axios.get(`${BASE_URL}/ranking`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = `Error al obtener el ranking de jugadores`;
      console.error(message);
      throw new Error(message);
    } else {
      console.error(`Error inesperado al obtener el ranking de jugadores: ${error}`);
      throw new Error("Error inesperado al obtener el ranking de jugadores.");
    }
  }
}

/**
 * Obtiene el jugador con el peor porcentaje de éxito.
 * Realiza una solicitud GET al servidor para recuperar los detalles
 * del jugador con el peor porcentaje de éxito.
 *
 * @returns {Promise<Object>} Promesa que resuelve con los datos del jugador con el peor porcentaje de éxito.
 */
async function getLoser() {
  try {
    const response = await axios.get(`${BASE_URL}/ranking/loser`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = `Error al obtener el jugador con el peor porcentaje de éxito`;
      console.error(message);
      throw new Error(message);
    } else {
      console.error(`Error inesperado al obtener el jugador con el peor porcentaje de éxito: ${error}`);
      throw new Error("Error inesperado al obtener el jugador con el peor porcentaje de éxito.");
    }
  }
}

/**
 * Obtiene el jugador con el mejor porcentaje de éxito.
 * Realiza una solicitud GET al servidor para recuperar los detalles
 * del jugador con el mejor porcentaje de éxito.
 *
 * @returns {Promise<Object>} Promesa que resuelve con los datos del jugador con el mejor porcentaje de éxito.
 */
async function getWinner() {
  try {
    const response = await axios.get(`${BASE_URL}/ranking/winner`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = `Error al obtener el jugador con el mejor porcentaje de éxito`;
      console.error(message);
      throw new Error(message);
    } else {
      console.error(`Error inesperado al obtener el jugador con el mejor porcentaje de éxito: ${error}`);
      throw new Error("Error inesperado al obtener el jugador con el mejor porcentaje de éxito.");
    }
  }
}

export const rankingService = {
  getRanking,
  getLoser,
  getWinner
};
