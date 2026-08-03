// region imports

import {useIndividualStore} from "../store/useIndividualStore.ts";
import {calcIndividualScore} from "../tools/individualTools.ts";
import {UFArray} from "@ultraforce/ts-general-lib";
import {rankName} from "../../../tools/textTools.ts";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {IndividualGameHeader} from "./IndividualGameHeader.tsx";
import {IndividualGamePlayedRound} from "./IndividualGamePlayedRound.tsx";
import {IndividualGameTotalRow} from "./IndividualGameTotalRow.tsx";

// endregion

// region local

type IndividualGameSheetProps = Readonly<{
  onScoring(round: number): void;
}>;

// endregion

// region exports

export function IndividualGameSheet({onScoring}: IndividualGameSheetProps) {
  const {players, finished, round, configuration} = useIndividualStore();
  const hasScore = (round > 0) || finished;
  const scores = players.map(
    player => hasScore ? calcIndividualScore(player, !finished ? round - 1 : round) : 0
  );
  const sortedScores = UFArray.sortNumeric([...scores], true);
  // determine the rank for each player (assume indexOf returns the first occurrence of the score
  // in case of a tie)
  const rankNames = scores.map(score => rankName(1 + sortedScores.indexOf(score)));
  // when true show column with different background (only when game is finished)
  const winners: boolean[] = players.map(
    (_player, index) => (scores[index] === sortedScores[0]) && finished
  )
  // show below the player name the word 'dealer' when the game is not finished. This does not
  // happen if tracking the dealer has been disabled.
  const dealer = (players.findIndex(({first}) => first) + round) % players.length;
  const dealers: string[] = players.map(
    (_player, index) => (index === dealer) && !finished ? 'dealer' : ''
  );
  return (
    <Grid border templateColumns={`1.75rem repeat(${players.length}, 1fr)`}>
      <IndividualGameHeader
        players={players}
        ranks={rankNames}
        playerStatuses={dealers}
        winners={winners}
        hasScore={hasScore}
        hasStatus={!finished && configuration.trackDealer}
      />
      {Array.from({length: round + 1 - (finished ? 1 : 0)}).map((_, roundIndex) => (
        <IndividualGamePlayedRound
          key={roundIndex}
          players={players}
          round={roundIndex}
          score={roundIndex < round || finished}
          winners={winners}
          onClick={() => onScoring(roundIndex)}
        />
      ))}
      {
        ((round > 0) || finished) &&
        <IndividualGameTotalRow scores={scores} winners={winners} />
      }
    </Grid>
  );
}