// region imports

import {Page} from "../../../components/page/Page.tsx";
import {PlayersForm} from "../../../components/form/PlayersForm/PlayersForm.tsx";
import {useNavigate} from "react-router";
import {updateGameSession} from "../../../tools/mainTools.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {useTichuStore} from "../store/useTichuStore.ts";
import {TichuRoute} from "../type/TichuRoute.ts";
import type {TichuPlayerModel} from "../models/TichuPlayerModel.ts";

// endregion

// region exports

export function TichuPlayersPage() {
  const {
    start
  } = useTichuStore();
  const navigate = useNavigate();

  function handleStart() {
    start();
    updateGameSession(useTichuStore);
    navigate(TichuRoute.Home);
  }

  function createPlayer(name: string): TichuPlayerModel {
    return {name, first: false};
  }

  return (
    <Page
      title="Tichu Players"
      backPath={TichuRoute.Home}
      type={PageType.Paper}
    >
      <PlayersForm
        store={useTichuStore}
        playerFactory={createPlayer}
        minPlayerCount={4}
        maxPlayerCount={4}
        teams={true}
        teamCount={2}
        showFirst={false}
        toClose={TichuRoute.Home}
        onRestart={handleStart}
        onStart={handleStart}
      />
    </Page>
  )
}

// endregion
