export type Player = {
  id: string;
  name: string;
};

export type PlayerStats = Player & {
  goals: number;
  assists: number;
  fouls: number;
};


export type Teams = {
  teamA: Player[];
  teamB: Player[];
};


export type MatchTeams = {
  teamA: PlayerStats[];
  teamB: PlayerStats[];
};