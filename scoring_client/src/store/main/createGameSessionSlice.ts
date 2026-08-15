import type {StateCreator} from "zustand";
import type {MainStore} from "./MainStore.ts";
import type {GameSessionSlice, GameSessionState} from "./GameSessionSlice.ts";

export const initialGameSessionState: GameSessionState = {
  gameSessions: {},
};

export const createGameSessionSlice: StateCreator<
  MainStore,
  [], // Middleware types (leave empty if not using any middleware here)
  [],
  GameSessionSlice
> = (set) => ({
  ...initialGameSessionState,

  updateGameSession: (session) => set((state) => ({
    gameSessions: {
      ...state.gameSessions,
      [session.id]: session,
    }
  })),

  removeGameSession: (id: string) => set((state) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {[id]: _, ...remainingSessions} = state.gameSessions;
    return {
      gameSessions: remainingSessions
    };
  }),

  removeGameSessions: () => set({
    gameSessions: {},
  }),
});
