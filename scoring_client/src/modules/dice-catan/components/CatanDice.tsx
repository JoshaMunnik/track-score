// region imports

import {useDiceCatanStore} from "../store/useDiceCatanStore.ts";
import {getCatanDieColor, isBarbarianShip} from "../tools/catanTools.ts";
import {CatanDieColor} from "../type/CatanDieColor.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {CatanDie} from "./CatanDie.tsx";
import {GiShoonerSailboat, GiVillage} from "react-icons/gi";
import {Size} from "../../../types/enums/ui/Size.ts";
import {DistributeContent} from "../../../types/enums/ui/DistributeContent.ts";

// endregion

// region exports

export function CatanDice() {
  const {trackBarbarians, rolls, active} = useDiceCatanStore();
  if (!active) {
    return null;
  }
  if (!trackBarbarians) {
    return (
      <Row gap={Spacing.Normal} width={Size.Full} distributeMainAxis={DistributeContent.Center}>
        <CatanDie>
          {rolls[0]}
        </CatanDie>
        <CatanDie>
          {rolls[1]}
        </CatanDie>
      </Row>
    );
  }
  const color = trackBarbarians ? getCatanDieColor(rolls[2]) : CatanDieColor.Black;
  const isShip = isBarbarianShip(rolls[2]);
  return (
    <Row gap={Spacing.Normal} width={Size.Full} distributeMainAxis={DistributeContent.Center}>
      <CatanDie>
        {rolls[0]}
      </CatanDie>
      <CatanDie color={color}>
        {rolls[1]}
      </CatanDie>
      <CatanDie color={color}>
        {
          isShip && <GiShoonerSailboat />
        }
        {
          !isShip && <GiVillage />
        }
      </CatanDie>
    </Row>
  );
}

// endregion