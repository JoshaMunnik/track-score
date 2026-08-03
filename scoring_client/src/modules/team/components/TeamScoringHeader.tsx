// region imports

import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {SmallText} from "../../../components/styled/text/SmallText.tsx";

// endregion

// region exports

export function TeamScoringHeader() {
  return <>
    <GridItem borderBottom>
      <SmallText>#</SmallText>
    </GridItem>
    <GridItem borderBottom>
      <SmallText>name</SmallText>
    </GridItem>
    <GridItem borderBottom>
      <SmallText>team</SmallText>
    </GridItem>
    <GridItem borderBottom>
      <SmallText center>score</SmallText>
    </GridItem>
  </>;
}

// endregion
