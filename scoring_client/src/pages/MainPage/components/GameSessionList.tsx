// region imports

import {useMainStore} from "../../../store/main/useMainStore.ts";
import type {GameSessionModel} from "../../../types/models/GameSessionModel.ts";
import {useState} from "react";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {GameSessionRow} from "./GameSessionRow.tsx";
import {ConfirmPopup} from "../../../components/popup/ConfirmPopup.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import {useNavigate} from "react-router";
import {getGameModule} from "../../../tools/mainTools.ts";
import {Paper} from "../../../components/page/Paper.tsx";

// endregion

// region local

type GameSessionListProps = Readonly<{
  finished: boolean;
}>;

// endregion

// region exports

export function GameSessionList({finished}: GameSessionListProps) {
  const {gameSessions, removeGameSession} = useMainStore();
  const gameSessionList = Object
    .values(gameSessions)
    .filter((gameSession) => gameSession.finished === finished)
    .sort((first: GameSessionModel, second: GameSessionModel) => second.date - first.date);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [selectedGameSession, setSelectedGameSession] = useState<GameSessionModel>();
  const navigate = useNavigate();

  if (gameSessionList.length === 0) {
    return (
      <Column verticalPadding={Spacing.Normal} width={Size.Full}>
        <Paper>
          <NormalText>There are no game sessions.</NormalText>
        </Paper>
      </Column>
    );
  }

  function selectGameSession(gameSession: GameSessionModel) {
    const gameModule = getGameModule(gameSession.type);
    // do nothing if game type is unknown.
    if (gameModule === null) {
      return;
    }
    navigate(
      gameModule.homePath,
      {
        state: {
          data: gameSession.data,
        }
      }
    );
  }

  function deleteGameSession(gameSession: GameSessionModel) {
    setSelectedGameSession(gameSession);
    setShowConfirmDelete(true);
  }

  function confirmDelete(confirm: boolean) {
    if (confirm) {
      removeGameSession(selectedGameSession!.id);
    }
    setShowConfirmDelete(false);
  }

  return (
    <>
      <Column width={Size.Full} gap={Spacing.Normal} verticalPadding={Spacing.Normal}>
        {gameSessionList.map(
          (gameSession: GameSessionModel, index) => (<GameSessionRow
            key={index}
            session={gameSession}
            onSelect={() => selectGameSession(gameSession)}
            onDelete={() => deleteGameSession(gameSession)}
          />)
        )}
      </Column>
      <ConfirmPopup
        onClose={confirmDelete}
        open={showConfirmDelete}
        confirmCaption="Yes, delete"
        confirmType={ButtonType.Danger}
      >
        Do you really want to delete this game session?
      </ConfirmPopup>
    </>
  )
}

// endregion