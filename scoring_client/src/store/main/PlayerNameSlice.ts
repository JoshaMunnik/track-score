import type {PlayerModel} from "../../types/models/PlayerModel.ts";

export type PlayerNameState = {
  /**
   * Previously entered player names, used for auto-completion when entering new names.
   */
  playerNames: string[];

  /**
   * When true, show the player name selection dialog.
   */
  selectPlayerNameVisible: boolean;

  /**
   * Callback that is called with the selected player name.
   */
  onSelectPlayerName?: (playerName: string) => void;
};

export type PlayerNameActions = {
  /**
   * Adds a new name to the player names list. If the name is already stored (with different letter
   * casing), the name gets replaced.
   */
  addPlayerName(playerName: string): void;

  /**
   * Adds the names of all players.
   */
  addPlayerNames(players: PlayerModel[]): void;

  /**
   * Clears the stored player names list.
   */
  removePlayerNames(): void;

  /**
   * Shows the player names list popup and call the callback when the user selects a name.
   */
  showPlayerNames(onSelect: (playerName: string) => void): void;

  /**
   * Hides the player names list.
   */
  hidePlayerNames(): void;
};

export type PlayerNameSlice = PlayerNameState & PlayerNameActions;