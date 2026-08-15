// region imports

import {Page} from "../../../components/page/Page.tsx";
import {WizardRoute} from "../type/WizardRoute.ts";
import {PlayersForm} from "../../../components/form/PlayersForm/PlayersForm.tsx";
import {useWizardStore} from "../store/useWizardStore.ts";
import {UFArray} from "@ultraforce/ts-general-lib";
import {calcWizardScore, createWizardPlayer} from "../tools/wizardTools.ts";
import {useNavigate} from "react-router";
import {updateGameSession} from "../../../tools/mainTools.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import type {WizardPlayerModel} from "../models/WizardPlayerModel.ts";

// endregion

// region exports

export function WizardPlayersPage() {
  const {
    players, round, start
  } = useWizardStore();
  const navigate = useNavigate();
  const scores: number[] = players.map(player => calcWizardScore(player, round - 1));
  scores.sort((first, second) => first - second);
  const averageScore = Math.round(UFArray.sum(scores) / scores.length / 10) * 10;

  function handleStart() {
    start();
    updateGameSession(useWizardStore);
    navigate(WizardRoute.Home);
  }

  function createPlayer(name: string, score?: number): WizardPlayerModel {
    return createWizardPlayer(useWizardStore.getState(), name, score);
  }

  return (
    <Page
      title="Wizard Players"
      backPath={WizardRoute.Home}
      type={PageType.Paper}
    >
      <PlayersForm
        store={useWizardStore}
        playerFactory={createPlayer}
        minPlayerCount={3}
        maxPlayerCount={6}
        teams={false}
        showFirst={true}
        firstLabel="dealer"
        minScore={scores[0]}
        maxScore={scores[scores.length - 1]}
        stepCount={10}
        averageScore={averageScore}
        toClose={WizardRoute.Home}
        onRestart={handleStart}
        onStart={handleStart}
      />
    </Page>
  )
}

// endregion
