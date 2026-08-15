// region imports

import type {TichuTeamRoundModel} from "../models/TichuTeamRoundModel.ts";
import {TichuResultType} from "../type/TichuResultType.ts";
import type {TichuRoundModel} from "../models/TichuRoundModel.ts";

// endregion

// region exports

/**
 * Calculates the tichu call score for a certain round and team and finishing as first bonus score.
 *
 * @param teamRound
 *   Data to calc score with
 *
 * @returns score for the round and team
 */
export function calcTichuBonusScore(teamRound: TichuTeamRoundModel): number {
  let result = 0;
  // handle calls and if the team made it
  if (teamRound.grandTichu) {
    result = result + (teamRound.result === TichuResultType.GrandTichu ? 200 : -200);
  }
  if (teamRound.tichu0) {
    result = result + (teamRound.result === TichuResultType.Tichu ? 100 : -100);
  }
  if (teamRound.tichu1) {
    result = result + ((teamRound.result === TichuResultType.Tichu) && !teamRound.tichu0 ? 100 : -100);
  }
  // handle team finishing as first
  if (teamRound.first) {
    result += 200;
  }
  return result;
}

/**
 * Calculates the tichu score for a certain round and team.
 *
 * @param team
 *   Data to calc score with
 * @param otherTeam
 *   Data from the other team
 *
 * @returns score for the round and team
 */
export function calcTichuScore(team: TichuTeamRoundModel, otherTeam: TichuTeamRoundModel): number {
  return (team.first || otherTeam.first ? 0 : team.cardScore) + calcTichuBonusScore(team);
}

/**
 * Calculates the total tichu score for every team
 *
 * @param rounds
 *   Rounds data
 * @param lastRound
 *   Last round
 *
 * @returns an array of two integers containing the score for the first and second team.
 */
export function calcTichuScores(rounds: TichuRoundModel[], lastRound?: number): number[] {
  const result = [0, 0];
  lastRound = (lastRound === undefined) ? rounds.length - 1 : Math.min(lastRound, rounds.length - 1);
  for(let index = 0; index <= lastRound; index++) {
    const round = rounds[index];
    result[0] += calcTichuScore(round.teams[0], round.teams[1]);
    result[1] += calcTichuScore(round.teams[1], round.teams[0]);
  }
  return result;
}

// endregion