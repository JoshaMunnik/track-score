// region imports

import {getPlayersWithDealerLast} from "../../../tools/playerTools.ts";
import {calcIndividualScore} from "../tools/individualTools.ts";
import {IndividualRoute} from "../type/IndividualRoute.ts";
import {useIndividualStore} from "../store/useIndividualStore.ts";
import {useNavigate} from "react-router";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {updateGameSession} from "../../../tools/mainTools.ts";
import {useIndividualSharableStore} from "../store/useIndividualSharableStore.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {useState} from "react";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {GamePage} from "../../../components/page/GamePage.tsx";
import {IndividualScoringHeader} from "./IndividualScoringHeader.tsx";
import {IndividualScoringButtonRow} from "./IndividualScoringButtonRow.tsx";
import {IndividualScoringPlayer} from "./IndividualScoringPlayer.tsx";

// endregion

// region exports

export function IndividualScoringPage() {
  const {
    nextRound, players, scoringRound, round, configuration, setPlayerScore
  } = useIndividualStore();
  const navigate = useNavigate();
  const [changed, setChanged] = useState(false);
  const sortedPlayers = configuration.trackDealer
    ? getPlayersWithDealerLast(players, scoringRound)
    : players;
  const scores: number[] = [];
  sortedPlayers.forEach(player => {
    scores.push(calcIndividualScore(player, scoringRound - 1));
  });
  const dealer = sortedPlayers[sortedPlayers.length - 1];
  const latestRound = scoringRound === round;

  function handleNextRound() {
    nextRound();
    handleClose();
  }

  function handleClose() {
    if (changed) {
      updateGameSession(useIndividualStore, useIndividualSharableStore);
      setChanged(false);
    }
    navigate(IndividualRoute.Home)
  }

  function handleScoreChange(index: number, scoreValue: number) {
    setPlayerScore(players.indexOf(sortedPlayers[index]), scoreValue);
    setChanged(true);
  }

  return (
    <GamePage
      title={`Individual - Round ${scoringRound + 1} - Results`}
      onBack={handleClose}
      type={PageType.Paper}
      gameStore={useIndividualStore}
    >
      <Column gap={Spacing.Normal}>
        <Grid templateColumns="1.4rem 1fr auto 0.3rem auto">
          <IndividualScoringHeader/>
          {sortedPlayers.map((player, index) => (
            <IndividualScoringPlayer
              key={index}
              index={index}
              configuration={configuration}
              dealer={dealer}
              player={player}
              players={players}
              scores={scores}
              onChange={(value) => handleScoreChange(index, value)}
              scoringRound={scoringRound}
            />
          ))}
        </Grid>
        <IndividualScoringButtonRow
          latestRound={latestRound}
          onNextRound={handleNextRound}
          onClose={handleClose}
        />
      </Column>
    </GamePage>
  );
}

// endregion
