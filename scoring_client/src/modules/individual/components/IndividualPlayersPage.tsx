// region imports

import {Page} from "../../../components/page/Page.tsx";
import {PlayersForm} from "../../../components/form/PlayersForm/PlayersForm.tsx";
import {UFArray} from "@ultraforce/ts-general-lib";
import {useNavigate} from "react-router";
import {updateGameSession} from "../../../tools/mainTools.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {calcIndividualScore, createIndividualPlayer} from "../tools/individualTools.ts";
import {useIndividualStore} from "../store/useIndividualStore.ts";
import {IndividualRoute} from "../type/IndividualRoute.ts";
import type {IndividualPlayerModel} from "../models/IndividualPlayerModel.ts";

// endregion

// region exports

export function IndividualPlayersPage() {
  const {
    players, round, start, configuration
  } = useIndividualStore();
  const navigate = useNavigate();
  const scores: number[] = players.map(player => calcIndividualScore(player, round - 1));
  scores.sort((first, second) => first - second);
  const averageScore = Math.round(UFArray.sum(scores) / scores.length / 10) * 10;

  function handleStart() {
    start();
    updateGameSession(useIndividualStore);
    navigate(IndividualRoute.Home);
  }

  function createPlayer(name: string, score?: number): IndividualPlayerModel {
    return createIndividualPlayer(useIndividualStore.getState(), name, score);
  }

  return (
    <Page
      title="Individual Players"
      backPath={IndividualRoute.Home}
      type={PageType.Paper}
    >
      <PlayersForm
        store={useIndividualStore}
        playerFactory={createPlayer}
        minPlayerCount={configuration.minPlayerCount}
        maxPlayerCount={configuration.maxPlayerCount}
        teams={false}
        showFirst={configuration.trackDealer}
        firstLabel="dealer"
        minScore={scores[0]}
        maxScore={scores[scores.length - 1]}
        averageScore={averageScore}
        stepCount={configuration.useScoreInterval ? configuration.scoreInterval : 1}
        toClose={IndividualRoute.Home}
        onRestart={handleStart}
        onStart={handleStart}
      />
    </Page>
  )
}

// endregion
