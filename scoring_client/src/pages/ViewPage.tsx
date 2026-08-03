// region imports

import {Paper} from "../components/page/Paper.tsx";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {Column} from "../components/styled/layout/Column.tsx";
import {NormalText} from "../components/styled/text/NormalText.tsx";
import {Color} from "../types/enums/ui/Color.ts";
import {AppRoute} from "../types/enums/AppRoute.ts";
import {Button} from "../components/styled/button/Button.tsx";
import {SectionTitle} from "../components/styled/text/SectionTitle.tsx";
import {useAsync} from "../hooks/useAsync.ts";
import {apiService} from "../services/apiService.ts";
import type {LocationStateModel} from "../types/models/LocationStateModel.ts";
import {getGameModule} from "../tools/mainTools.ts";
import {Size} from "../types/enums/ui/Size.ts";
import {AlignItem} from "../types/enums/ui/AlignItem.ts";
import {DistributeContent} from "../types/enums/ui/DistributeContent.ts";
import {Container} from "../components/styled/layout/Container.tsx";
import {Spacing} from "../types/enums/ui/Spacing.ts";
import {config} from "../config.ts";

// endregion

// region exports

/**
 * This page expects a code parameter. Where there is one, the page will try to get the game
 * session data and navigate to the correct game.
 */
export function ViewPage() {
  const {code} = useParams<{ code: string }>();
  const [errorMessage, setErrorMessage] = useState(code ? '' : 'Missing share code.');
  const navigate = useNavigate();
  useEffect(
    () => {
      document.title = config.titlePrefix + ' | processing code...';
    },
    []
  );
  useAsync(async () => {
    if (!code || (code.length === 0)) {
      return;
    }
    const session = await apiService.getGameSession(code);
    if (session === false) {
      setErrorMessage('Can not find any game for ' + code);
      return;
    }
    const gameModule = getGameModule(session.type);
    if (gameModule === null) {
      setErrorMessage('Unknown game type: ' + session.type);
      return;
    }
    const locationState: LocationStateModel = {
      shareCode: code,
      data: session.data,
      sequence: session.sequence
    };
    navigate(
      gameModule.homePath,
      {
        state: locationState
      }
    );
  });

  return (
    <Container
      height={Size.Full}
      width={Size.Full}
      padding={Spacing.Normal}
    >
      <Paper>
        {
          (errorMessage.length > 0) &&
          <Column
            height={Size.Full}
            width={Size.Full}
            alignCrossAxis={AlignItem.Center}
            distributeMainAxis={DistributeContent.Center}
            gap={Spacing.Normal}
          >
            <NormalText color={Color.Danger}>
              {errorMessage}
            </NormalText>
            <Button to={AppRoute.Home}>
              Home
            </Button>
          </Column>
        }
        {
          (errorMessage.length === 0) &&
          <Column
            height={Size.Full}
            width={Size.Full}
            alignCrossAxis={AlignItem.Center}
            distributeMainAxis={DistributeContent.Center}
          >
            <NormalText>Getting game for:</NormalText>
            <SectionTitle>{code}</SectionTitle>
          </Column>
        }
      </Paper>
    </Container>
  );
}

// endregion