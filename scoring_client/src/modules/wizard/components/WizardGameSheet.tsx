// region imports

import {useWizardStore} from "../store/useWizardStore.ts";
import {calcWizardScore} from "../tools/wizardTools.ts";
import {UFArray} from "@ultraforce/ts-general-lib";
import {WizardPhase} from "../type/WizardPhase.ts";
import {rankName} from "../../../tools/textTools.ts";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {WizardGameHeaderRow} from "./WizardGameHeaderRow.tsx";
import {WizardGamePlayedRound} from "./WizardGamePlayedRound.tsx";
import {WizardGameEmptyRound} from "./WizardGameEmptyRound.tsx";

// endregion

type WizardGameSheetProps = Readonly<{
  onScoring(round: number): void;
}>;

// endregion

// region exports

export function WizardGameSheet({onScoring}: WizardGameSheetProps) {
  const {players, finished, round, phase} = useWizardStore();
  const bidDone = phase === WizardPhase.Scoring;
  const totalRounds = 60 / players.length;
  const currentRound = Math.min(round, totalRounds - 1);
  const hasScore = (round > 0);
  const scores = players.map(
    player => hasScore ? calcWizardScore(player, currentRound) : 0
  );
  const sortedScores = UFArray.sortNumeric([...scores], true);
  // determine the rank for each player (assume indexOf returns the first occurrence of the score
  // in case of a tie)
  const rankNames = scores.map(score => rankName(1 + sortedScores.indexOf(score)));
  // when true show column with different background (only when game is finished)
  const winners: boolean[] = players.map(
    (_player, index) => (scores[index] === sortedScores[0]) && finished
  )
  // show below the player name the word 'dealer' when the game is not finished.
  const dealer = (players.findIndex(({first}) => first) + currentRound) % players.length;
  const dealers: string[] = players.map(
    (_player, index) => (index === dealer) && !finished ? 'dealer' : ''
  );
  const rows = [];
  for (let index = 0; index <= currentRound; index++) {
    rows.push(
      <WizardGamePlayedRound
        key={index}
        players={players}
        round={index}
        score={(index < currentRound) || finished}
        bid={(index < currentRound) || bidDone}
        winners={winners}
        onClick={() => onScoring(index)}
      />
    );
  }
  for (let index = currentRound + 1; index < totalRounds; index++) {
    rows.push(
      <WizardGameEmptyRound
        key={index}
        players={players}
        round={index}
      />
    );
  }
  return (
    <Grid border templateColumns={`1.5rem repeat(${players.length}, 1fr 1.5rem)`} smallFont>
      <WizardGameHeaderRow
        key={-1}
        players={players}
        ranks={rankNames}
        playerStatuses={dealers}
        winners={winners}
        hasScore={hasScore}
        hasStatus={!finished}
      />
      {rows}
    </Grid>
  );
}