// region imports

import {getPlayersWithDealerLast} from "../../../tools/playerTools.ts";
import {calcWizardScore} from "../tools/wizardTools.ts";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {Button} from "../../../components/styled/button/Button.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {WizardRoute} from "../type/WizardRoute.ts";
import {useWizardStore} from "../store/useWizardStore.ts";
import {useNavigate} from "react-router";
import {Color} from "../../../types/enums/ui/Color.ts";
import {UFArray} from "@ultraforce/ts-general-lib";
import {SmallText} from "../../../components/styled/text/SmallText.tsx";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {updateGameSession} from "../../../tools/mainTools.ts";
import {useWizardSharableStore} from "../store/useWizardSharableStore.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import type {WizardPlayerModel} from "../models/WizardPlayerModel.ts";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {GamePage} from "../../../components/page/GamePage.tsx";
import {WizardScoringPlayer} from "./WizardScoringPlayer.tsx";

// endregion

// region exports

/**
 * {@link WizardBidPage} shows a popup that can be used to enter bids for every player.
 */
export function WizardScoringPage() {
  const {nextRound, players, scoringRound, round, setTaken} = useWizardStore();
  const navigate = useNavigate();
  const totalRounds = 60 / players.length;
  const sortedPlayers = getPlayersWithDealerLast(players, scoringRound);
  const cardCount: number = scoringRound + 1;
  const totalTaken: number = UFArray.sum(
    players.map(player => player.rounds[scoringRound].taken)
  );
  const scores: number[] = [];
  sortedPlayers.forEach(player => {
    scores.push(calcWizardScore(player, scoringRound));
  });
  const error: boolean = totalTaken !== cardCount;
  const dealer = sortedPlayers[sortedPlayers.length - 1];
  const latestRound = scoringRound === round;

  function handleDone() {
    nextRound();
    updateGameSession(useWizardStore, useWizardSharableStore);
    navigate(WizardRoute.Home)
  }

  function handleTakenChange(player: WizardPlayerModel, takenValue: number) {
    setTaken(players.indexOf(player), takenValue);
  }

  return (
    <GamePage
      title={`Wizard - Round ${scoringRound + 1} of ${60 / sortedPlayers.length} - Results`}
      backPath={WizardRoute.Home}
      type={PageType.Paper}
      gameStore={useWizardStore}
    >
      <Column gap={Spacing.Normal}>
        <Grid templateColumns="auto 1fr auto auto">
          <GridItem borderBottom>
            <SmallText>#</SmallText>
          </GridItem>
          <GridItem borderBottom>
            <SmallText>name</SmallText>
          </GridItem>
          <GridItem borderBottom horizontalAlign={AlignItem.Center}>
            <SmallText>bid</SmallText>
          </GridItem>
          <GridItem borderBottom horizontalAlign={AlignItem.Center}>
            <SmallText>taken</SmallText>
          </GridItem>
          {sortedPlayers.map((player, index) => (
            <WizardScoringPlayer
              key={index}
              index={index}
              dealer={dealer}
              player={player}
              players={players}
              numbers={scores}
              scoringRound={scoringRound}
              onChange={(value) => handleTakenChange(player, value)}
              max={cardCount}
            />
          ))}
        </Grid>
        <NormalText color={Color.Danger} hidden={!error}>
          Total taken ({totalTaken}) ≠ cards ({cardCount}).
        </NormalText>
        <Row gap={Spacing.Small}>
          {
            latestRound &&
            <Button
              type={ButtonType.Success}
              onClick={handleDone}
              disabled={error}
            >
              {scoringRound + 1 >= totalRounds ? 'Finish' : 'Next round'}
            </Button>
          }
          <Button
            type={ButtonType.Secondary}
            to={WizardRoute.Home}
          >
            Close
          </Button>
        </Row>
      </Column>
    </GamePage>
  );
}

// endregion
