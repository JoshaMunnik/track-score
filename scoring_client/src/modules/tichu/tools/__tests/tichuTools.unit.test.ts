import { describe, it, expect } from 'vitest';
import { calcTichuBonusScore, calcTichuScore, calcTichuScores } from "../tichuTools.ts";
import { TichuResultType } from "../../type/TichuResultType.ts";
import type { TichuTeamRoundModel } from "../../models/TichuTeamRoundModel.ts";
import type {TichuRoundModel} from "../../models/TichuRoundModel.ts";

describe('Tichu Tools', () => {
  describe('calcTichuBonusScore', () => {
    it('should calculate grand tichu bonus score correctly when team made it', () => {
      const teamRound: TichuTeamRoundModel = {
        grandTichu: true,
        result: TichuResultType.GrandTichu,
        tichu0: false,
        tichu1: false,
        first: false,
        cardScore: 0
      };
      
      expect(calcTichuBonusScore(teamRound)).toBe(200);
    });

    it('should calculate grand tichu penalty score correctly when team failed', () => {
      const teamRound: TichuTeamRoundModel = {
        grandTichu: true,
        result: TichuResultType.None,
        tichu0: false,
        tichu1: false,
        first: false,
        cardScore: 0
      };
      
      expect(calcTichuBonusScore(teamRound)).toBe(-200);
    });

    it('should calculate tichu0 bonus score correctly when team made it', () => {
      const teamRound: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.Tichu,
        tichu0: true,
        tichu1: false,
        first: false,
        cardScore: 0
      };
      
      expect(calcTichuBonusScore(teamRound)).toBe(100);
    });

    it('should calculate tichu0 penalty score correctly when team failed', () => {
      const teamRound: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.None,
        tichu0: true,
        tichu1: false,
        first: false,
        cardScore: 0
      };
      
      expect(calcTichuBonusScore(teamRound)).toBe(-100);
    });

    it('should calculate tichu1 bonus score correctly when team made it', () => {
      const teamRound: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.Tichu,
        tichu0: false,
        tichu1: true,
        first: false,
        cardScore: 0
      };
      
      expect(calcTichuBonusScore(teamRound)).toBe(100);
    });

    it('should calculate tichu1 penalty score correctly when team failed', () => {
      const teamRound: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.None,
        tichu0: false,
        tichu1: true,
        first: false,
        cardScore: 0
      };
      
      expect(calcTichuBonusScore(teamRound)).toBe(-100);
    });

    it('should calculate first place bonus correctly', () => {
      const teamRound: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.None,
        tichu0: false,
        tichu1: false,
        first: true,
        cardScore: 0
      };
      
      expect(calcTichuBonusScore(teamRound)).toBe(200);
    });

    it('should calculate combined bonuses correctly', () => {
      const teamRound: TichuTeamRoundModel = {
        grandTichu: true,
        result: TichuResultType.GrandTichu,
        tichu0: true,
        tichu1: false,
        first: true,
        cardScore: 0
      };
      
      expect(calcTichuBonusScore(teamRound)).toBe(300); // 200 + 200 - 100
    });

    it('should return 0 when no bonuses are applicable', () => {
      const teamRound: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.None,
        tichu0: false,
        tichu1: false,
        first: false,
        cardScore: 0
      };
      
      expect(calcTichuBonusScore(teamRound)).toBe(0);
    });
  });

  describe('calcTichuScore', () => {
    it('should calculate total score correctly with first place bonus', () => {
      const team: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.None,
        tichu0: false,
        tichu1: false,
        first: true,
        cardScore: 50
      };
      
      const otherTeam: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.None,
        tichu0: false,
        tichu1: false,
        first: false,
        cardScore: 50
      };

      // card score should be ignored
      expect(calcTichuScore(team, otherTeam)).toBe(200);
    });

    it('should calculate total score correctly with other team having first place', () => {
      const team: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.None,
        tichu0: false,
        tichu1: false,
        first: false,
        cardScore: 50
      };
      
      const otherTeam: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.None,
        tichu0: false,
        tichu1: false,
        first: true,
        cardScore: 50
      };
      
      expect(calcTichuScore(team, otherTeam)).toBe(0);
    });

    it('should calculate total score with grand tichu bonus', () => {
      const team: TichuTeamRoundModel = {
        grandTichu: true,
        result: TichuResultType.GrandTichu,
        tichu0: false,
        tichu1: false,
        first: false,
        cardScore: 50
      };
      
      const otherTeam: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.None,
        tichu0: false,
        tichu1: false,
        first: false,
        cardScore: 50
      };
      
      expect(calcTichuScore(team, otherTeam)).toBe(250); // 50 (card score) + 200 (grand tichu bonus)
    });

    it('should calculate total score with tichu bonus', () => {
      const team: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.Tichu,
        tichu0: true,
        tichu1: false,
        first: false,
        cardScore: 50
      };
      
      const otherTeam: TichuTeamRoundModel = {
        grandTichu: false,
        result: TichuResultType.None,
        tichu0: false,
        tichu1: false,
        first: false,
        cardScore: 0
      };
      
      expect(calcTichuScore(team, otherTeam)).toBe(150); // 50 (card score) + 100 (tichu bonus)
    });
  });

  describe('calcTichuScores', () => {
    it('should calculate scores for multiple rounds correctly', () => {
      const rounds = [
        {
          teams: [
            {
              grandTichu: true,
              result: TichuResultType.GrandTichu,
              tichu0: false,
              tichu1: false,
              first: false,
              cardScore: 70
            },
            {
              grandTichu: false,
              result: TichuResultType.None,
              tichu0: false,
              tichu1: false,
              first: false,
              cardScore: 30
            }
          ]
        },
        {
          teams: [
            {
              grandTichu: false,
              result: TichuResultType.None,
              tichu0: true,
              tichu1: false,
              first: false,
              cardScore: 40
            },
            {
              grandTichu: false,
              result: TichuResultType.None,
              tichu0: false,
              tichu1: false,
              first: false,
              cardScore: 60
            }
          ]
        }
      ];

      // Team 1: 200 + 70 - 100 + 40 = 210, Team 2: 30 + 60 = 90
      expect(calcTichuScores(rounds)).toEqual([210, 90]);
    });

    it('should calculate scores for specific rounds only', () => {
      const rounds = [
        {
          teams: [
            {
              grandTichu: true,
              result: TichuResultType.GrandTichu,
              tichu0: false,
              tichu1: false,
              first: false,
              cardScore: 30
            },
            {
              grandTichu: false,
              result: TichuResultType.None,
              tichu0: false,
              tichu1: false,
              first: false,
              cardScore: 70
            }
          ]
        },
        {
          teams: [
            {
              grandTichu: false,
              result: TichuResultType.None,
              tichu0: true,
              tichu1: false,
              first: false,
              cardScore: 40
            },
            {
              grandTichu: false,
              result: TichuResultType.None,
              tichu0: false,
              tichu1: false,
              first: false,
              cardScore: 60
            }
          ]
        }
      ];
      
      expect(calcTichuScores(rounds, 0)).toEqual([230, 70]); // Only first round
    });

    it('should handle empty rounds correctly', () => {
      const rounds: TichuRoundModel[] = [];
      expect(calcTichuScores(rounds)).toEqual([0, 0]);
    });
  });
});