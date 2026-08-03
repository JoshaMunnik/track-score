// region imports

import {AppRoute} from "../../../types/enums/AppRoute.ts";
import {DiceCatanRoute} from "../type/DiceCatanRoute.ts";
import {useDiceCatanStore} from "../store/useDiceCatanStore.ts";
import {DiceCatanButtons} from "./DiceCatanButtons.tsx";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {Size} from "../../../types/enums/ui/Size.ts";
import {DiceCatanInfo} from "./DiceCatanInfo.tsx";
import {CatanDice} from "./CatanDice.tsx";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {GamePage} from "../../../components/page/GamePage.tsx";

// endregion

// region exports

export function DiceCatanHomePage() {
  const {
    moveBarbarianShip,
    rollDice,
    resetGame,
  } = useDiceCatanStore();
  return (
    <GamePage
      title={"Dice Catan"}
      backPath={AppRoute.Home}
      settingsPath={DiceCatanRoute.Settings}
      type={PageType.Padding}
      gameStore={useDiceCatanStore}
    >
      <Column gap={Spacing.Normal} width={Size.Full}>
        <CatanDice/>
        <DiceCatanButtons
          onRoll={rollDice}
          onMoveBarbarians={moveBarbarianShip}
          onRestart={resetGame}
        />
        <DiceCatanInfo/>
      </Column>
    </GamePage>
  )
}

// endregion