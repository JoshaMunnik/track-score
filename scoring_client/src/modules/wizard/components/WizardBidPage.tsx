// region imports

import type {WizardPlayerModel} from "../models/WizardPlayerModel.ts";
import {getPlayerName, getPlayersWithDealerLast} from "../../../tools/playerTools.ts";
import {calcWizardScore} from "../tools/wizardTools.ts";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {TbCards} from "react-icons/tb";
import {NumberField} from "../../../components/styled/form/NumberField.tsx";
import {Button} from "../../../components/styled/button/Button.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {WizardRoute} from "../type/WizardRoute.ts";
import {useWizardStore} from "../store/useWizardStore.ts";
import {useNavigate} from "react-router";
import {SmallText} from "../../../components/styled/text/SmallText.tsx";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {Size} from "../../../types/enums/ui/Size.ts";
import {RowIndex} from "../../../components/styled/text/RowIndex.tsx";
import {Color} from "../../../types/enums/ui/Color.ts";
import {updateGameSession} from "../../../tools/mainTools.ts";
import {useWizardSharableStore} from "../store/useWizardSharableStore.ts";
import {Page} from "../../../components/page/Page.tsx";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import React from "react";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";

// endregion

// region exports

/**
 * {@link WizardBidPage} shows a popup that can be used to enter bids for every player.
 */
export function WizardBidPage() {
  const {
    startScoring,
    players,
    round,
    setBid,
    checkTotalBids,
    checkTotalBidsCount
  } = useWizardStore();
  const navigate = useNavigate();
  const sortedPlayers = getPlayersWithDealerLast(players, round);
  const cardCount = round + 1;
  const scores: number[] = [];
  const hasScore = round > 0;
  let totalBids = 0;
  let maxScore = 0;
  sortedPlayers.forEach(player => {
    const score = hasScore ? calcWizardScore(player, round - 1) : 0;
    scores.push(score);
    totalBids += player.rounds[round].bid;
    maxScore = Math.max(score, maxScore);
  });
  const bidsLeft = Math.max(0, cardCount - totalBids);
  const dealer = sortedPlayers[sortedPlayers.length - 1];
  const validateBidCount = checkTotalBids && (round + 1 >= checkTotalBidsCount);
  const error = (totalBids === cardCount) && validateBidCount;

  /**
   * Handles user clicking play.
   */
  function handleDone() {
    startScoring();
    updateGameSession(useWizardStore, useWizardSharableStore);
    navigate(WizardRoute.Home)
  }

  /**
   * Handles changes to bid value.
   *
   * @param player
   *   Player to update bid value for
   * @param bid
   *   New bid value
   */
  function handleBidChange(player: WizardPlayerModel, bid: number) {
    setBid(players.indexOf(player), Math.max(0, bid));
  }

  /**
   * Creates the html
   *
   * @returns html formatted data
   */
  return (
    <Page
      title={`Wizard - Round ${round + 1} of ${60 / sortedPlayers.length} - Bidding`}
      backPath={WizardRoute.Home}
      type={PageType.Paper}
    >
      <Column gap={Spacing.Normal} width={Size.Full}>
        <Grid templateColumns="auto 1fr auto">
          <GridItem borderBottom>
            <SmallText>#</SmallText>
          </GridItem>
          <GridItem borderBottom>
            <SmallText>name</SmallText>
          </GridItem>
          <GridItem borderBottom>
            <SmallText center>bid</SmallText>
          </GridItem>
          {sortedPlayers.map((player, index) => (
            <React.Fragment key={index}>
              <GridItem
                horizontalAlign={AlignItem.End}
                verticalAlign={AlignItem.Center}
                alternate={index % 2 === 1}
              >
                <RowIndex index={index + 1}/>
              </GridItem>
              <GridItem
                alternate={index % 2 === 1}
              >
                <Column>
                  <NormalText>
                    {(dealer === player) &&
                      <TbCards/>}{getPlayerName(player, players.indexOf(player))}
                  </NormalText>
                  <SmallText>
                    score: {scores[index]}{scores[index] < maxScore ? ` (${scores[index] - maxScore}, ${Math.max(0, (maxScore - scores[index] - 10) / 10)})` : ''}
                  </SmallText>
                </Column>
              </GridItem>
              <GridItem
                alternate={index % 2 === 1}
                verticalAlign={AlignItem.Center}
              >
                <NumberField
                  onChange={(value) => handleBidChange(player, value)}
                  min={0}
                  max={cardCount}
                  value={player.rounds[round].bid}
                  error={(dealer === player) && error}
                />
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>
        <NormalText>
          Cards: {cardCount}, total bids: {totalBids}, bids left: <strong>{bidsLeft}</strong>
        </NormalText>
        {
          error &&
          <NormalText color={Color.Danger}>
            <em>{dealer.name}</em> can not bid {dealer.rounds[round].bid}
          </NormalText>
        }
        <Row gap={Spacing.Small}>
          <Button
            type={ButtonType.Success}
            onClick={handleDone}
            disabled={error}
          >
            Play
          </Button>
          <Button
            type={ButtonType.Primary}
            to={WizardRoute.Home}
          >
            Close
          </Button>
        </Row>
      </Column>
    </Page>
  );
}

// endregion
