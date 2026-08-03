// region imports

import {Page} from "../../../components/page/Page.tsx";
import {PlayersForm} from "../../../components/form/PlayersForm/PlayersForm.tsx";
import {useNavigate} from "react-router";
import {updateGameSession} from "../../../tools/mainTools.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {useTeamStore} from "../store/useTeamStore.ts";
import {TeamRoute} from "../type/TeamRoute.ts";
import type {TeamPlayerModel} from "../models/TeamPlayerModel.ts";
import {createTeamPlayer} from "../tools/teamTools.ts";

// endregion

// region exports

export function TeamPlayersPage() {
  const {
    start, configuration
  } = useTeamStore();
  const navigate = useNavigate();
  const playerCount = configuration.playerCount * configuration.teamCount;

  function handleStart() {
    start();
    updateGameSession(useTeamStore);
    navigate(TeamRoute.Home);
  }

  function createPlayer(name: string, score?: number): TeamPlayerModel {
    return createTeamPlayer(useTeamStore.getState(), name, score);
  }

  return (
    <Page
      title="Team Players"
      backPath={TeamRoute.Home}
      type={PageType.Paper}
    >
      <PlayersForm
        store={useTeamStore}
        playerFactory={createPlayer}
        minPlayerCount={playerCount}
        maxPlayerCount={playerCount}
        teams={true}
        teamCount={configuration.teamCount}
        showFirst={true}
        firstLabel="dealer"
        toClose={TeamRoute.Home}
        onRestart={handleStart}
        onStart={handleStart}
      />
    </Page>
  )
}

// endregion
