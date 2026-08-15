// region imports

import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {SmallText} from "../../../components/styled/text/SmallText.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";

// endregion

// region exports

export function IndividualScoringHeader() {
  return <>
    <GridItem borderBottom>
      <SmallText>#</SmallText>
    </GridItem>
    <GridItem borderBottom>
      <SmallText>name</SmallText>
    </GridItem>
    <GridItem borderBottom>
      <SmallText>current</SmallText>
    </GridItem>
    <GridItem borderBottom>
    </GridItem>
    <GridItem horizontalAlign={AlignItem.Center} borderBottom>
      <SmallText>score</SmallText>
    </GridItem>
  </>;
}

// endregion