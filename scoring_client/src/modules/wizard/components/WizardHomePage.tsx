// region imports

import {AppRoute} from "../../../types/enums/AppRoute.ts";
import {GamePageWithState} from "../../../components/page/GamePageWithState.tsx";
import {WizardRoute} from "../type/WizardRoute.ts";
import {useWizardStore} from "../store/useWizardStore.ts";
import {WizardGameSheet} from "./WizardGameSheet.tsx";
import {useNavigate} from "react-router";
import {WizardPhase} from "../type/WizardPhase.ts";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import type {LocationStateModel} from "../../../types/models/LocationStateModel.ts";
import {useWizardSharableStore} from "../store/useWizardSharableStore.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {gameSessionService} from "../../../services/gameSessionService.ts";
import {WizardHomeButtonRow} from "./WizardHomeButtonRow.tsx";
import {ConfirmPopup} from "../../../components/popup/ConfirmPopup.tsx";
import {useState} from "react";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";

// endregion

// region exports

export function WizardHomePage() {
  const {
    players,
    finished,
    active,
    setScoringRound,
    start,
    newPlayers,
    setData,
    phase,
    round,
  } = useWizardStore();
  const {
    setViewingCode,
    viewing,
  } = useWizardSharableStore();
  const [showConfirmRestart, setShowConfirmRestart] = useState(false);
  const navigate = useNavigate();
  const title = 'Wizard' + (active ? ` - Round ${round + 1} of ${60 / players.length}` : '');

  function processState(state: LocationStateModel) {
    if (state.data.length > 0) {
      setData(state.data);
      if (state.shareCode && (state.shareCode.length > 0)) {
        setViewingCode(state.shareCode);
        gameSessionService.startTracking(state.shareCode, state.sequence || -1, useWizardStore);
      }
    } else {
      newPlayers();
    }
  }

  function handleScoringRound(scoringRound: number) {
    if (viewing) {
      return;
    }
    setScoringRound(scoringRound);
    navigate(
      (scoringRound < round) || (phase === WizardPhase.Scoring)
        ? WizardRoute.Scoring
        : WizardRoute.Bid
    );
  }

  function handleNewPlayers() {
    newPlayers();
    navigate(WizardRoute.Players);
  }

  function handleConfirmRestartClose(confirm: boolean) {
    setShowConfirmRestart(false);
    if (confirm) {
      start();
    }
  }

  function handleRestart() {
    if (!finished) {
      setShowConfirmRestart(true);
    }
    else {
      start();
    }
  }

  return (
    <>
      <GamePageWithState
        title={title}
        backPath={AppRoute.Home}
        settingsPath={viewing ? undefined : WizardRoute.Settings}
        playersPath={viewing ? undefined : WizardRoute.Players}
        onProcessState={processState}
        type={PageType.Padding}
        sharableStore={active ? useWizardSharableStore : undefined}
        gameStore={useWizardStore}
      >
        <Column gap={Spacing.Normal} width={Size.Full}>
          {
            !viewing &&
            <WizardHomeButtonRow
              active={active}
              finished={finished}
              players={players}
              phase={phase}
              round={round}
              onRestart={handleRestart}
              onNewPlayers={handleNewPlayers}
            />
          }
          {
            (players.length >= 3) &&
            <WizardGameSheet onScoring={handleScoringRound}/>
          }
        </Column>
      </GamePageWithState>
      <ConfirmPopup
        open={showConfirmRestart}
        onClose={handleConfirmRestartClose}
        confirmType={ButtonType.Danger}
        confirmCaption="Yes, start new game"
      >
        Are you sure you want to start a new game with current players?
      </ConfirmPopup>
    </>
  );
}

// endregion