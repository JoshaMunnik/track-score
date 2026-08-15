import {FaMinus, FaPlus} from 'react-icons/fa6';
import {IconButton} from "../button/IconButton.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import {InputField} from "./InputField.tsx";
import {Row} from "../layout/Row.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {InputType} from "../../../types/enums/ui/InputType.ts";

type NumberInputProps = Readonly<{
  value: number;
  onChange?: (value: number) => void;
  min: number;
  max: number;
  step: number;
  error?: boolean;
}>;

const DefaultNumberInputProps: NumberInputProps = {
  value: 0,
  min: Number.NEGATIVE_INFINITY,
  max: Number.POSITIVE_INFINITY,
  step: 1,
  error: false,
};

function clampValue(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function NumberField(props: Partial<NumberInputProps>) {
  const {value, onChange, min, max, step, error} = {...DefaultNumberInputProps, ...props};
  const canDecrease = value > min;
  const canIncrease = value < max;

  function updateValue(nextValue: number): void {
    onChange?.(clampValue(nextValue, min, max));
  }

  function onInputChange(nextValue: string): void {
    if (nextValue.trim().length === 0) {
      return;
    }
    const parsed = Number(nextValue);
    if (Number.isNaN(parsed)) {
      return;
    }
    updateValue(parsed);
  }

  return (
    <Row gap={Spacing.Tiny} alignCrossAxis={AlignItem.Stretch}>
      <IconButton
        type={ButtonType.Primary}
        disabled={!canDecrease}
        onClick={() => updateValue(value - step)}
      >
        <FaMinus aria-hidden="true"/>
      </IconButton>
      <InputField
        value={String(value)}
        type={InputType.Number}
        onChange={onInputChange}
        error={error}
      />
      <IconButton
        type={ButtonType.Primary}
        disabled={!canIncrease}
        onClick={() => updateValue(value + step)}
      >
        <FaPlus aria-hidden="true"/>
      </IconButton>
    </Row>
  )
}
