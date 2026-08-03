// region imports

import type {TeamPlayerModel} from "../models/TeamPlayerModel.ts";
import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";
import type {TeamState} from "../store/TeamStore.ts";

// endregion

// region local

function calcPlayerScore(player: TeamPlayerModel, round: number): number {
  if (round < 0) {
    return 0;
  }
  let result = 0;
  for (let index = 0; index <= round; index++) {
    result += index < player.scores.length ? player.scores[index] ?? 0 : 0;
  }
  return result;
}

// endregion

// region exports

export function calcTeamScore(
  players: TeamPlayerModel[], team: number, configuration: TeamConfigurationModel, round: number
): number {
  let result = 0;
  const teamSize = configuration.playerCount > 1 ? configuration.playerCount : players.length;
  for (let index = team; index < players.length; index += teamSize) {
    result += calcPlayerScore(players[index], round);
  }
  return result;
}

export function calcTeamScores(
  players: TeamPlayerModel[], configuration: TeamConfigurationModel, round: number
): number[] {
  const result: number[] = [];
  for(let index = 0; index < configuration.teamCount; index++) {
    result.push(calcTeamScore(players, index, configuration, round));
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
export function expandTeamScores(scores: number[], index: number): number[] {
  while(scores.length <= index) {
    scores.push(0);
  }
  return scores;
}

export function createTeamPlayer(state: TeamState, name: string, startScore?: number): TeamPlayerModel {
  // instead of storing a score for a certain round, just store it at the last round
  const scores: number[] = expandTeamScores([], state.round);
  scores[Math.max(0, state.round - 1)] = startScore || 0;
  return {
    name: name,
    scores: scores,
    first: false,
  }
}

// endregion