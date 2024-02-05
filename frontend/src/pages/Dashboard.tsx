import { IGame } from "@/interfaces/game.interfaces";
import { IRankingData} from "@/interfaces/rankingData.interface";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { gameService } from "@/services/games.services";
import { rankingService } from "@/services/ranking.services";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [diceValues, setDiceValues] = useState({ dice1: 0, dice2: 0 });
  const [result, setResult] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [playerGames, setPlayerGames] = useState<IGame[]>([]);
  const [showGames, setShowGames] = useState(false);
  const [rankingData, setRankingData] = useState<IRankingData | null>(null);
  const [showRanking, setShowRanking] = useState(false); // Estado para controlar la visibilidad del ranking
  const [successRate, setSuccessRate] = useState<number | null>(null);



  useEffect(() => {
    fetchRankingData();
  }, []);
  async function fetchRankingData() {
    try {
      const rankingResponse = await rankingService.getRanking();
      setRankingData(rankingResponse);
    } catch (error) {
      console.error("Error al obtener el ranking:", error);
    }
  }

  useEffect(() => {
    if (rankingData) {
      const currentPlayerId = localStorage.getItem("playerId");
      const currentPlayerData = rankingData.sortPlayersWithWinPercentage.find(player => player.id === currentPlayerId);
      if (currentPlayerData) {
        setSuccessRate(currentPlayerData.winPercentage);
      }
    }
  }, [rankingData]);

  const rollDice = async () => {
    setIsRolling(true);
    setResult("");

    const playerId = localStorage.getItem("playerId");
    if (!playerId) {
      alert("Por favor, regístrese o inicie sesión para jugar.");
      navigate("/");
      return;
    }

    try {
      // Llama al backend para realizar el juego y obtener los resultados
      const gameResult = await gameService.playGame(playerId);
      // Actualiza el estado con los valores de los dados y el resultado del juego
      setDiceValues({ dice1: gameResult.dice1, dice2: gameResult.dice2 });
      // Utiliza el valor correcto de gameResult para actualizar el mensaje de resultado
      setResult(gameResult.result ? "¡Has ganado 🎉!" : "Intenta de nuevo");
    } catch (error) {
      console.error("Error al lanzar los dados:", error);
      setResult("Error al intentar lanzar los dados");
    } finally {
      setIsRolling(false);
    }
  };
  const fetchPlayerGames = async () => {
    const playerId = localStorage.getItem("playerId");

    if (playerId) {
      try {
        const games = await gameService.getGamesByPlayerId(playerId);
        setPlayerGames(games);
        setShowGames(true);
        // Ocultamos el ranking si se estaba mostrando
      } catch (error) {
        console.error("Error al obtener las tiradas del jugador:", error);
        setShowGames(false);
      }
    } else {
      alert("Por favor, regístrese o inicie sesión para jugar.");
    }
  };

  const deleteAllPlayerGames = async () => {
    const playerId = localStorage.getItem("playerId");
    if (!playerId) {
      alert("Por favor, regístrese o inicie sesión para jugar.");
      return;
    }

    try {
      await gameService.deleteGamesByPlayerId(playerId);
      alert("Todas las tiradas han sido eliminadas.");
      setPlayerGames([]); // Limpia el listado de tiradas
      setShowGames(false); // Oculta el listado
    } catch (error) {
      console.error("Error al eliminar las tiradas del jugador:", error);
    }
  };
  useEffect(() => {
    console.log("RankingData updated:", rankingData);
    const currentPlayerId = localStorage.getItem("playerId");
    if (rankingData && currentPlayerId) {
      const currentPlayerData = rankingData.sortPlayersWithWinPercentage.find(player => player.id.toString() === currentPlayerId);
      if (currentPlayerData) {
        setSuccessRate(currentPlayerData.winPercentage);
      } else {
        // Si el jugador actual no está en el ranking, se muestra un mensaje o se maneja de alguna manera.
        setSuccessRate(null); // O manejar de otra manera
      }
    }
  }, [rankingData]);
  
  const hideRanking = () => {
    setShowRanking(false); // Oculta el ranking
  };
  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const rankingResponse = await rankingService.getRanking();
        setRankingData(rankingResponse);
        setShowRanking(true); // Muestra el ranking solo si se obtuvieron los datos exitosamente
      } catch (error) {
        console.error("Error al obtener el ranking:", error);
        setShowRanking(false); // Oculta el ranking si hubo un error
      }
    };
  
    if(showRanking) { // Solo llama a fetchRankingData si showRanking es true
      fetchRankingData();
    }
  }, [showRanking]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-24">
      <nav>
        <Button onClick={() => navigate("/")}>Logout</Button>
        <Button onClick={fetchPlayerGames}>Mostrar Tiradas</Button>
        <Button onClick={fetchRankingData}>Mostrar Ranking de Jugadores</Button>
        
      </nav>
      <h1>🎲 Welcome to the Ultimate Dice Roller 🎲</h1>
      <div>
        <p>Dado 1: {diceValues.dice1}</p>
        <p>Dado 2: {diceValues.dice2}</p>
        <p className="message text-lg text-green-600">{result}</p>
      </div>
      <Button type="button" onClick={rollDice} disabled={isRolling}>
        Roll Dice
      </Button>
      {showGames && (
        <>
          <div>
            <h2>Mis Tiradas</h2>
            {successRate !== null ? <p>Porcentaje de éxito: {successRate}%</p> : <p>Porcentaje de éxito no disponible</p>}
            <ul>
              {playerGames.map((game, index) => (
                <li key={index}>
                  Dado 1: {game.dice1}, Dado 2: {game.dice2}, Resultado: {game.result ? "Ganado" : "Perdido"}
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={() => setShowGames(false)}>Ocultar Tiradas</Button>
          <Button onClick={deleteAllPlayerGames}>Eliminar Todas Mis Tiradas</Button>
        </>
      )}
      {rankingData && (
        <>
          <h2>Ranking de Jugadores</h2>
          <ul>
            {rankingData.sortPlayersWithWinPercentage.map((player, index) => (
              <li key={index}>
                {'Id '}
                {player.id}
                {'-'}
                {player.name}: {player.winPercentage}%
              </li>
            ))}
          </ul>
          <p>Promedio de éxito general: {rankingData.averageSuccessRate}%</p>
          
          <Button onClick={hideRanking}>Ocultar Ranking de Jugadores</Button>
        </>
      )}
    </main>
  );
}

export default Dashboard;
