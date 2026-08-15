// region imports

import {useTichuStore} from "../store/useTichuStore.ts";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {Button} from "../../../components/styled/button/Button.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {updateGameSession} from "../../../tools/mainTools.ts";
import {useTichuSharableStore} from "../store/useTichuSharableStore.ts";
import {useNavigate} from "react-router";
import {TichuRoute} from "../type/TichuRoute.ts";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {getPlayerName} from "../../../tools/playerTools.ts";
import {GamePage} from "../../../components/page/GamePage.tsx";
import {TichuScoringTeamForm} from "./TichuScoringTeamForm.tsx";

// endregion

// region exports

export function TichuScoringPage() {
  const {
    players,
    rounds,
    firstTeam,
    secondTeam,
    updateFirstTeam,
    updateSecondTeam,
    addRound
  } = useTichuStore();
  const navigate = useNavigate();

  function handleNextRound() {
    addRound({teams: [firstTeam, secondTeam]});
    updateGameSession(useTichuStore, useTichuSharableStore);
    navigate(TichuRoute.Home);
  }

  return (
    <GamePage
      title={`Tichu - round ${rounds.length + 1} - scoring`}
      type={PageType.Paper}
      backPath={TichuRoute.Home}
      gameStore={useTichuStore}
    >
      <Column gap={Spacing.Small} width={Size.Full}>
        <Grid templateColumns="1fr auto 3rem" form>
          <TichuScoringTeamForm
            names={getPlayerName(players[0], players) + ' & ' + getPlayerName(players[2], players)}
            team={firstTeam}
            otherTeam={secondTeam}
            borderTop={false}
            update={updateFirstTeam}
          />
          <TichuScoringTeamForm
            names={getPlayerName(players[1], players) + ' & ' + getPlayerName(players[3], players)}
            team={secondTeam}
            otherTeam={firstTeam}
            borderTop={true}
            update={updateSecondTeam}
          />
        </Grid>
        <Row gap={Spacing.Normal}>
          <Button
            onClick={handleNextRound}
            type={ButtonType.Success}
          >
            Next round
          </Button>
          <Button to={TichuRoute.Home} type={ButtonType.Primary}>
            Close
          </Button>
        </Row>
      </Column>
    </GamePage>
  )
}

// endregion