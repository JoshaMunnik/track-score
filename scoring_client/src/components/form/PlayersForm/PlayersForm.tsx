// region imports

import type {PlayerModel} from "../../../types/models/PlayerModel.ts";
import * as React from "react";
import {Column} from "../../styled/layout/Column.tsx";
import {useMainStore} from "../../../store/main/useMainStore.ts";
import type {PlayersStore} from "../../../store/players/PlayersStore.ts";
import type {GameState} from "../../../store/game/GameStore.ts";
import type {ZustandStore} from "../../../types/store/ZustandStore.ts";
import {PlayersTable} from "./components/PlayersTable.tsx";
import {PlayersButtonRow} from "./components/PlayersButtonRow.tsx";
import {PlayersConfirmRestartPopup} from "./components/PlayersConfirmRestartPopup.tsx";
import {ConfirmAddPlayerPopup} from "./components/ConfirmAddPlayerPopup.tsx";
import {AddPlayerWithScorePopup} from "./components/AddPlayerWithScorePopup.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";

// Subcomponents

// endregion

// region local

type PlayersFormProps<T extends PlayerModel> = Readonly<{
  /**
   * The store containing the players.
   */
  store: ZustandStore<GameState & PlayersStore<T>>;

  /**
   * Creates an instance of the player model for a name and optional starting score.
   */
  playerFactory: (name: string, startScore?: number) => T;

  /**
   * User wants to start the game.
   */
  onStart: () => void;

  /**
   * User wants to keep the players but restart the game.
   */
  onRestart: () => void;

  /**
   * When set, show a close button at the bottom
   */
  onClose?: () => void;

  /**
   * When set, show a close button and navigate to the given path when clicked.
   */
  toClose?: string;

  /**
   * This value is only required if players can be added while the game is active.
   */
  minScore?: number;

  /**
   * This value is only required if players can be added while the game is active.
   */
  maxScore?: number;

  /**
   * This value is only required if players can be added while the game is active.
   */
  averageScore?: number;

  /**
   * The value to increase and decrease score with. The score must also be a multiple of this
   * value. This value is only required if players can be added while the game is active.
   */
  stepCount?: number;

  /**
   * Maximum number of players allowed
   */
  maxPlayerCount: number;

  /**
   * Minimum number of players required
   */
  minPlayerCount: number;

  /**
   * When `true` show a dealer column to manage the first player that has to start. When
   * `false` {@link PlayersStore.selectFirstPlayer} will never be called.
   */
  showFirst: boolean;

  /**
   * Label to use for the first column. Default is 'first'
   */
  firstLabel?: string;

  /**
   * When `true`, players are distributed over teams.
   */
  teams: boolean;

  /**
   * Number of teams to use (used only when {@link teams} is `true`)
   */
  teamCount?: number;
}>;

/**
 * States for {@link PlayersForm}
 */
type PlayersFormState = {
  /**
   * Index of input field to autofocus or -1 to not autofocus any
   */
  focus: number;

  /**
   * Shows a dialog with several scores to add a player to an active game.
   */
  showAddPlayerWithScore: boolean;

  /**
   * Shows a dialog that adding a player will restart the game.
   */
  showConfirmAddPlayer: boolean;

  /**
   * Shows a dialog asking form confirmation that the game should be restarted.
   */
  showConfirmRestart: boolean;

  /**
   * Name to add player with
   */
  name: string;

  /**
   * Score to add player with
   */
  score: number;

  /**
   * Action to perform when the user confirms a popup.
   */
  action?: () => void;
}

// endregion

// region exports

/**
 * {@link PlayersForm} defines a form to manage the players. It assumes the player is represented by
 * {@link PlayerModel} type or a type that extends it. The form supports adding players to an active
 * game, requesting an initial score to be used.
 */
export class PlayersForm<
  T extends PlayerModel> extends React.Component<PlayersFormProps<T>, PlayersFormState
