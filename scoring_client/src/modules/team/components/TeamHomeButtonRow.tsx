// region imports

import {Row} from "../../../components/styled/layout/Row.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {Button} from "../../../components/styled/button/Button.tsx";
import {TeamRoute} from "../type/TeamRoute.ts";
import type {TeamPlayerModel} from "../models/TeamPlayerModel.ts";
import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";

// endregion

// region local

type TeamHomeButtonRowProps = Readonly<{
  viewing: boolean;
  active: boolean;
  players: TeamPlayerModel[];
  configuration: TeamConfigurationModel;
  finished: boolean;
  round: number;
  onStart: () => void;
  onRestart: () => void;
  onNewGame: () => void;
  onEnterScores: (round: number) => void;
  onDone: () => void;
}>;

// endregion

// region exports

export function TeamHomeButtonRow({
  viewing,
  active,
  players,
  configuration,
  finished,
  round,
  onStart,
  onRestart,
  onNewGame,
  onEnterScores,
  onDone,
}: TeamHomeButtonRowProps) {
  if (viewing) {
    return null;
  }
  if (!active) {
    return (
      <Row gap={Spacing.Normal}>
        {
          (players.length < configuration.teamCount * configuration.playerCount) &&
          <Button to={TeamRoute.Players}>
            Add players
          </Button>
        }
        <Button onClick={onStart}>
          Start
        </Button>
      </Row>
    );
  }
  if (finished) {
    return (
      <Row gap={Spacing.Normal}>
        <Button onClick={onRestart}>
          Restart
        </Button>
        <Button onClick={onNewGame}>
          New game
        </Button>
      </Row>
    );
  }
  return (
    <Row gap={Spacing.Normal}>
      <Button onClick={() => onEnterScores(round)}>
        Scoring
      </Button>
      {
        !configuration.useMaxScore &&
        <Button onClick={onDone}>
          Done
        </Button>
      }
      <Button onClick={onRestart}>
        Restart
      </Button>
    </Row>
  );
}

// endregion
