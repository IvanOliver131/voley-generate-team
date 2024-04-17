"use client";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { SyntheticEvent, useState } from "react";

type PlayerType = { name: string; rating: number };

export default function Home() {
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerType[]>([]);
  const [teamA, setTeamA] = useState<PlayerType[]>([]);
  const [teamB, setTeamB] = useState<PlayerType[]>([]);

  const handlePlayerSelection = (
    event: SyntheticEvent<Element, Event>,
    newPlayers: PlayerType[]
  ) => {
    setSelectedPlayers(newPlayers);
  };

  const shuffleArray = (array: PlayerType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleGenerateTeams = () => {
    const sortedPlayers = [...selectedPlayers].sort(
      (a, b) => b.rating - a.rating
    );

    let tempTeamA: PlayerType[] = [];
    let tempTeamB: PlayerType[] = [];
    let totalRatingTeamA = 0;
    let totalRatingTeamB = 0;

    // Limite de jogadores por time
    const maxPlayersPerTeam = 6;

    // Embaralhar jogadores para aleatoriedade
    const shuffledPlayers = shuffleArray(sortedPlayers);

    shuffledPlayers.forEach((player) => {
      if (
        tempTeamA.length < maxPlayersPerTeam &&
        (totalRatingTeamA <= totalRatingTeamB ||
          tempTeamB.length >= maxPlayersPerTeam)
      ) {
        tempTeamA.push(player);
        totalRatingTeamA += player.rating;
      } else if (tempTeamB.length < maxPlayersPerTeam) {
        tempTeamB.push(player);
        totalRatingTeamB += player.rating;
      }
    });

    setTeamA(tempTeamA);
    setTeamB(tempTeamB);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          padding: 32,
          gap: 8,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Autocomplete
          multiple
          options={allPlayers}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Jogadores" />}
          onChange={handlePlayerSelection}
        />
        <Button variant="contained" onClick={handleGenerateTeams}>
          Gerar times
        </Button>
        <div>
          <h2>Time A</h2>
          <Divider />
          {teamA.map((player: PlayerType) => (
            <div key={player.name}>{player.name}</div>
          ))}
        </div>

        <br />
        <br />
        <br />
        <hr />
        <br />
        <br />
        <br />

        <div>
          <h2>Time B</h2>
          <Divider />
          {teamB.map((player: PlayerType) => (
            <div key={player.name}>{player.name}</div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
const allPlayers: PlayerType[] = [
  { name: "Ivan", rating: 4 },
  { name: "Japa", rating: 5 },
  { name: "Nimai", rating: 5 },
  { name: "MeyMey", rating: 3 },
  { name: "Luka", rating: 3 },
  { name: "Jui", rating: 3 },
  { name: "Marivaldinho", rating: 5 },
  { name: "Marisol", rating: 3 },
  { name: "Marcus", rating: 4 },
  { name: "John", rating: 3 },
  { name: "Natalia", rating: 3 },
  { name: "Beto", rating: 5 },
  { name: "Felipe", rating: 5 },
  { name: "João Pedro", rating: 3 },
  { name: "Sal", rating: 3 },
  { name: "Katarina", rating: 3 },
  { name: "Isadora", rating: 4 },
  { name: "Tamires", rating: 4 },
  { name: "Jonatan", rating: 5 },
  { name: "Ana Claudia", rating: 3 },
  { name: "Ana Flavia", rating: 2 },
  { name: "Giovana", rating: 2 },
  { name: "Maria Eduarda", rating: 3 },
  { name: "Renan", rating: 5 },
  { name: "Alan", rating: 4 },
  { name: "Giovani", rating: 2 },
  { name: "Luiz", rating: 3 },
  { name: "Gabriel", rating: 3 },
  { name: "Kauan", rating: 4 },
  { name: "Paulo", rating: 4 },
];
