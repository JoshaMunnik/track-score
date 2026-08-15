// region imports

import {WizardRoute} from "../type/WizardRoute.ts";
import {Button} from "../../../components/styled/button/Button.tsx";
import {WizardPhase} from "../type/WizardPhase.ts";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {DistributeContent} from "../../../types/enums/ui/DistributeContent.ts";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {useNavigate} from "react-router";
import type {WizardPlayerModel} from "../models/WizardPlayerModel.ts";

// endregion

// region local

type WizardHomeButtonRowProps = Readonly<{
  active: boolean;
  finished: boolean;
  players: WizardPlayerModel[];
  phase: WizardPhase;
  round: number;
  onNewPlayers: () => void;
  onRestart: () => void;
}>;

// endregion

// region exports

export function WizardHomeButtonRow({
  active,
  finished,
  players,
  phase,
  round,
  onNewPlayers,
  onRestart,
}: WizardHomeButtonRowProps) {
  const navigate = useNavigate();

  function renderButtons() {
    if (players.length < 3) {
      return (
        <Button to={WizardRoute.Players}>Enter players</Button>
      );
    }
    if (finished) {
      return (
        <>
          <Button
            onClick={() => {
              onRestart();
            }}>
            New game with same players
          </Button>
          <Button
            onClick={() => {
              onNewPlayers();
              navigate(WizardRoute.Players);
            }}>
            New players
          </Button>
        </>
      );
    }
    if (!active) {
      return (
        <>
          <Button
            onClick={() => {
              onRestart();
              navigate(WizardRoute.Bid)
            }}
          >
            Start game
          </Button>
          <Button
            to={WizardRoute.Players}
          >
            Manage players
          </Button>
        </>
      );
    }
    return (
      <>
        {
          (phase === WizardPhase.Bid) &&
          <Button
            to={WizardRoute.Bid}
          >
            Enter bids
          </Button>
        }
        {
          (phase === WizardPhase.Scoring) &&
          <Button
            to={WizardRoute.Scoring}
          >
            Enter scores
          </Button>
        }
        {
          (phase === WizardPhase.Scoring) &&
          <Button
            to={WizardRoute.Bid}
          >
            Rebid
          </Button>
        }
        {
          ((phase === WizardPhase.Scoring) || (round > 0)) &&
          <Button
            onClick={onRestart}
          >
            Restart
          </Button>
        }
      </>
    );
  }

  return (
    <Row
      distributeMainAxis={DistributeContent.Center}
      width={Size.Full}
      gap={Spacing.Small}>
      {renderButtons()}
    </Row>
  );
}

// endregion