import * as React from "react";
import {Popup} from "../../../styled/popup/Popup.tsx";
import {Column} from "../../../styled/layout/Column.tsx";
import {Spacing} from "../../../../types/enums/ui/Spacing.ts";
import {NormalText} from "../../../styled/text/NormalText.tsx";
import {Button} from "../../../styled/button/Button.tsx";
import {Row} from "../../../styled/layout/Row.tsx";
import {PlayerNameField} from "../../PlayerNameField.tsx";
import {NumberField} from "../../../styled/form/NumberField.tsx";
import {ButtonType} from "../../../../types/enums/ui/ButtonType.ts";

type AddPlayerWithScorePopupProps = Readonly<{
  open: boolean;
  onClose: () => void;
  minScore?: number;
  maxScore?: number;
  averageScore?: number;
  stepCount?: number;
  onAddPlayer: (name: string, score: number) => void;
  onAddPlayerAndRestart: (name: string) => void;
}>;

export function AddPlayerWithScorePopup({
  open, 
  onClose,
  minScore,
  maxScore,
  averageScore,
  stepCount = 1,
  onAddPlayer,
  onAddPlayerAndRestart,
}: AddPlayerWithScorePopupProps) {
  const [name, setName] = React.useState('');
  const [score, setScore] = React.useState(0);
  const error = score % stepCount !== 0;
  return (
    <Popup
      onClose={onClose}
      open={open}
    >
      <Column
        gap={Spacing.Large}
        padding={Spacing.Normal}
      >
        <Column
          gap={Spacing.Normal}
        >
          <NormalText>
            Add a player to an active game.
          </NormalText>
          <Column>
            <NormalText>Name</NormalText>
            <PlayerNameField
              value={name}
              onChange={setName}
            />
          </Column>
          <Column gap={Spacing.Small}>
            <Column>
              <NormalText>Initial score</NormalText>
              <NumberField
                step={stepCount}
                value={score}
                onChange={setScore}
                error={error}
              />
            </Column>
            <Row gap={Spacing.Small}>
              {
                (minScore !== undefined) &&
                <Button onClick={() => setScore(minScore)}>
                  Lowest: {minScore}
                </Button>
              }
              {
                (averageScore !== undefined) &&
                <Button onClick={() => setScore(averageScore)}>
                  Average: {averageScore}
                </Button>
              }
              {
                (maxScore !== undefined) &&
                <Button onClick={() => setScore(maxScore)}>
                  Highest: {maxScore}
                </Button>
              }
            </Row>
          </Column>
        </Column>
        <Row gap={Spacing.Small}>
          <Button
            onClick={() => onAddPlayer(name, score)}
            disabled={error}
          >
            Add
          </Button>
          <Button
            onClick={() => onAddPlayerAndRestart(name)}
          >
            Add and restart
          </Button>
          <Button
            type={ButtonType.Secondary}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Row>
      </Column>
    </Popup>
  );
}