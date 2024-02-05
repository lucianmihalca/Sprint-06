// En tu archivo de definición de interfaz
export interface IRankingPlayer {
    id: string; // Asegúrate de que este tipo coincida con el tipo de identificador que usas (puede ser number o string dependiendo de tu backend)
    name: string;
    winPercentage: number;
  }
  
  export interface IRankingData {
    sortPlayersWithWinPercentage: IRankingPlayer[];
    averageSuccessRate: number;
  }
  