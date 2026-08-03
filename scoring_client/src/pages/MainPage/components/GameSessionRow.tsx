// region imports

import type {GameSessionModel} from "../../../types/models/GameSessionModel.ts";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {Button} from "../../../components/styled/button/Button.tsx";
import {SectionTitle} from "../../../components/styled/text/SectionTitle.tsx";
import {getGameModule} from "../../../tools/mainTools.ts";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {formatDate} from "../../../tools/textTools.ts";
import {DistributeContent} from "../../../types/enums/ui/DistributeContent.ts";
import {IconButton} from "../../../components/styled/button/IconButton.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import {RiDeleteBin2Line} from "react-icons/ri";
import {Color} from "../../../types/enums/ui/Color.ts";
import {BorderRadius} from "../../../types/enums/ui/BorderRadius.ts";
import {SmallText} from "../../../components/styled/text/SmallText.tsx";
import {Container} from "../../../components/styled/layout/Container.tsx";

// endregion

// region local

type GameSessionRowProps = Readonly<{
  session: GameSessionModel;
  onSelect: () => void;
  onDelete: () => void;
}>;

// endregion

// region exports

export function GameSessionRow({session, onSelect, onDelete}: GameSessionRowProps) {
  const gameModule = getGameModule(session.type);
  // if game no longer is supported, return empty row
  if (gameModule === null) {
    return null;
  }
  return (
    <Row
      width={Size.Full}
      gap={Spacing.Tiny}
      alignCrossAxis={AlignItem.Stretch}
    >
      <Container flex={1}>
        <Button onClick={onSelect} width={Size.Full} type={ButtonType.Content}>
          <Column
            backgroundColor={Color.Default}
            width={Size.Full}
            verticalPadding={Spacing.Small}
            horizontalPadding={Spacing.Normal}
            borderRadius={BorderRadius.Small}
            gap={Spacing.Tiny}
          >
            <Row
              gap={Spacing.Tiny}
              distributeMainAxis={DistributeContent.SpaceBetween}
              alignCrossAxis={AlignItem.Center}
              width={Size.Full}
            >
              <SectionTitle>{gameModule.name}</SectionTitle>
              <NormalText>{formatDate(new Date(session.date))}</NormalText>
            </Row>
            <SmallText>{session.summary}</SmallText>
          </Column>
        </Button>
      </Container>
      <IconButton onClick={onDelete} type={ButtonType.Danger}>
        <RiDeleteBin2Line/>
      </IconButton>
    </Row>
  )
}

// endregion