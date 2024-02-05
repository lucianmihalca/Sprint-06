import axios from "axios";

const BASE_URL = "http://localhost:3000";

/**
 * Obtiene la lista completa de jugadores registrados en el sistema.
 * Realiza una solicitud GET al endpoint /players para recuperar todos los jugadores.
 *
 * @returns {Promise<Array>} Una promesa que resuelve con la lista de todos los jugadores.
 */
async function getAllPlayers() {
  try {
    const response = await axios.get(`${BASE_URL}/players`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = `Error al obtener la lista de jugadores`;
      console.error(message);
      throw new Error(message);
    } else {
      console.error(`Error inesperado al obtener la lista de jugadores: ${error}`);
      throw new Error("Error inesperado al obtener la lista de jugadores.");
    }
  }
}

/**
 * Crea un nuevo jugador con el nombre proporcionado.
 * Si no se proporciona un nombre, el backend asignará "ANÓNIMO".
 * Realiza una solicitud POST al endpoint /players.
 *
 * @param {string} name El nombre del nuevo jugador a crear.
 * @returns {Promise<Object>} Una promesa que resuelve con los detalles del jugador creado.
 */
async function createPlayer(name?: string) {
  try {
    const response = await axios.post(`${BASE_URL}/players`, { playerName: name });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = `Error al crear el jugador`;
      console.error(message);
      throw new Error(message);
    } else {
      console.error(`Error inesperado al crear el jugador: ${error}`);
      throw new Error("Error inesperado al crear el jugador.");
    }
  }
}

/**
 * Actualiza el nombre de un jugador existente por su ID.
 * Realiza una solicitud PUT al endpoint /players/{id} para actualizar el nombre del jugador.
 *
 * @param {number} id El ID del jugador cuyo nombre se va a actualizar.
 * @param {string} name El nuevo nombre para el jugador.
 * @returns {Promise<Object>} Una promesa que resuelve con los detalles del jugador actualizado.
 */
async function updatePlayerName(id: number, name: string) {
  try {
    const response = await axios.put(`${BASE_URL}/players/${id}`, { playerName: name });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = `Error al actualizar el nombre del jugador con ID: ${id}`;
      console.error(message);
      throw new Error(message);
    } else {
      console.error(`Error inesperado al actualizar el nombre del jugador: ${error}`);
      throw new Error("Error inesperado al actualizar el nombre del jugador.");
    }
  }
}

export const playerService = {
  getAllPlayers,
  createPlayer,
  updatePlayerName
};
