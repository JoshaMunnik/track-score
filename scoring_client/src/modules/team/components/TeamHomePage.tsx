// region imports

import {AppRoute} from "../../../types/enums/AppRoute.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {TeamRoute} from "../type/TeamRoute.ts";
import {useTeamStore} from "../store/useTeamStore.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {TeamGameSheet} from "./TeamGameSheet.tsx";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {useNavigate} from "react-router";
import {useTeamSharableStore} from "../store/useTeamSharableStore.ts";
import type {LocationStateModel} from "../../../types/models/LocationStateModel.ts";
import {gameSessionService} from "../../../services/gameSessionService.ts";
import {GamePageWithState} from "../../../components/page/GamePageWithState.tsx";
import {TeamHomeButtonRow} from "./TeamHomeButtonRow.tsx";

// endregion

// region exports

export function TeamHomePage() {
  const {
    active, finished, round, players, configuration, start, done, restart,
    newPlayers, setScoringRound, setData
  } = useTeamStore();
  const {
    setViewingCode, viewing
  } = useTeamSharableStore();
  const navigate = useNavigate();
  const title = 'Team' + (active && !finished ? ` - round ${round + 1}` : '');

  function enterScores(round: number): void {
    if (viewing) {
      return;
    }
    setScoringRound(round);
    navigate(TeamRoute.Scoring);
  }

  function processState(state: LocationStateModel) {
    if (state.data.length > 0) {
      setData(state.data);
      if (state.shareCode && (state.shareCode.length > 0)) {
        setViewingCode(state.shareCode);
        gameSessionService.startTracking(state.shareCode, state.sequence || -1, useTeamStore);
      }
    } else {
      newPlayers();
    }
  }

  return (
    <GamePageWithState
      title={title}
      backPath={AppRoute.Home}
      playersPath={TeamRoute.Players}
      settingsPath={TeamRoute.Settings}
      sharableStore={active ? useTeamSharableStore : undefined}
      type={PageType.Padding}
      onProcessState={processState}
      gameStore={useTeamStore}
    >
      <Column width={Size.Full} gap={Spacing.Normal} alignCrossAxis={AlignItem.Center}>
        <TeamHomeButtonRow
          viewing={viewing}
          active={active}
          players={players}
          configuration={configuration}
          finished={finished}
          round={round}
          onStart={start}
          onRestart={restart}
          onNewGame={newPlayers}
          onEnterScores={enterScores}
          onDone={done}
        />
        {
          (players.length > 0) &&
          <TeamGameSheet onScoring={enterScores}/>
        }
      </Column>
    </GamePageWithState>
  )
}

// endregion