// region imports

import {UFArray, UFMath} from "@ultraforce/ts-general-lib";

// endregion

// region exports

/**
 * Fills the {@link rolls} with a number of dice rolls.
 *
 * @param preRolls
 *   An array containing available rolls (only used if {@link useGroups} is `true`). Each value
 *   is the sum of all dice rolls.
 * @param diceCount
 *   Number of dices
 * @param startNumber
 *   Starting number of a die
 * @param endNumber
 *   Ending number of a die
 * @param useGroups
 *   When `true` prefill {@link preRolls} with all combinations
 * @param groupCount
 *   Number of groups (only used if {@link useGroups} is `true`)
 *
 * @return array with dice rolls
 */
export function getRolls(
  preRolls: number[],
  diceCount: number,
  startNumber: number,
  endNumber: number,
  useGroups: boolean,
  groupCount: number,
): number[] {
  // make start is smallest of the two
  if (startNumber > endNumber) {
    [startNumber, endNumber] = [endNumber, startNumber];
  }
  // number range of a die
  const numberCount: number = endNumber - startNumber + 1;
  const result: number[] = [];
  result.length = Math.max(0, diceCount);
  // validate inputs to prevent runtime errors
  if (diceCount <= 0 || numberCount <= 0) {
    return result;
  }
  // fill with fully random numbers when not using groups
  if (!useGroups) {
    for (let index = 0; index < diceCount; index++) {
      result[index] = UFMath.randomInteger(startNumber, endNumber);
    }
  }
  else {
    // refill if there are no more pre-rolls available
    if (!preRolls.length) {
      const combinations: number = Math.pow(numberCount, diceCount);
      preRolls.length = combinations * groupCount;
      for (let index = 0; index < preRolls.length; index++) {
        preRolls[index] = index % combinations;
      }
      UFArray.shuffle(preRolls);
    }
    let roll = preRolls.pop();
    // just to be safe (should never happen), check if pop returned undefined and use start
    // number for all dice
    if (roll === undefined) {
      UFArray.createFilled(startNumber, diceCount, result);
    }
    else {
      for (let index = 0; index < diceCount; index++) {
        result[index] = startNumber + (roll % numberCount);
        roll = Math.floor(roll / numberCount);
      }
    }
  }
  return result;
}

// endregion
