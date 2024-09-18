import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [standings, setStandings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/table", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setStandings(data))
      .then(console.log(standings))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="App">
      <h1>Premier League Standings</h1>

      {error && <p>Error: {error}</p>}

      <table border="1">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>Points</th>
            <th>Goal Difference</th>
            <th>Goals For</th>
            <th>Goals Against</th>
            
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr key={index}>
              <td>{team.position}</td>
              <td>
                <img
                  src={team.team.crest}
                  alt={team.team.name + " crest"}
                  className="team-crest"
                />
                {team.team.name}
              </td>
              <td>{team.playedGames}</td>
              <td>{team.won}</td>
              <td>{team.draw}</td>
              <td>{team.lost}</td>
              <td><b>{team.points}</b></td>
              <td>{team.goalDifference}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
