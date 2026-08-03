// region imports

import type {GameType} from "../types/enums/GameType.ts";
import type {ModuleModel} from "../types/models/ModuleModel.ts";
import {modules} from "../modules/modules.ts";
import {v4 as uuidv4} from "uuid";
import type {GameSessionModel} from "../types/models/GameSessionModel.ts";
import {useMainStore} from "../store/main/useMainStore.ts";
import type {StorableGameActions} from "../store/storable/StorableGameStore.ts";
import type {UseBoundStore} from "zustand/react";
import type {StoreApi} from "zustand/vanilla";
import type {StorableGameStore} from "../store/storable/StorableGameStore.ts";
import type {SharableGameState} from "../store/sharable/SharableGameStore.ts";
import {gameSessionService} from "../services/gameSessionService.ts";
import {type UFDynamicObject} from "@ultraforce/ts-general-lib";

// endregion

// region local

function createGameSession(store: StorableGameActions & StorableGameStore): GameSessionModel {
  return {
    id: store.gameSessionId,
    type: store.getType(),
    data: store.getData(),
    date: (new Date()).getTime(),
    finished: store.finished,
    summary: store.getSummary(),
  };
}

// endregion

// region exports

export function getGameModule(type: GameType): ModuleModel | null {
  const result = modules.find((module) => module.type === type);
  if (!result) {
    return null;
  }
  return result;
}

/**
 * Encodes an object to a UTF-8 safe Base64 string. Function values in {@link data} are ignored.
 *
 * @param data
 *   Data to encode
 * @return base64 encoded data
 */
export function encodeBase64(data: unknown): string {
  const jsonString = JSON.stringify(data);
  // using TextEncoder handles UTF-8 characters properly
  const utf8Bytes = new TextEncoder().encode(jsonString);
  // convert bytes to a binary string that btoa understands
  const binString = String.fromCodePoint(...utf8Bytes);
  return btoa(binString);
}

/**
 * Decodes a Base64 string back into a typed object.
 *
 * @template T type of data
 * @param base64String
 *   Base64 encoded string to decode (encoded with {@link encodeBase64})
 *
 * @return decoded data cast to T
 */
export function decodeBase64<T>(base64String: string): T {
  const binString = atob(base64String);
  // convert binary string back to UTF-8 bytes
  const utf8Bytes = Uint8Array.from(binString, (text) => text.codePointAt(0)!);
  const jsonString = new TextDecoder().decode(utf8Bytes);
  return JSON.parse(jsonString) as T;
}

/**
 * Compare two values, if the values are objects compare fields. If the fields are objects
 * themselves, recursively compare their fields.
 *
 * @param value1
 *   First value to compare
 * @param value2
 *   Second value to compare
 * @param ignoreKeys
 *   Optional array of key names to ignore during comparison
 *
 * @returns `true` if the values are equal or all fields within the objects are equal;
 *   `false` otherwise.
 */
export function isEqual<T>(value1: T, value2: T, ignoreKeys?: string[]): boolean {
  // check for strict equality first
  if (value1 === value2) {
    return true;
  }
  // make sure both values are not null
  if (value1 == null || value2 == null) {
    return false;
  }
  // check if both values are of the same type
  if (typeof value1 !== typeof value2) {
    return false;
  }
  // value is not an object, but the first === failed so values are not equal
  if (typeof value1 !== "object") {
    return false;
  }
  // get all fields within the object
  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);
  // quick check, exit if the number of fields are different
  if (keys1.length !== keys2.length) {
    return false;
  }
  // process each field
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    if (ignoreKeys && ignoreKeys.includes(key)) {
      continue;
    }
    const field1 = (value1 as UFDynamicObject)[key];
    const field2 = (value2 as UFDynamicObject)[key];
    if (!isEqual(field1, field2, ignoreKeys)) {
      return false;
    }
  }
  // all fields are equal
  return true;
}

/**
 * Returns an id that is unique across all scoring clients.
 *
 * Note: the id has to be globally unique, since the game session it is used for might be shared
 * with multiple clients.
 */
export function getGameSessionId(): string {
  return uuidv4();
}

/**
 * Updates the local stored game session.
 *
 * If {@link sharableStore} is provided, the game session is also sent to the server if a share
 * code is set and the store is not in viewing mode.
 */
export function updateGameSession(
  store: UseBoundStore<StoreApi<StorableGameStore & StorableGameActions>>,
  sharableStore?: UseBoundStore<StoreApi<SharableGameState>>
): void {
  const state = store.getState();
  const session = createGameSession(state);
  useMainStore.getState().updateGameSession(session);
  if (!sharableStore) {
    return;
  }
  const sharableState = sharableStore.getState();
  const shareCode = (sharableState.viewing || !sharableState.shareCode) ? false : sharableState.shareCode;
  if (shareCode !== false) {
    gameSessionService.send(shareCode, session);
  }
}

// endregion