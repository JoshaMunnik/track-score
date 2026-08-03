// region imports

import {AppRoute} from "../../../types/enums/AppRoute.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {TichuRoute} from "../type/TichuRoute.ts";
import {useTichuStore} from "../store/useTichuStore.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {TichuGameSheet} from "./TichuGameSheet.tsx";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {useTichuSharableStore} from "../store/useTichuSharableStore.ts";
import type {LocationStateModel} from "../../../types/models/LocationStateModel.ts";
import {gameSessionService} from "../../../services/gameSessionService.ts";
import {GamePageWithState} from "../../../components/page/GamePageWithState.tsx";
import {TichuHomeButtonRow} from "./TichuHomeButtonRow.tsx";

// endregion

// region exports

export function TichuHomePage() {
  const {
    active, finished, players, start, restart, setData, rounds, reset, replayRound
  } = useTichuStore();
  const {
    setViewingCode, viewing
  } = useTichuSharableStore();
  const title = 'Tichu' + (active && !finished ? ` - round ${rounds.length + 1}` : '');

  function processState(state: LocationStateModel) {
    if (state.data.length > 0) {
      setData(state.data);
      if (state.shareCode && (state.shareCode.length > 0)) {
        setViewingCode(state.shareCode);
        gameSessionService.startTracking(state.shareCode, state.sequence || -1, useTichuStore);
      }
    } else {
      reset();
    }
  }

  return (
    <GamePageWithState
      title={title}
      backPath={AppRoute.Home}
      playersPath={TichuRoute.Players}
      sharableStore={active ? useTichuSharableStore : undefined}
      type={PageType.Padding}
      onProcessState={processState}
      gameStore={useTichuStore}
    >
      <Column width={Size.Full} gap={Spacing.Normal} alignCrossAxis={AlignItem.Center}>
        <TichuHomeButtonRow
          viewing={viewing}
          active={active}
          finished={finished}
          players={players}
          rounds={rounds}
          start={start}
          restart={restart}
          reset={reset}
          replayRound={replayRound}
        />
        {
          (players.length > 0) &&
          <TichuGameSheet/>
        }
      </Column>
    </GamePageWithState>
  )
}

// endregion