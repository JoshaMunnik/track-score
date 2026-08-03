// region imports

import {AppRoute} from "../../../types/enums/AppRoute.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {IndividualRoute} from "../type/IndividualRoute.ts";
import {useIndividualStore} from "../store/useIndividualStore.ts";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {Button} from "../../../components/styled/button/Button.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {IndividualGameSheet} from "./IndividualGameSheet.tsx";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {useNavigate} from "react-router";
import {useIndividualSharableStore} from "../store/useIndividualSharableStore.ts";
import type {LocationStateModel} from "../../../types/models/LocationStateModel.ts";
import {gameSessionService} from "../../../services/gameSessionService.ts";
import {GamePageWithState} from "../../../components/page/GamePageWithState.tsx";

// endregion

// region exports

export function IndividualHomePage() {
  const {
    active, finished, round, players, configuration, start, done, restart,
    newPlayers, setScoringRound, setData
  } = useIndividualStore();
  const {
    setViewingCode, viewing
  } = useIndividualSharableStore();
  const navigate = useNavigate();
  const title = 'Individual' + (active && !finished ? ` - round ${round + 1}` : '');

  function enterScores(round: number): void {
    if (viewing) {
      return;
    }
    setScoringRound(round);
    navigate(IndividualRoute.Scoring);
  }

  function processState(state: LocationStateModel) {
    if (state.data.length > 0) {
      setData(state.data);
      if (state.shareCode && (state.shareCode.length > 0)) {
        setViewingCode(state.shareCode);
        gameSessionService.startTracking(state.shareCode, state.sequence || -1, useIndividualStore);
      }
    } else {
      newPlayers();
    }
  }

  function renderButtonRow() {
    if (viewing) {
      return null;
    }
    if (!active) {
      return (
        <Row gap={Spacing.Normal}>
          {
            (players.length < configuration.maxPlayerCount) &&
            <Button to={IndividualRoute.Players}>
              Add players
            </Button>
          }
          {
            (players.length >= configuration.minPlayerCount) &&
            <Button onClick={start}>
              Start
            </Button>
          }
        </Row>
      );
    }
    if (finished) {
      return (
        <Row gap={Spacing.Normal}>
          <Button onClick={restart}>
            Restart
          </Button>
          <Button onClick={newPlayers}>
            New game
          </Button>
        </Row>
      );
    }
    return (
      <Row gap={Spacing.Normal}>
        <Button onClick={() => enterScores(round)}>
          Scoring
        </Button>
        {
          !configuration.useMaxScore &&
          <Button onClick={done}>
            Done
          </Button>
        }
        <Button onClick={restart}>
          Restart
        </Button>
      </Row>
    );
  }

  return (
    <GamePageWithState
      title={title}
      backPath={AppRoute.Home}
      playersPath={IndividualRoute.Players}
      settingsPath={IndividualRoute.Settings}
      sharableStore={active ? useIndividualSharableStore : undefined}
      type={PageType.Padding}
      onProcessState={processState}
      gameStore={useIndividualStore}
    >
      <Column width={Size.Full} gap={Spacing.Normal} alignCrossAxis={AlignItem.Center}>
        {renderButtonRow()}
        {
          (players.length > 0) &&
          <IndividualGameSheet onScoring={enterScores}/>
        }
      </Column>
    </GamePageWithState>
  )
}

// endregion