// region imports

import {useTeamStore} from "../store/useTeamStore.ts";
import {UFArray} from "@ultraforce/ts-general-lib";
import {rankName} from "../../../tools/textTools.ts";
import type {TeamPlayerModel} from "../models/TeamPlayerModel.ts";
import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";
import {calcTeamScores} from "../tools/teamTools.ts";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {TeamGameHeaderRow} from "./TeamGameHeaderRow.tsx";
import {TeamGamePlayerHeaderRow} from "./TeamGamePlayerHeaderRow.tsx";
import {TeamGamePlayedRound} from "./TeamGamePlayedRound.tsx";
import {TeamGameTotalRow} from "./TeamGameTotalRow.tsx";

// endregion

// region local

type TeamGameSheetProps = Readonly<{
  onScoring(round: number): void;
}>;

function sortPlayersPerTeam(players: TeamPlayerModel[], configuration: TeamConfigurationModel): TeamPlayerModel[] {
  const result: TeamPlayerModel[] = [];
  for (let index = 0; index < players.length; index++) {
    const newIndex = (index % configuration.playerCount) * configuration.playerCount +
      Math.floor(index / configuration.playerCount);
    result[newIndex] = players[index];
  }
  return result;
}

// endregion

// region exports

export function TeamGameSheet({onScoring}: TeamGameSheetProps) {
  const {players, finished, round, configuration} = useTeamStore();
  const sortedPlayers = sortPlayersPerTeam(players, configuration);
  const hasScore = (round > 0) || finished;
  const teamScores = calcTeamScores(players, configuration, round);
  const sortedTeamScores = UFArray.sortNumeric([...teamScores], true);
  // determine the rank for each team (assume indexOf returns the first occurrence of the score
  // in case of a tie)
  const rankNames = teamScores.map(score => rankName(1 + sortedTeamScores.indexOf(score)));
  // when true show column with different background (only when game is finished)
  const winners: boolean[] = teamScores.map(
    (score) => (score === sortedTeamScores[0]) && finished
  )
  // show below the player name the word 'dealer' when the game is not finished. This does not
  // happen if tracking the dealer has been disabled.
  const dealerIndex = (players.findIndex(({first}) => first) + round) % players.length;
  const dealerPlayer = players[dealerIndex];
  const dealers: string[] = sortedPlayers.map(
    (player) => (player === dealerPlayer) && !finished ? 'dealer' : ''
  );
  return (
    <Grid border templateColumns={`1.5rem repeat(${players.length}, 1fr)`} light>
      <TeamGameHeaderRow
        key="header-row"
        configuration={configuration}
        ranks={rankNames}
        winners={winners}
        hasScore={hasScore}
      />
      <TeamGamePlayerHeaderRow
        key="player-header-row"
        configuration={configuration}
        players={sortedPlayers}
        playerStatuses={dealers}
        winners={winners}
        hasStatus={!finished && configuration.trackDealer}
      />
      {Array.from({length: round + 1}, (_, index) => (
        <TeamGamePlayedRound
          key={index}
          configuration={configuration}
          players={sortedPlayers}
          round={index}
          score={index < round || finished}
          winners={winners}
          onClick={() => onScoring(index)}
        />
      ))}
      {
        ((round > 0) || finished) &&
        <TeamGameTotalRow
          key="total-row"
          configuration={configuration}
          scores={teamScores}
          winners={winners}
        />
      }
    </Grid>
  );
}