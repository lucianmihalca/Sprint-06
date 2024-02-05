const BASE_URL = "http://localhost:3000";

/**
 * Obtiene la lista completa de jugadores registrados en el sistema.
 * Realiza una solicitud GET al endpoint /players para recuperar todos los jugadores.
 *
 * @returns {Promise<Array>} Una promesa que resuelve con la lista de todos los jugadores.
 */
async function getAllPlayers() {
  const response = await fetch(`${BASE_URL}/players`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
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
  const requestBody = JSON.stringify({ playerName: name });
  const response = await fetch(`${BASE_URL}/players`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: requestBody
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
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
  const requestBody = JSON.stringify({ playerName: name });
  const response = await fetch(`${BASE_URL}/players/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: requestBody
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export const playerService = {
  getAllPlayers,
  createPlayer,
  updatePlayerName
};
