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
  const response = await fetch(`${BASE_URL}/games/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    const errorResponse = await response.text();
    console.error(`Error al crear el juego: ${errorResponse}`);
    throw new Error("No se pudo crear el juego");
  }

  const gameData = await response.json();
  console.log("Juego creado con éxito:", gameData);
  return gameData;
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
  const response = await fetch(`${BASE_URL}/games/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
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
  const response = await fetch(`${BASE_URL}/games/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json(); 
}

export const gameService = {
  playGame,
  getGamesByPlayerId,
  deleteGamesByPlayerId
};
