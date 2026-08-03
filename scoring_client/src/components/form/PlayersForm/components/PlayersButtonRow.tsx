import {Button} from "../../../styled/button/Button.tsx";
import {Row} from "../../../styled/layout/Row.tsx";
import {Spacing} from "../../../../types/enums/ui/Spacing.ts";
import {ButtonType} from "../../../../types/enums/ui/ButtonType.ts";
import type {PlayersState} from "../../../../store/players/PlayersStore.ts";
import type {PlayerModel} from "../../../../types/models/PlayerModel.ts";
import type {ZustandStore} from "../../../../types/store/ZustandStore.ts";
import type {GameState} from "../../../../store/game/GameStore.ts";

type PlayersButtonRowProps<T extends PlayerModel> = Readonly<{
  maxPlayerCount: number;
  minPlayerCount: number;
  store: ZustandStore<GameState & PlayersState<T>>; // We'll need to refine this type
  onStart: () => void;
  onClose?: () => void;
  toClose?: string;
  showFirst: boolean;
  onAddPlayer: () => void;
  onRemoveAllPlayers: () => void;
  onRestart: () => void;
}>;

export function PlayersButtonRow<T extends PlayerModel>({
  maxPlayerCount,
  minPlayerCount,
  store,
  onStart,
  onClose,
  toClose,
  showFirst,
  onAddPlayer,
  onRemoveAllPlayers,
  onRestart
}: PlayersButtonRowProps<T>) {
  const storeState = store.getState();
  const hasFirst = !showFirst || storeState.players.find(player => player.first);
  
  return (
    <Row gap={Spacing.Small}>
      <Button
        onClick={onAddPlayer}
        disabled={storeState.players.length >= maxPlayerCount}
      >
        Add
      </Button>
      <Button
        type={ButtonType.Danger}
        onClick={onRemoveAllPlayers}
        disabled={storeState.players.length === 0}
      >
        Rem. All
      </Button>
      {
        !storeState.active &&
        <Button
          onClick={onStart}
          type={ButtonType.Success}
          disabled={(storeState.players.length < minPlayerCount) || !hasFirst}
        >
          Start
        </Button>
      }
      {
        storeState.active &&
        <Button
          onClick={onRestart}
        >
          Restart
        </Button>
      }
      {
        (onClose || toClose) &&
        <Button
          type={ButtonType.Secondary}
          onClick={onClose}
          to={toClose}
        >
          Close
        </Button>
      }
    </Row>
  );
}