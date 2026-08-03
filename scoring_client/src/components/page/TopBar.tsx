// region imports

import {Row} from "../styled/layout/Row.tsx";
import {DistributeContent} from "../../types/enums/ui/DistributeContent.ts";
import {Spacing} from "../../types/enums/ui/Spacing.ts";
import {IconButton} from "../styled/button/IconButton.tsx";
import {IoArrowBack, IoSettingsSharp} from "react-icons/io5";
import {ImQrcode} from "react-icons/im";
import {FaInfo, FaUsers} from "react-icons/fa";
import {Color} from "../../types/enums/ui/Color.ts";
import {AlignItem} from "../../types/enums/ui/AlignItem.ts";
import {Title} from "../styled/text/Title.tsx";
import type {ZustandStore} from "../../types/store/ZustandStore.ts";
import {Column} from "../styled/layout/Column.tsx";
import {GameSessionSharingBar} from "./GameSessionSharingBar.tsx";
import {gameSessionService} from "../../services/gameSessionService.ts";
import {useNavigate} from "react-router";
import {Size} from "../../types/enums/ui/Size.ts";
import {useMainStore} from "../../store/main/useMainStore.ts";
import {useEffect} from "react";
import {config} from "../../config.ts";
import type {SharableGameStore} from "../../store/sharable/SharableGameStore.ts";

// endregion

// region local

function buildTitle(title: string, webTitle?: string): string {
  switch(webTitle) {
    case undefined:
      return config.titlePrefix + ' | ' + title;
    case '':
      return config.titlePrefix;
    default:
      return config.titlePrefix + ' | ' + webTitle;
  }
}

// endregion

// region exports

export type TopBarProps = Readonly<{
  /**
   * When set, show a back button and call {@link onBack} when clicked.
   * If {@link sharableStore} is also set and the store is in viewing mode,
   * call {@link gameSessionService.stopTracking}.
   */
  onBack?: () => void;

  /**
   * When set, show a back button and use the router's link to navigate to the path.
   * If {@link sharableStore} is also set and the store is in viewing mode,
   * call {@link gameSessionService.stopTracking}.
   */
  backPath?: string;

  /**
   * When set, show a players button
   */
  onPlayers?: () => void;

  /**
   * When set, show a players button
   */
  playersPath?: string;

  /**
   * When set, show a settings button
   */
  onSettings?: () => void;

  /**
   * When set, show a settings button
   */
  settingsPath?: string;

  /**
   * When set, show an info button
   */
  onInfo?: () => void;

  /**
   * When set, show an info button
   */
  infoPath?: string;

  /**
   * Title of page
   */
  title: string;

  /**
   * When set, sets the HTML page title to this value prefixed with {@link config.titlePrefix}.
   * If the value is an empty string, only the prefix is shown.
   * When not set, the renderer uses the value of {@link title} to set the HTML page
   * title (still using the same prefix).
   */
  webTitle?: string;

  /**
   * When set, show a second bar with information about the sharing state. Show also a QR code
   * button when the store is in a sharing state (not viewing).
   */
  sharableStore?: ZustandStore<SharableGameStore>;

  /**
   * When set, show a QR code button and navigate to the set path.
   */
  qrCodePath?: string;
}>;

/**
 * Renders a bar with a back button, title, and some other action buttons on the right.
 */
export function TopBar({
  onBack, backPath, onPlayers, playersPath, onSettings, settingsPath, onInfo, infoPath, title,
  sharableStore, qrCodePath, webTitle
}: TopBarProps) {
  const navigate = useNavigate();
  useEffect(
    () => {
      document.title = buildTitle(title, webTitle);
    },
    [title, webTitle]
  )

  function handleBack() {
    if (sharableStore) {
      if (sharableStore.getState().viewing) {
        gameSessionService.stopTracking(sharableStore.getState().shareCode);
      }
      sharableStore.getState().stopSharing();
    }
    if (onBack) {
      onBack();
    } else if (backPath) {
      navigate(backPath);
    }
  }

  function handleQrCode() {
    // this function can only be called when sharableStore is not null (else button is now shown)
    useMainStore.getState().showGetQrCode(sharableStore!);
  }

  return (
    <Column width={Size.Full} shadowBottom>
      <Row
        distributeMainAxis={DistributeContent.SpaceBetween}
        alignCrossAxis={AlignItem.Center}
        backgroundColor={Color.Default}
        verticalPadding={Spacing.Small}
        horizontalPadding={Spacing.Small}
        width={Size.Full}
      >
        <Row
          gap={Spacing.Small}
          alignCrossAxis={AlignItem.Center}
          height={Size.Full}
        >
          {
            (onBack || backPath) &&
            <IconButton onClick={handleBack}>
              <IoArrowBack/>
            </IconButton>
          }
          <Title>{title}</Title>
        </Row>
        <Row
          gap={Spacing.Tiny}
        >
          {
            (sharableStore && !sharableStore.getState().viewing) &&
            <IconButton onClick={handleQrCode}>
              <ImQrcode/>
            </IconButton>
          }
          {
            qrCodePath &&
            <IconButton to={qrCodePath}>
              <ImQrcode/>
            </IconButton>
          }
          {
            (onPlayers || playersPath) &&
            <IconButton onClick={onPlayers} to={playersPath}>
              <FaUsers/>
            </IconButton>
          }
          {
            (onInfo || infoPath) &&
            <IconButton onClick={onInfo} to={infoPath}>
              <FaInfo/>
            </IconButton>
          }
          {
            (onSettings || settingsPath) &&
            <IconButton onClick={onSettings} to={settingsPath}>
              <IoSettingsSharp/>
            </IconButton>
          }
        </Row>
      </Row>
      {
        sharableStore &&
        <GameSessionSharingBar
          sharableStore={sharableStore}
          onStopSharing={() => {
            sharableStore.getState().stopSharing();
          }}
          onStopViewing={() => {
            gameSessionService.stopTracking(sharableStore.getState().shareCode);
            sharableStore.getState().stopSharing();
          }}
        />
      }
    </Column>
  )
}

// endregion