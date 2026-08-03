// region imports

import {Row} from "../../../components/styled/layout/Row.tsx";
import {DistributeContent} from "../../../types/enums/ui/DistributeContent.ts";
import {Button} from "../../../components/styled/button/Button.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {Size} from "../../../types/enums/ui/Size.ts";
import {MainList} from "./MainList.ts";
import { Container } from "../../../components/styled/layout/Container.tsx";

// endregion

// region local

type MainListButtonsProps = Readonly<{
  selected: MainList;
  onSelected: (value: MainList) => void;
}>;

// endregion

// region exports

export function MainListSelectionButtons(
  {selected = MainList.New, onSelected}: MainListButtonsProps
) {
  return (
    <Row
      distributeMainAxis={DistributeContent.SpaceBetween}
      gap={Spacing.Normal}
    >
      <Container flex={1}>
        <Button
          width={Size.Full}
          type={selected === MainList.New ? ButtonType.Selected : ButtonType.Primary}
          onClick={() => onSelected(MainList.New)}
        >
          New
        </Button>
      </Container>
      <Container flex={1}>
        <Button
          width={Size.Full}
          type={selected === MainList.Continue ? ButtonType.Selected : ButtonType.Primary}
          onClick={() => onSelected(MainList.Continue)}
        >
          Continue
        </Button>
      </Container>
      <Container flex={1}>
        <Button
          width={Size.Full}
          type={selected === MainList.Finished ? ButtonType.Selected : ButtonType.Primary}
          onClick={() => onSelected(MainList.Finished)}
        >
          Finished
        </Button>
      </Container>
    </Row>
  )
}

// endregion