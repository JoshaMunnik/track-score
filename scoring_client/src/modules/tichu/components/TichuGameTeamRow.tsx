// region imports

import {useTichuStore} from "../store/useTichuStore.ts";
import {getPlayerName} from "../../../tools/playerTools.ts";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";

// endregion

// region props

type TichuGameTeamRowProps = Readonly<{
  winners: boolean[];
}>;

// endregion

// region exports

export function TichuGameTeamRow({winners}: TichuGameTeamRowProps) {
  const {players} = useTichuStore();

  function playerName(index: number): string {
    if (index >= players.length) {
      return '??';
    }
    return getPlayerName(players[index], players);
  }

  return (
    <>
      <GridItem borderRight borderBottom></GridItem>
      <GridItem
        borderRight
        borderBottom
        span={2}
        alternate={winners[0]}
      >
        <NormalText center>
          {playerName(0)} &amp; {playerName(2)}
        </NormalText>
      </GridItem>
      <GridItem
        borderBottom
        span={2}
        alternate={winners[1]}
      >
        <NormalText center>
          {playerName(1)} &amp; {playerName(3)}
        </NormalText>
      </GridItem>
    </>
  );
}

// endregion