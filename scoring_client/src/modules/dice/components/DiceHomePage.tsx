// region imports

import {AppRoute} from "../../../types/enums/AppRoute.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {DiceRoute} from "../type/DiceRoute.ts";
import {useDiceStore} from "../store/useDiceStore.ts";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {Button} from "../../../components/styled/button/Button.tsx";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {DistributeContent} from "../../../types/enums/ui/DistributeContent.ts";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {Die} from "./Die.tsx";
import {UFArray} from "@ultraforce/ts-general-lib";
import {Paper} from "../../../components/page/Paper.tsx";
import {Dice} from "./Dice.tsx";
import {GamePage} from "../../../components/page/GamePage.tsx";

// endregion

// region exports

export function DiceHomePage() {
  const {
    active,
    rolls,
    preRolls,
    configuration,
    rollDice,
    resetGame,
  } = useDiceStore();
  return (
    <GamePage
      title={"Dice"}
      backPath={AppRoute.Home}
      settingsPath={DiceRoute.Settings}
      type={PageType.Padding}
      gameStore={useDiceStore}
    >
      <Column alignCrossAxis={AlignItem.Center}>
        {
          !active &&
          <Row distributeMainAxis={DistributeContent.Center} width={Size.Full}>
            <Button onClick={rollDice}>Start</Button>
          </Row>
        }
        {
          active &&
          <Column gap={Spacing.Normal} width={Size.Full} alignCrossAxis={AlignItem.Center}>
            <Row
              gap={Spacing.Normal}
              alignCrossAxis={AlignItem.Center}
              width={Size.Full}
              distributeMainAxis={DistributeContent.Center}
            >
              <Dice
              >
                {rolls.map((roll, index) => (
                  <Die label={`die ${index + 1}`} key={index}>{roll}</Die>
                ))}
              </Dice>
              {
                configuration.showTotal && (configuration.diceCount > 1) &&
                <Die label="total">
                  {UFArray.sum(rolls)}
                </Die>
              }
            </Row>
            <Row
              distributeMainAxis={DistributeContent.Center}
              width={Size.Full}
              gap={Spacing.Normal}
            >
              <Button onClick={rollDice}>Roll</Button>
              <Button onClick={resetGame}>Stop</Button>
            </Row>
            {
              configuration.useGroups &&
              <Paper>
                Fair mode active, rolls left: {preRolls.length}
              </Paper>
            }
          </Column>
        }
      </Column>
    </GamePage>
  )
}

// endregion