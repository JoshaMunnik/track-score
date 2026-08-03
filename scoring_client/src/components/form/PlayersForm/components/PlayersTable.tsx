import type {PlayerModel} from "../../../../types/models/PlayerModel.ts";
import * as React from "react";
import {GridItem} from "../../../styled/grid/GridItem.tsx";
import {Grid} from "../../../styled/grid/Grid.tsx";
import {SmallText} from "../../../styled/text/SmallText.tsx";
import {PlayerRow} from "./PlayerRow.tsx";

type PlayersTableProps<T extends PlayerModel> = Readonly<{
  players: T[];
  showFirst: boolean;
  firstLabel?: string;
  teams: boolean;
  teamCount?: number;
  onSwapPlayers: (index1: number, index2: number) => void;
  onRemovePlayer: (index: number) => void;
  onSelectFirstPlayer: (index: number) => void;
  onInputRef: (index: number, reference: HTMLInputElement) => void;
  onKeyPress: (index: number, event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeName: (index: number, name: string) => void;
  focusIndex: number;
}>;

export function PlayersTable<T extends PlayerModel>({
  players,
  showFirst,
  firstLabel,
  teams,
  teamCount = 1,
  onSwapPlayers,
  onRemovePlayer,
  onSelectFirstPlayer,
  onInputRef,
  onKeyPress,
  onChangeName,
  focusIndex,
}: PlayersTableProps<T>) {
  return (
    <Grid templateColumns={showFirst ? "1.2rem 1fr auto auto" : "auto 1fr 1rem auto"}>
      <GridItem borderBottom>
        <SmallText right>#</SmallText>
      </GridItem>
      <GridItem borderBottom>
        <SmallText>name</SmallText>
      </GridItem>
      <GridItem borderBottom>
        {showFirst && <SmallText>{firstLabel || 'first'}</SmallText>}
      </GridItem>
      <GridItem borderBottom></GridItem>
      {players.map((player: T, index: number) => (
        <PlayerRow
          key={index}
          player={player}
          index={index}
          showFirst={showFirst}
          teams={teams}
          teamCount={teamCount}
          players={players}
          onSwapPlayers={onSwapPlayers}
          onRemovePlayer={onRemovePlayer}
          onSelectFirstPlayer={onSelectFirstPlayer}
          onInputRef={onInputRef}
          onKeyPress={onKeyPress}
          onChangeName={onChangeName}
          autoFocus={index === focusIndex}
        />
      ))}
    </Grid>
  );
}
