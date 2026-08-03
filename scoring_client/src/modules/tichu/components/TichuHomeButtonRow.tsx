// region imports

import {Row} from "../../../components/styled/layout/Row.tsx";
import {Button} from "../../../components/styled/button/Button.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {TichuRoute} from "../type/TichuRoute.ts";
import type {TichuPlayerModel} from "../models/TichuPlayerModel.ts";
import type {TichuRoundModel} from "../models/TichuRoundModel.ts";

// endregion

// region local

type TichuHomeButtonRowProps = Readonly<{
  viewing: boolean;
  active: boolean;
  finished: boolean;
  players: TichuPlayerModel[];
  rounds: TichuRoundModel[];
  start: () => void;
  restart: () => void;
  reset: () => void;
  replayRound: () => void;
}>;

// endregion

// region exports

export function TichuHomeButtonRow({
  viewing,
  active,
  finished,
  players,
  rounds,
  start,
  restart,
  reset,
  replayRound,
}: TichuHomeButtonRowProps) {
  if (viewing) {
    return null;
  }
  if (!active) {
    return (
      <Row gap={Spacing.Normal}>
        {
          (players.length < 4) &&
          <Button to={TichuRoute.Players}>
            Add players
          </Button>
        }
        {
          (players.length === 4) &&
          <Button onClick={start}>
            Start
          </Button>
        }
      </Row>
    );
  }
  if (finished) {
    return (
      <Row gap={Spacing.Normal}>
        <Button onClick={restart}>
          Restart
        </Button>
        <Button onClick={replayRound}>
          Replay previous
        </Button>
        <Button onClick={reset}>
          New game
        </Button>
      </Row>
    );
  }
  return (
    <Row gap={Spacing.Normal}>
      <Button to={TichuRoute.Scoring}>
        Scoring
      </Button>
      {
        (rounds.length > 0) &&
        <Button onClick={replayRound}>
          Replay previous
        </Button>
      }
      <Button onClick={restart}>
        Restart
      </Button>
    </Row>
  );
}

// endregion