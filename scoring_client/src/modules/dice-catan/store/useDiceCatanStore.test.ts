import {beforeEach, describe, expect, it, vi} from 'vitest';

const getRollsMock = vi.fn();
const randomIntegerMock = vi.fn();

vi.mock('../../../tools/diceTools.ts', () => ({
  getRolls: getRollsMock,
}));

vi.mock('@ultraforce/ts-general-lib', () => ({
  UFMath: {
    randomInteger: randomIntegerMock,
  },
}));

describe('useDiceCatanStore', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    localStorage.clear();

    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    useDiceCatanStore.setState({
      active: false,
      useGroups: true,
      groupCount: 3,
      trackBarbarians: true,
      barbarianShipMoves: 7,
      ignoreSevens: true,
      rolls: [],
      preRolls: [],
      barbarianShipPosition: 0,
      invaded: false,
    });
  });

  it('has the expected initial state', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: false,
      useGroups: true,
      groupCount: 3,
      trackBarbarians: true,
      barbarianShipMoves: 7,
      ignoreSevens: true,
      rolls: [],
      preRolls: [],
      barbarianShipPosition: 0,
      invaded: false,
    });
  });

  it('sets config and resets game progress', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    useDiceCatanStore.getState().setConfig({
      useGroups: false,
      groupCount: 5,
      trackBarbarians: false,
      barbarianShipMoves: 9,
      ignoreSevens: false,
    });

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: false,
      useGroups: false,
      groupCount: 5,
      trackBarbarians: false,
      barbarianShipMoves: 9,
      ignoreSevens: false,
      invaded: false,
      preRolls: [],
      rolls: [],
      barbarianShipPosition: 8,
    });
  });

  it('resets to the initial state', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    useDiceCatanStore.setState({
      active: true,
      useGroups: false,
      groupCount: 10,
      trackBarbarians: false,
      barbarianShipMoves: 12,
      ignoreSevens: false,
      rolls: [3, 4, 5],
      preRolls: [1, 2, 3],
      barbarianShipPosition: 2,
      invaded: true,
    });

    useDiceCatanStore.getState().reset();

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: false,
      useGroups: true,
      groupCount: 3,
      trackBarbarians: true,
      barbarianShipMoves: 7,
      ignoreSevens: true,
      rolls: [],
      preRolls: [],
      barbarianShipPosition: 0,
      invaded: false,
    });
  });

  it('resets game progress while keeping current config', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    useDiceCatanStore.setState({
      active: true,
      useGroups: false,
      groupCount: 4,
      trackBarbarians: false,
      barbarianShipMoves: 10,
      ignoreSevens: false,
      rolls: [2, 5, 1],
      preRolls: [8, 9],
      barbarianShipPosition: 3,
      invaded: true,
    });

    useDiceCatanStore.getState().resetGame();

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: false,
      useGroups: false,
      groupCount: 4,
      trackBarbarians: false,
      barbarianShipMoves: 10,
      ignoreSevens: false,
      rolls: [],
      preRolls: [],
      barbarianShipPosition: 9,
      invaded: false,
    });
  });

  it('moves the barbarian ship backwards and activates the game', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    useDiceCatanStore.setState({
      barbarianShipMoves: 7,
      barbarianShipPosition: 4,
      invaded: false,
      active: false,
    });

    useDiceCatanStore.getState().moveBarbarianShip();

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: true,
      barbarianShipPosition: 3,
      invaded: false,
    });
  });

  it('wraps the barbarian ship when moving from position zero', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    useDiceCatanStore.setState({
      barbarianShipMoves: 7,
      barbarianShipPosition: 0,
      invaded: false,
      active: false,
    });

    useDiceCatanStore.getState().moveBarbarianShip();

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: true,
      barbarianShipPosition: 6,
      invaded: false,
    });
  });

  it('marks invaded when the barbarian ship reaches position zero', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    useDiceCatanStore.setState({
      barbarianShipMoves: 7,
      barbarianShipPosition: 1,
      invaded: false,
    });

    useDiceCatanStore.getState().moveBarbarianShip();

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: true,
      barbarianShipPosition: 0,
      invaded: true,
    });
  });

  it('rolls dice without tracking barbarians', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    getRollsMock.mockReturnValue([3, 4]);

    useDiceCatanStore.setState({
      useGroups: true,
      groupCount: 3,
      trackBarbarians: false,
      ignoreSevens: true,
      preRolls: [1, 2, 3],
      rolls: [],
      barbarianShipPosition: 5,
      invaded: false,
      active: false,
    });

    useDiceCatanStore.getState().rollDice();

    expect(getRollsMock).toHaveBeenCalledWith(
      [1, 2, 3],
      2,
      1,
      6,
      true,
      3,
    );
    expect(randomIntegerMock).not.toHaveBeenCalled();

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: true,
      rolls: [3, 4],
      preRolls: [1, 2, 3],
      barbarianShipPosition: 5,
      invaded: false,
    });
  });

  it('rerolls sevens while barbarians are tracked and invasion has not happened', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    getRollsMock
      .mockReturnValueOnce([3, 4])
      .mockReturnValueOnce([5, 5]);
    randomIntegerMock.mockReturnValue(4);

    useDiceCatanStore.setState({
      useGroups: true,
      groupCount: 3,
      trackBarbarians: true,
      ignoreSevens: true,
      preRolls: [],
      barbarianShipMoves: 7,
      barbarianShipPosition: 5,
      invaded: false,
    });

    useDiceCatanStore.getState().rollDice();

    expect(getRollsMock).toHaveBeenCalledTimes(2);
    expect(randomIntegerMock).toHaveBeenCalledWith(1, 6);

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: true,
      rolls: [5, 5, 4],
      barbarianShipPosition: 5,
      invaded: false,
    });
  });

  it('moves the barbarian ship when the event die shows a barbarian ship', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    getRollsMock.mockReturnValue([2, 3]);
    randomIntegerMock.mockReturnValue(1);

    useDiceCatanStore.setState({
      trackBarbarians: true,
      ignoreSevens: true,
      barbarianShipMoves: 7,
      barbarianShipPosition: 5,
      invaded: false,
    });

    useDiceCatanStore.getState().rollDice();

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: true,
      rolls: [2, 3, 1],
      barbarianShipPosition: 4,
      invaded: false,
    });
  });

  it('wraps the barbarian ship during rollDice when it moves below zero', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    getRollsMock.mockReturnValue([2, 3]);
    randomIntegerMock.mockReturnValue(2);

    useDiceCatanStore.setState({
      trackBarbarians: true,
      ignoreSevens: true,
      barbarianShipMoves: 7,
      barbarianShipPosition: 0,
      invaded: false,
    });

    useDiceCatanStore.getState().rollDice();

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: true,
      rolls: [2, 3, 2],
      barbarianShipPosition: 6,
      invaded: false,
    });
  });

  it('marks invaded when the barbarian ship reaches zero during rollDice', async () => {
    const {useDiceCatanStore} = await import('./useDiceCatanStore.ts');

    getRollsMock.mockReturnValue([2, 3]);
    randomIntegerMock.mockReturnValue(3);

    useDiceCatanStore.setState({
      trackBarbarians: true,
      ignoreSevens: true,
      barbarianShipMoves: 7,
      barbarianShipPosition: 1,
      invaded: false,
    });

    useDiceCatanStore.getState().rollDice();

    expect(useDiceCatanStore.getState()).toMatchObject({
      active: true,
      rolls: [2, 3, 3],
      barbarianShipPosition: 0,
      invaded: true,
    });
  });
});