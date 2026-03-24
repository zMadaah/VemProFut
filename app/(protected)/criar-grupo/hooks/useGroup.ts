import { useMemo, useState } from "react";

export interface Player {
  id: string;
  name: string;
}

export function useGroup() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamSize, setTeamSize] = useState<number | null>(null);

  function addPlayer(name: string) {
    if (!name.trim()) return;

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: name.trim(),
    };

    setPlayers((prev) => [...prev, newPlayer]);
  }

  function selectMode(size: number) {
    setTeamSize(size);
    setPlayers([]);
  }

  const teams = useMemo(() => {
    if (!teamSize) return [];

    const result: Player[][] = [];

    for (let i = 0; i < players.length; i += teamSize) {
      result.push(players.slice(i, i + teamSize));
    }

    return result;
  }, [players, teamSize]);

  const isMatchReady =
  teamSize &&
  teams.length >= 2 &&
  teams[0].length === teamSize &&
  teams[1].length === teamSize;

  return {
    players,
    teams,
    teamSize,
    selectMode,
    addPlayer,
  };
}