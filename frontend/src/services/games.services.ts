import axios from "axios";

const BASE_URL = "http://localhost:3000";

/**
 * Crea un juego para un jugador específico por ID.
 * Realiza una solicitud POST al servidor para generar un nuevo juego basado
 * en el ID del jugador proporcionado como parámetro. El servidor responderá
 * con los datos del juego creado, incluyendo el resultado de los dados y si se ganó o no el juego.
 *
 * @param {string} id - El ID del jugador para el cual se creará el juego.
 * @returns {Promise<Object>} - Promesa que resuelve con los datos del juego creado.
 */
async function playGame(id: string) {
  console.log(`Intentando crear juego para el jugador con ID: ${id}`);
  try {
    const response = await axios.post(`${BASE_URL}/games/${id}`);
    console.log("Juego creado con éxito:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = `Error al crear el juego para el jugador con ID: ${id}`;
      console.error(message);
      throw new Error(message);
    } else {
      console.error(`Error inesperado al crear el juego: ${error}`);
      throw new Error("Error inesperado al crear el juego.");
    }
  }
}

/**
 * Obtiene todos los juegos realizados por un jugador específico a partir de su ID.
 * Realiza una solicitud GET al servidor para recuperar una lista de todos los juegos
 * jugados por el jugador, incluyendo los resultados de cada uno.
 *
 * @param {string} id - El ID del jugador cuyos juegos se quieren obtener.
 * @returns {Promise<Array>} - Promesa que resuelve con la lista de juegos del jugador.
 */
async function getGamesByPlayerId(id: string) {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = `Error al obtener los juegos del jugador con ID: ${id}`;
      console.error(message);
      throw new Error(message);
    } else {
      console.error(`Error inesperado al obtener los juegos: ${error}`);
      throw new Error("Error inesperado al obtener los juegos.");
    }
  }
}

/**
 * Elimina todos los juegos asociados a un jugador específico por ID.
 * Realiza una solicitud DELETE al servidor para eliminar todos los juegos
 * previamente jugados por el jugador. Esta operación no devuelve datos del juego,
 * pero puede responder con una confirmación de la eliminación.
 *
 * @param {string} id - El ID del jugador cuyos juegos se desean eliminar.
 * @returns {Promise<Object>} - Promesa que resuelve con la confirmación de la eliminación.
 */
async function deleteGamesByPlayerId(id: string) {
  try {
    const response = await axios.delete(`${BASE_URL}/games/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = `Error al eliminar los juegos del jugador con ID: ${id}`;
      console.error(message);
      throw new Error(message);
    } else {
      console.error(`Error inesperado al eliminar los juegos: ${error}`);
      throw new Error("Error inesperado al eliminar los juegos.");
    }
  }
}

export const gameService = {
  playGame,
  getGamesByPlayerId,
  deleteGamesByPlayerId
};
