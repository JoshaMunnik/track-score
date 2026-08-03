// region imports

import type {IndividualPlayerModel} from "../models/IndividualPlayerModel.ts";
import type {IndividualState} from "../store/IndividualStore.ts";

// endregion

// region exports

export function calcIndividualScore(player: IndividualPlayerModel, round: number): number {
  if (round < 0) {
    return 0;
  }
  let result = 0;
  for(let index = 0; index <= round; index++) {
    result += index < player.scores.length ? player.scores[index] ?? 0 : 0;
  }
  return result;
}

/**
 * Expands the scores' array if needed so there is a value for index.
 *
 * @param scores
 *   Scores to expand
 * @param index
 *   Index for which there should be a value
 *
 * @returns the value of {@link scores}
 */
export function expandIndividualScores(scores: number[], index: number): number[] {
  while(scores.length <= index) {
    scores.push(0);
  }
  return scores;
}

/**
 * Creates a new player.
 *
 * @param state
 * @param name
 * @param startScore
 */
export function createIndividualPlayer(
  state: IndividualState, name: string, startScore?: number
): IndividualPlayerModel {
  // instead of storing a score for a certain round, just store it at the last round
  const scores: number[] = expandIndividualScores([], state.round);
  scores[Math.max(0, state.round - 1)] = startScore || 0;
  return {
    name: name,
    scores: scores,
    first: false,
  }
}

// endregion