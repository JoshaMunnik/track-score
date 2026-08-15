// region imports

import {useTichuStore} from "../store/useTichuStore.ts";
import {calcTichuScores} from "../tools/tichuTools.ts";
import {useTichuSharableStore} from "../store/useTichuSharableStore.ts";
import {UFArray} from "@ultraforce/ts-general-lib";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {TichuGameTeamRow} from "./TichuGameTeamRow.tsx";
import {TichuGameActiveRow} from "./TichuGameActiveRow.tsx";
import {TichuGameTotalsRow} from "./TichuGameTotalsRow.tsx";
import {TichuGameRoundResultRow} from "./TichuGameRoundResultRow.tsx";

// endregion

// region exports

export function TichuGameSheet() {
  const {
    rounds,
    firstTeam,
    secondTeam,
    finished,
    active,
    updateFirstTeam,
    updateSecondTeam
  } = useTichuStore();
  const {
    viewing
  } = useTichuSharableStore();
  const scores = calcTichuScores(rounds, rounds.length);
  const sortedScores = UFArray.sortNumeric([...scores]);
  const winners = [
    (scores[0] === sortedScores[1]) && (scores[0] >= 1000),
    (scores[1] === sortedScores[1]) && (scores[1] >= 1000),
  ];

  return (
    <Grid border templateColumns="1.3rem repeat(2, 1fr 3.5rem)" light>
      <TichuGameTeamRow winners={winners} />
      {active && rounds.map((round, index) =>
        <TichuGameRoundResultRow key={index} round={round} index={index} winners={winners} />
      )}
      {
        !finished && active &&
        <TichuGameActiveRow
          firstTeam={firstTeam}
          secondTeam={secondTeam}
          updateFirstTeam={updateFirstTeam}
          updateSecondTeam={updateSecondTeam}
          disabled={viewing}
          round={rounds.length}
        />
      }
      {active && <TichuGameTotalsRow scores={scores} winners={winners} />}
    </Grid>
  );
}

// endregion