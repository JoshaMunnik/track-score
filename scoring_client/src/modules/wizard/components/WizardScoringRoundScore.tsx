// region imports

import {SpanText} from "../../../components/styled/text/SpanText.tsx";
import {Color} from "../../../types/enums/ui/Color.ts";

// endregion

// region local

type WizardScoringRoundScoreProps = Readonly<{
  bid: number,
  taken: number,
}>;

// endregion

// region exports

export function WizardScoringRoundScore({bid, taken}: WizardScoringRoundScoreProps) {
  if (bid === taken) {
    return <SpanText color={Color.Success}>+{20 + 10 * taken}</SpanText>;
  } else {
    return <SpanText color={Color.Danger}>-{10 * Math.abs(bid - taken)}</SpanText>
  }
}

// endregion
