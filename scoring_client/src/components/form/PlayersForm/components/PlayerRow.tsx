import type {PlayerModel} from "../../../../types/models/PlayerModel.ts";
import * as React from "react";
import {GridItem} from "../../../styled/grid/GridItem.tsx";
import {RadioField} from "../../../styled/form/RadioField.tsx";
import {Spacing} from "../../../../types/enums/ui/Spacing.ts";
import {IconButton} from "../../../styled/button/IconButton.tsx";
import {Row} from "../../../styled/layout/Row.tsx";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {ButtonType} from "../../../../types/enums/ui/ButtonType.ts";
import {RiDeleteBin2Line} from "react-icons/ri";
import {Column} from "../../../styled/layout/Column.tsx";
import {SmallText} from "../../../styled/text/SmallText.tsx";
import {PlayerNameField} from "../../PlayerNameField.tsx";
import {RowIndex} from "../../../styled/text/RowIndex.tsx";
import {AlignItem} from "../../../../types/enums/ui/AlignItem.ts";

type PlayerRowProps<T extends PlayerModel> = Readonly<{
  player: T;
  index: number;
  showFirst: boolean;
  teams: boolean;
  teamCount?: number;
  players: T[];
  onSwapPlayers: (index1: number, index2: number) => void;
  onRemovePlayer: (index: number) => void;
  onSelectFirstPlayer: (index: number) => void;
  autoFocus: boolean;
  onInputRef: (index: number, reference: HTMLInputElement) => void;
  onKeyPress: (index: number, event:  React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeName: (index: number, name: string) => void;
}>;

export function PlayerRow<T extends PlayerModel>({ 
  player, 
  index, 
  showFirst, 
  teams,
  teamCount = 1,
  players,
  onSwapPlayers,
  onRemovePlayer,
  onSelectFirstPlayer,
  autoFocus,
  onInputRef,
  onKeyPress,
  onChangeName,
}: PlayerRowProps<T>) {
  return (
    <React.Fragment key={index}>
      <GridItem
        horizontalAlign={AlignItem.End}
        verticalAlign={AlignItem.Center}
        horizontalPadding={Spacing.None}
        alternate={index % 2 === 1}
      >
        <RowIndex index={index + 1}/>
      </GridItem>
      <GridItem
        alternate={index % 2 === 1}
      >
        <Column gap={Spacing.Tiny}>
          {
            teams && <SmallText>team {1 + (index % teamCount)}</SmallText>
          }
          <PlayerNameField
            value={player.name}
            onChange={(value) => onChangeName(index, value)}
            autoFocus={autoFocus}
            onInputRef={(reference) => onInputRef(index, reference)}
            onKeyPress={(event) => onKeyPress(index, event)}
          />
        </Column>
      </GridItem>
      <GridItem
        horizontalAlign={AlignItem.Center}
        verticalAlign={AlignItem.Center}
        alternate={index % 2 === 1}
      >
        {
          showFirst &&
          <RadioField
            name="first"
            checked={player.first}
            onChanged={
              () => onSelectFirstPlayer(index)
            }
          />
        }
      </GridItem>
      <GridItem
        verticalAlign={AlignItem.End}
        alternate={index % 2 === 1}
        horizontalPadding={Spacing.None}
      >
        <Row gap={Spacing.Button}>
          <IconButton
            disabled={index === 0}
            onClick={
              () => onSwapPlayers(index, index - 1)
            }
          >
            <FaAngleUp/>
          </IconButton>
          <IconButton
            disabled={index === players.length - 1}
            onClick={
              () => onSwapPlayers(index, index + 1)
            }
          >
            <FaAngleDown/>
          </IconButton>
          <IconButton
            type={ButtonType.Danger}
            onClick={
              () => onRemovePlayer(index)
            }
          >
            <RiDeleteBin2Line/>
          </IconButton>
        </Row>
      </GridItem>
    </React.Fragment>
  );
}