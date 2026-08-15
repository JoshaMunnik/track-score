// region imports

import {Row} from "../../../components/styled/layout/Row.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {Button} from "../../../components/styled/button/Button.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";

// endregion

// region local

type IndividualScoringButtonRowProps = Readonly<{
  latestRound: boolean,
  onNextRound: () => void,
  onClose: () => void
}>;

// endregion

// region exports

export function IndividualScoringButtonRow({
  latestRound,
  onNextRound,
  onClose
}: IndividualScoringButtonRowProps) {
  return <Row gap={Spacing.Small}>
    {
      latestRound &&
      <Button
        type={ButtonType.Success}
        onClick={onNextRound}
      >
        Next round
      </Button>
    }
    <Button
      type={ButtonType.Primary}
      onClick={onClose}
    >
      Close
    </Button>
  </Row>;
}

// endregion
