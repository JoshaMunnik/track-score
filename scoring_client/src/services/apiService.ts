// region imports

import type {GameType} from "../types/enums/GameType.ts";
import type {ServerGameSessionModel} from "../types/models/server/ServerGameSessionModel.ts";
import type {ShareCodeResponseModel} from "../types/models/server/ShareCodeResponseModel.ts";
import {useMainStore} from "../store/main/useMainStore.ts";
import {getServerApiUrl} from "../tools/netTools.ts";

// endregion

// region exports

/**
 * Encapsulates the various server API calls.
 */
export const apiService = new class ApiService {
  // region private methods

  /**
   * Performs a get server call.
   *
   * @param action
   *
   * @private
   */
  private async get(action: string): Promise<Response> {
    const serverUrl = getServerApiUrl();
    console.debug('ApiService.get: ' + serverUrl + action);
    return await fetch(
      serverUrl + action,
      {
        method: 'GET',
      }
    );
  }

  /**
   * Performs a post server call.
   *
   * @param action
   * @param data
   *
   * @private
   */
  private async post(action: string, data: object): Promise<Response> {
    const serverUrl = getServerApiUrl();
    console.debug('ApiService.post: ' + serverUrl + action);
    return await fetch(
      serverUrl + action,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
  }

  /**
   * Calls the server with either GET or POST depending on the presence of any data.
   *
   * @param action
   * @param data
   *
   * @private
   */
  private async callApi<T>(action: string, data?: object): Promise<T> {
    const response = data ? await this.post(action, data) : await this.get(action);
    if (!response.ok) {
      let errorBody = '';
      try {
        errorBody = ' - ' + await response.text();
      }
      catch {
        // ignore
      }
      throw new Error(`API call failed: ${response.status} ${response.statusText}${errorBody}`);
    }
    return await response.json() as unknown as T;
  }

  // endregion

  // region public methods

  /**
   * Gets a new sharing code for a specific game type
   *
   * @throws Error if the server call fails
   */
  async getShareCode(type: GameType, data: string): Promise<string> {
    const response: ShareCodeResponseModel = await this.callApi('create', {type, data});
    return response.code;
  }

  /**
   * Gets a game session if any. Unlike the other methods this method will throw an error, but
   * just returns false if an error occurred.
   *
   * @param shareCode
   * @param sequence
   *
   * @returns either new game data or false if there is no new data
   */
  async getGameSession(shareCode: string, sequence?: number): Promise<ServerGameSessionModel | false> {
    try {
      useMainStore.getState().startRetrievingGameSession();
      return await this.callApi(
        'get',
        {
          'code': shareCode,
          'sequence': sequence || -1
        }
      );
    } catch (error) {
      console.error({error});
      return false;
    } finally {
      useMainStore.getState().stopRetrievingGameSession();
    }
  }

  /**
   * Updates a game session.
   *
   * @throws Error if the server call fails
   */
  async updateGameSession(shareCode: string, data: string, finished: boolean): Promise<void> {
    try {
      useMainStore.getState().startSendingGameSession();
      await this.callApi(
        'update',
        {
          'code': shareCode,
          'data': data,
          'finished': finished ? 1 : 0
        }
      );
    } finally {
      useMainStore.getState().stopSendingGameSession();
    }
  }

  // endregion
}

// endregion