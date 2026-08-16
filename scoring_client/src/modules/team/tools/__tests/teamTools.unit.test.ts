import { describe, it, expect } from 'vitest';
import { calcTeamScore, calcTeamScores, expandTeamScores, createTeamPlayer } from "../teamTools.ts";
import type { TeamPlayerModel } from "../../models/TeamPlayerModel.ts";
import type { TeamConfigurationModel } from "../../models/TeamConfigurationModel.ts";
import type { TeamState } from "../../store/TeamStore.ts";

function createTeamConfiguration(teamCount: number, playerCount: number): TeamConfigurationModel {
  return {
    maxScore: 0,
    name: "",
    scoreInterval: 0,
    trackDealer: false,
    useMaxScore: false,
    useScoreInterval: false,
    teamCount,
    playerCount
  };
}

describe('teamTools', () => {
  describe('calcTeamScore', () => {
    it('should calculate team score correctly', () => {
      const players: TeamPlayerModel[] = [
        { name: 'Player 1', scores: [10, 20, 30], first: false },
        { name: 'Player 2', scores: [15, 25, 35], first: false },
        { name: 'Player 3', scores: [5, 15, 25], first: false },
        { name: 'Player 4', scores: [20, 30, 40], first: false }
      ];
      
      const configuration: TeamConfigurationModel = createTeamConfiguration(2, 2); // 2 teams, 2 players each
      
      // Team 0: Players 0 and 2 (indices 0, 2)
      // 10 + 5
      expect(calcTeamScore(players, 0, configuration, 0)).toBe(15);
      // 10 + 5 + 20 + 15
      expect(calcTeamScore(players, 0, configuration, 1)).toBe(50);
      // 10 + 5 + 20 + 15 + 30 + 25
      expect(calcTeamScore(players, 0, configuration, 2)).toBe(105);
      
      // Team 1: Players 1 and 3 (indices 1, 3)
      // 15 + 20
      expect(calcTeamScore(players, 1, configuration, 0)).toBe(35);
      // 15 + 20 + 25 + 30
      expect(calcTeamScore(players, 1, configuration, 1)).toBe(90);
    });

    it('should handle single player teams', () => {
      const players: TeamPlayerModel[] = [
        { name: 'Player 1', scores: [10, 20, 30], first: false },
        { name: 'Player 2', scores: [15, 25, 35], first: false }
      ];

      // 2 teams, 1 player each
      const configuration: TeamConfigurationModel = createTeamConfiguration(2, 1);
      
      expect(calcTeamScore(players, 0, configuration, 0)).toBe(10);
      expect(calcTeamScore(players, 1, configuration, 0)).toBe(15);
    });
  });

  describe('calcTeamScores', () => {
    it('should calculate all team scores correctly', () => {
      const players: TeamPlayerModel[] = [
        { name: 'Player 1', scores: [10, 20, 30], first: false },
        { name: 'Player 2', scores: [15, 25, 35], first: false },
        { name: 'Player 3', scores: [5, 15, 25], first: false },
        { name: 'Player 4', scores: [20, 30, 40], first: false }
      ];

      const configuration: TeamConfigurationModel = createTeamConfiguration(2, 2); // 2 teams, 2 players each
      
      // For round 1:
      // Team 0 (players 0,2): scores[0][1]+scores[2][1] = 10+5+20+15 = 50
      // Team 1 (players 1,3): scores[1][1]+scores[3][1] = 15+20+25+30 = 90
      const result = calcTeamScores(players, configuration, 1);
      expect(result).toEqual([50, 90]);
    });
  });

  describe('expandTeamScores', () => {
    it('should expand scores array to include the required index', () => {
      const scores: number[] = [10, 20, 30];
      
      // Expand to index 2 (already exists)
      expect(expandTeamScores(scores, 2)).toEqual([10, 20, 30]);
      
      // Expand to index 4 (needs expansion)
      const scores2 = [10, 20, 30];
      expect(expandTeamScores(scores2, 4)).toEqual([10, 20, 30, 0, 0]);
      
      // Expand to index 0 (no expansion needed)
      const scores3 = [10, 20, 30];
      expect(expandTeamScores(scores3, 0)).toEqual([10, 20, 30]);
    });
  });

  describe('createTeamPlayer', () => {
    it('should create a team player with correct initial scores', () => {
      const state: TeamState = {
        round: 3,
        players: [],
        configuration: createTeamConfiguration(2,2),
        active: false,
        finished: false,
        gameSessionId: '',
        scoringRound: 0,
      };
      
      const player = createTeamPlayer(state, 'Test Player', 100);
      
      expect(player.name).toBe('Test Player');
      expect(player.first).toBe(false);
      expect(player.scores).toEqual([0, 0, 100, 0]); // Should have 3 elements (round 0, 1, 2, 3)
    });

    it('should create a team player with default start score of 0', () => {
      const state: TeamState = {
        round: 2,
        players: [],
        configuration: createTeamConfiguration(2,2),
        active: false,
        finished: false,
        gameSessionId: '',
        scoringRound: 0,
      };
      
      const player = createTeamPlayer(state, 'Test Player');
      
      expect(player.name).toBe('Test Player');
      expect(player.first).toBe(false);
      expect(player.scores).toEqual([0, 0, 0]); // Should have 3 elements (round 0, 1, 2)
    });
  });
});