> {
  // region private variables

  /**
   * References to current existing input elements
   */
  private m_inputReferences: HTMLInputElement[] = [];

  // endregion

  // region React methods

  /**
   * Constructs an instance of the players form.
   *
   * @param props
   *   Properties to use
   */
  constructor(props: PlayersFormProps<T>) {
    super(props);
    this.state = {
      focus: -1,
      showAddPlayerWithScore: false,
      showConfirmAddPlayer: false,
      showConfirmRestart: false,
      name: '',
      score: 0,
    };
  }

  componentDidMount() {
    this.setState({
      focus: this.getFirstWithoutName(this.props.store.getState().players)
    });
  }

  componentWillUnmount() {
    useMainStore.getState().addPlayerNames(this.props.store.getState().players);
  }

  // endregion

  // region private methods

  private getFirstWithoutName(players: T[]): number {
    for (let index = 0; index < players.length; index++) {
      if (players[index].name.length === 0) {
        return index;
      }
    }
    return players.length - 1;
  }

  private checkActive(action: () => void, always: boolean = false): void {
    const {store} = this.props;
    if (store.getState().active && (store.getState().willResetActive() || always)) {
      this.setState({
        showConfirmRestart: true,
        action: action
      });
    } else {
      action();
    }
  }

  // endregion

  // region event handlers

  /**
   * Handles key presses in the name input fields.
   */
  private handleKeyPress(index: number, {key}: React.KeyboardEvent<HTMLInputElement>) {
    const {maxPlayerCount, store, playerFactory} = this.props;
    // if the user presses enter, focus the next field. If this is the last player, add player first
    // if possible
    if (key === 'Enter') {
      if (index < this.m_inputReferences.length - 1) {
        this.m_inputReferences[index + 1].focus();
      } else if (index < maxPlayerCount - 1) {
        this.setState({
          focus: store.getState().players.length,
        });
        store.getState().addPlayer(playerFactory(''));
      }
    }
  }

  /**
   * Handles the creation of an input field.
   */
  private handleInputRef(index: number, reference: HTMLInputElement) {
    this.m_inputReferences[index] = reference;
  }

  /**
   * Handles the user requesting to add another player.
   */
  private handleAddPlayer() {
    // there is no need to check for max players, since the add-button is disabled when the
    // max is reached
    const {store, playerFactory} = this.props;
    const storeState = store.getState();
    if (!storeState.active) {
      storeState.addPlayer(playerFactory(''));
    } else if (storeState.willResetActive()) {
      this.setState({showConfirmAddPlayer: true});
    } else {
      this.setState({
        showAddPlayerWithScore: true,
        name: '',
        score: 0,
      });
    }
  }

  /**
   * Handles new name for a player.
   */
  private handleChangeName(index: number, name: string): void {
    this.props.store.getState().changePlayerName(index, name);
  }

  /**
   * Handles the user adding a player with an initial score
   */
  private handleAddWithScore(name: string, score: number) {
    const {store, playerFactory} = this.props;
    store.getState().addPlayer(playerFactory(name, score));
    this.setState({
      showAddPlayerWithScore: false,
    });
  }

  /**
   * Handles the user adding a player and restarting the game.
   */
  private handleAddAndRestart(name: string) {
    const {store, playerFactory} = this.props;
    store.getState().addPlayer(playerFactory(name), true);
    this.setState({
      showAddPlayerWithScore: false,
    });
  }

  /**
   * Handles the user cancelling the add player with score popup.
   */
  private handleCloseAddPlayerWithScore() {
    this.setState({
      showAddPlayerWithScore: false,
    });
  }

  /**
   * Handles the user confirming or cancelling the restart game popup.
   */
  private handleConfirmRestartClose(confirm: boolean): void {
    this.setState({showConfirmRestart: false});
    if (confirm) {
      this.props.onRestart();
    }
  }

  /**
   * Handles the user confirming or cancelling to add new player.
   */
  private handleConfirmAddPlayerClose(confirm: boolean): void {
    this.setState({showConfirmAddPlayer: false});
    if (confirm) {
      this.props.store.getState().addPlayer(this.props.playerFactory(''));
    }
  }

  // endregion

  // region rendering

  /**
   * Renders the player form
   *
   * @return Html formatted data
   */
  render() {
    const {store, showFirst, firstLabel, teams, teamCount, onStart, onClose, toClose} = this.props;
    const storeState = store.getState();
    return (
      <>
        <Column gap={Spacing.Normal}>
          <PlayersTable
            players={storeState.players}
            showFirst={showFirst}
            firstLabel={firstLabel}
            teams={teams}
            teamCount={teamCount}
            focusIndex={this.state.focus}
            onSwapPlayers={(index1, index2) => this.checkActive(() => storeState.swapPlayers(index1, index2))}
            onRemovePlayer={(index) => this.checkActive(() => storeState.removePlayer(index))}
            onSelectFirstPlayer={(index) => this.checkActive(() => storeState.selectFirstPlayer(index))}
            onInputRef={(index, reference) => this.handleInputRef(index, reference)}
            onKeyPress={(index, event) => this.handleKeyPress(index, event)}
            onChangeName={(index, name) => this.handleChangeName(index, name)}
          />
          <PlayersButtonRow
            maxPlayerCount={this.props.maxPlayerCount}
            minPlayerCount={this.props.minPlayerCount}
            store={store}
            onStart={onStart}
            onClose={onClose}
            toClose={toClose}
            showFirst={showFirst}
            onAddPlayer={() => this.handleAddPlayer()}
            onRemoveAllPlayers={() => this.checkActive(() => storeState.removeAllPlayers(), true)}
            onRestart={() => this.setState({showConfirmRestart: true})}
          />
        </Column>
        <ConfirmAddPlayerPopup
          open={this.state.showConfirmAddPlayer}
          onClose={(confirm) => this.handleConfirmAddPlayerClose(confirm)}
        />
        <AddPlayerWithScorePopup
          open={this.state.showAddPlayerWithScore}
          onClose={() => this.handleCloseAddPlayerWithScore()}
          minScore={this.props.minScore}
          maxScore={this.props.maxScore}
          averageScore={this.props.averageScore}
          stepCount={this.props.stepCount}
          onAddPlayer={(name, score) => this.handleAddWithScore(name, score)}
          onAddPlayerAndRestart={(name) => this.handleAddAndRestart(name)}
        />
        <PlayersConfirmRestartPopup
          open={this.state.showConfirmRestart}
          onClose={(confirm) => this.handleConfirmRestartClose(confirm)}
        />
      </>
    );
  }

  // endregion
}

// endregion