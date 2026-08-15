/**
 * {@link PlayerModel} encapsulates a player for a certain game.
 */
export type PlayerModel = {
  /**
   * Name of player
   */
  name: string;

  /**
   * True if the player starts the game or is the first dealer.
   */
  first: boolean;
}
