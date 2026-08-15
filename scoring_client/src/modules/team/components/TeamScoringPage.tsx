// region imports

import {getPlayersWithDealerLast} from "../../../tools/playerTools.ts";
import {TeamRoute} from "../type/TeamRoute.ts";
import {useTeamStore} from "../store/useTeamStore.ts";
import {useNavigate} from "react-router";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {updateGameSession} from "../../../tools/mainTools.ts";
import {useTeamSharableStore} from "../store/useTeamSharableStore.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {useState} from "react";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {GamePage} from "../../../components/page/GamePage.tsx";
import {TeamScoringButtonRow} from "./TeamScoringButtonRow.tsx";
import {TeamScoringHeader} from "./TeamScoringHeader.tsx";
import {TeamScoringPlayer} from "./TeamScoringPlayer.tsx";

// endregion

// region exports

export function TeamScoringPage() {
  const {
    nextRound, players, scoringRound, round, configuration, setPlayerScore
  } = useTeamStore();
  const navigate = useNavigate();
  const [changed, setChanged] = useState(false);
  const sortedPlayers = configuration.trackDealer
    ? getPlayersWithDealerLast(players, scoringRound)
    : players;
  const teamOffset = players.indexOf(sortedPlayers[0]) % configuration.teamCount;
  const dealer = sortedPlayers[sortedPlayers.length - 1];
  const latestRound = scoringRound === round;

  function handleNextRound() {
    nextRound();
    handleClose();
  }

  function handleClose() {
    if (changed) {
      updateGameSession(useTeamStore, useTeamSharableStore);
    }
    navigate(TeamRoute.Home)
  }

  function handleScoreChange(index: number, scoreValue: number) {
    setPlayerScore(players.indexOf(sortedPlayers[index]), scoreValue);
    setChanged(true);
  }

  return (
    <GamePage
      title={`Team - Round ${scoringRound + 1} - Results`}
      onBack={handleClose}
      type={PageType.Paper}
      gameStore={useTeamStore}
    >
      <Column gap={Spacing.Normal}>
        <Grid templateColumns="auto 1fr auto auto">
          <TeamScoringHeader/>
          {sortedPlayers.map((player, index) => (
            <TeamScoringPlayer
              key={index}
              index={index}
              configuration={configuration}
              dealer={dealer}
              player={player}
              players={players}
              teamOffset={teamOffset}
              onChange={(value) => handleScoreChange(index, value)}
              scoringRound={scoringRound}
            />
          ))}
        </Grid>
        <TeamScoringButtonRow
          latestRound={latestRound}
          onNextRound={handleNextRound}
          onClose={handleClose}
        />
      </Column>
    </GamePage>
  );
}

// endregion
