import {SmallText} from "./SmallText.tsx";

type RowIndexProps = {
  index: number;
}

export function RowIndex({index}: RowIndexProps) {
  return (
    <SmallText>
      {index}.&nbsp;
    </SmallText>
  );
}