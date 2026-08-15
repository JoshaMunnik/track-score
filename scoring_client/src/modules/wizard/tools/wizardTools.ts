// region imports

import type {WizardPlayerModel} from "../models/WizardPlayerModel.ts";
import type {WizardPlayerRoundModel} from "../models/WizardPlayerRoundModel.ts";
import type {WizardState} from "../store/WizardStore.ts";
import {UFArray} from "@ultraforce/ts-general-lib";

// endregion

// region exports

/**
 * Calculates the score for a player using {@link WizardPlayerModel} up till a certain round.
 *
 * @param player
 *   Player to calculate the score for
 * @param round
 *   Round (inclusive, first round is 0)
 *
 * @return score
 */
export function calcWizardScore(player: WizardPlayerModel, round: number): number {
  let score = round >= player.startRound ? player.startScore : 0;
  for(let index = player.startRound; index <= round; index++) {
    const round: WizardPlayerRoundModel = player.rounds[index];
    if (round.bid === round.taken) {
      score += 20 + 10 * round.taken;
    }
    else {
      score -= 10 * Math.abs(round.bid - round.taken);
    }
  }
  return score;
}

/**
 * Checks it the bidded value equals the taken value for a round
 *
 * @param player
 *   Player to check
 * @param round
 *   Round to check
 *
 * @returns `true` if the player called correctly.
 */
export function calledCorrectWizardRound(player: WizardPlayerModel, round: number): boolean {
  const roundData: WizardPlayerRoundModel = player.rounds[round];
  return roundData.bid === roundData.taken;
}

/**
 * Create an array with enough entries for all wizard rounds
 */
export function createWizardRounds(): WizardPlayerRoundModel[] {
  // 20 is maximum number of rounds needed
  return UFArray.createFilled(() => ({bid: 0, taken: 0}), 20);
}

export function createWizardPlayer(
  state: WizardState, name: string, startScore?: number
): WizardPlayerModel {
  return {
    name: name,
    rounds: createWizardRounds(),
    first: false,
    startRound: state.active ? state.round : 0,
    startScore: startScore ?? 0,
  }
}



// endregion