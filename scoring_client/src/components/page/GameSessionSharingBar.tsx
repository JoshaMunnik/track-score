// region imports

import type {ZustandStore} from "../../types/store/ZustandStore.ts";
import type {SharableGameState} from "../../store/sharable/SharableGameStore.ts";
import {DistributeContent} from "../../types/enums/ui/DistributeContent.ts";
import {Color} from "../../types/enums/ui/Color.ts";
import {Spacing} from "../../types/enums/ui/Spacing.ts";
import {Row} from "../styled/layout/Row.tsx";
import {SectionTitle} from "../styled/text/SectionTitle.tsx";
import {IconButton} from "../styled/button/IconButton.tsx";
import {ButtonType} from "../../types/enums/ui/ButtonType.ts";
import {FaStop} from "react-icons/fa";
import {useShallow} from "zustand/react/shallow";
import {useMainStore} from "../../store/main/useMainStore.ts";
import {BiTransfer} from "react-icons/bi";
import {Size} from "../../types/enums/ui/Size.ts";
import {AlignItem} from "../../types/enums/ui/AlignItem.ts";

// endregion

// region local

type GameSessionSharingBarProps = Readonly<{
  /**
   * Store that represent the game being shared
   */
  sharableStore: ZustandStore<SharableGameState>;

  /**
   * User clicked on the stop sharing button.
   */
  onStopSharing?: () => void;

  /**
   * User clicked on the stop viewing button.
   */
  onStopViewing?: () => void;
}>;

// endregion

// region exports

/**
 * The bar shows a bar when the user is viewing or sharing a game. The bar contains a button
 * to stop viewing or sharing. There is also a transfer icon when the game data is being sent
 * or retrieved.
 */
export function GameSessionSharingBar(
  {sharableStore, onStopSharing, onStopViewing}: GameSessionSharingBarProps
) {
  const {shareCode, viewing} = sharableStore(useShallow(
    (state) => ({
      shareCode: state.shareCode,
      viewing: state.viewing
    })
  ));
  const {sendingGameSession, retrievingGameSession} = useMainStore(useShallow(
    (state) => ({
      sendingGameSession: state.sendingGameSession,
      retrievingGameSession: state.retrievingGameSession
    })
  ));
  if (shareCode.length === 0) {
    return null;
  }
  return (
    <Row
      distributeMainAxis={DistributeContent.SpaceBetween}
      alignCrossAxis={AlignItem.Center}
      backgroundColor={Color.Section}
      verticalPadding={Spacing.Small}
      horizontalPadding={Spacing.Small}
      width={Size.Full}
    >
      <SectionTitle>
        {viewing ? 'Viewing' : 'Sharing'} - {shareCode}
      </SectionTitle>
      <Row
        alignCrossAxis={AlignItem.Center}
        gap={Spacing.Normal}
      >
        {
          (sendingGameSession || retrievingGameSession) &&
          <BiTransfer />
        }
        {
          viewing && onStopViewing &&
          <IconButton onClick={onStopViewing} type={ButtonType.Danger}>
            <FaStop/>
          </IconButton>
        }
        {
          !viewing && onStopSharing &&
          <IconButton onClick={onStopSharing} type={ButtonType.Danger}>
            <FaStop/>
          </IconButton>
        }
      </Row>
    </Row>
  );
}

// endregion