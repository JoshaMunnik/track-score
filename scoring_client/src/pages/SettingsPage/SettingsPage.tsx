// region imports

import {Column} from "../../components/styled/layout/Column.tsx";
import {NormalText} from "../../components/styled/text/NormalText.tsx";
import {Button} from "../../components/styled/button/Button.tsx";
import {ButtonType} from "../../types/enums/ui/ButtonType.ts";
import {SectionTitle} from "../../components/styled/text/SectionTitle.tsx";
import {Spacing} from "../../types/enums/ui/Spacing.ts";
import {useState} from "react";
import {AppRoute} from "../../types/enums/AppRoute.ts";
import {useMainStore} from "../../store/main/useMainStore.ts";
import {Page} from "../../components/page/Page.tsx";
import {PageType} from "../../types/enums/ui/PageType.ts";
import {Row} from "../../components/styled/layout/Row.tsx";
import {DistributeContent} from "../../types/enums/ui/DistributeContent.ts";
import {SmallText} from "../../components/styled/text/SmallText.tsx";
import {SwitchField} from "../../components/styled/form/SwitchField.tsx";
import {ConfirmRemovePlayers} from "./components/ConfirmRemovePlayers.tsx";
import {ConfirmRemoveGames} from "./components/ConfirmRemoveGames.tsx";
import {ConfirmReset} from "./components/ConfirmReset.tsx";
import {modules} from "../../modules/modules.ts";

// endregion

// region exports

/**
 * A page showing global settings and button to clear stored local data.
 */
export function SettingsPage() {
  const {
    playerNames,
    gameSessions,
    useWakeLock,
    reset,
    removePlayerNames,
    removeGameSessions,
    setUseWakeLock
  } = useMainStore();
  const [confirmRemovePlayers, setConfirmRemovePlayers] = useState(false);
  const [confirmRemoveGames, setConfirmRemoveGames] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const gameSessionCount = Object.values(gameSessions).length;

  function handleConfirmRemovePlayersClose(confirm: boolean): void {
    setConfirmRemovePlayers(false);
    if (confirm) {
      removePlayerNames();
    }
  }

  function handleConfirmRemoveGamesClose(confirm: boolean): void {
    setConfirmRemoveGames(false);
    if (confirm) {
      removeGameSessions();
    }
  }

  function handleConfirmResetClose(confirm: boolean): void {
    setConfirmReset(false);
    if (confirm) {
      reset();
      modules.forEach((module) => {
        module.gameStore.getState().reset();
        module.configurationsStore?.getState().reset();
      });
    }
  }

  return (
    <>
      <Page
        title="Trackscore.nl - settings"
        webTitle="Settings"
        backPath={AppRoute.Home}
        type={PageType.Paper}
      >
        <Column
          gap={Spacing.Normal}
        >
          <Column gap={Spacing.Tiny}>
            <SectionTitle>Player names</SectionTitle>
            <Column
              gap={Spacing.Tiny}
            >
              <NormalText>
                Stored player names: <em>{playerNames.length}</em>
              </NormalText>
              <Button
                type={ButtonType.Danger}
                disabled={playerNames.length === 0}
                onClick={() => setConfirmRemovePlayers(true)}
              >
                Remove player names
              </Button>
            </Column>
          </Column>
          <Column gap={Spacing.Tiny}>
            <SectionTitle>Previous games</SectionTitle>
            <Column
              gap={Spacing.Tiny}
            >
              <NormalText>
                Stored games: <em>{gameSessionCount}</em>
              </NormalText>
              <Button
                type={ButtonType.Danger}
                disabled={gameSessionCount === 0}
                onClick={() => setConfirmRemoveGames(true)}
              >
                Remove games
              </Button>
            </Column>
          </Column>
          <Column gap={Spacing.Small}>
            <SectionTitle>Everything</SectionTitle>
            <Button
              type={ButtonType.Danger}
              onClick={() => setConfirmReset(true)}
            >
              Reset all
            </Button>
          </Column>
          <Column gap={Spacing.Small}>
            <SectionTitle>Other settings</SectionTitle>
            <Row gap={Spacing.Small} distributeMainAxis={DistributeContent.SpaceBetween}>
              <Column>
                <NormalText>
                  While a game is active, prevent device from dimming or turning off the screen.
                </NormalText>
                <SmallText>
                  This might not always work, for example when the device is in low battery mode.
                </SmallText>
              </Column>
              <SwitchField value={useWakeLock} onChange={setUseWakeLock}/>
            </Row>
          </Column>
        </Column>
      </Page>
      <ConfirmRemovePlayers open={confirmRemovePlayers} onClose={handleConfirmRemovePlayersClose} />
      <ConfirmRemoveGames open={confirmRemoveGames} onClose={handleConfirmRemoveGamesClose} />
      <ConfirmReset open={confirmReset} onClose={handleConfirmResetClose} />
    </>
  )
}

// endregion
