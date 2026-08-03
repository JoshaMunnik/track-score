// region imports

import {useAsync} from "../hooks/useAsync.ts";
import {apiService} from "../services/apiService.ts";
import {Popup} from "../components/styled/popup/Popup.tsx";
import {Paper} from "../components/page/Paper.tsx";
import {NormalText} from "../components/styled/text/NormalText.tsx";
import {Color} from "../types/enums/ui/Color.ts";
import {Column} from "../components/styled/layout/Column.tsx";
import {QRCodeImage} from "../components/styled/image/QRCodeImage.tsx";
import {SectionTitle} from "../components/styled/text/SectionTitle.tsx";
import {useMainStore} from "../store/main/useMainStore.ts";
import {useShallow} from "zustand/react/shallow";
import {AppRoute} from "../types/enums/AppRoute.ts";
import {AlignItem} from "../types/enums/ui/AlignItem.ts";
import {Size} from "../types/enums/ui/Size.ts";
import {getClientBaseUrl} from "../tools/netTools.ts";

// endregion

// region exports

export function QrCodePopup() {
  const {getQrCodeVisible, sharableStore, hideGetQrCode} = useMainStore(useShallow(
    (state) => ({
      getQrCodeVisible: state.getQrCodeVisible,
      sharableStore: state.sharableGameStore,
      hideGetQrCode: state.hideGetQrCode,
    })
  ));
  const {data, calling, error} = useAsync<string>(async () => {
    if (!getQrCodeVisible || (sharableStore === null)) {
      return '';
    }
    if (sharableStore.getState().shareCode.length > 0) {
      return sharableStore.getState().shareCode;
    }
    const code = await apiService.getShareCode(
      sharableStore.getState().getGameStore().getState().getType(),
      sharableStore.getState().getGameStore().getState().getData()
    );
    sharableStore.getState().setShareCode(code);
    return code;
  }, [getQrCodeVisible]);
  const clientUrl = getClientBaseUrl() +
    AppRoute.View.substring(1).replace(':code', data || '');

  function renderContent() {
    if (error !== null) {
      return (
        <NormalText color={Color.Danger}>
          Error getting code from server: {error}
        </NormalText>
      );
    }
    if (calling) {
      return (
        <NormalText>
          Getting code from server...
        </NormalText>
      );
    }
    if ((data === null) || (data.length === 0)) {
      return (
        <NormalText color={Color.Danger}>
          Something went wrong, there is no code.
        </NormalText>
      );
    }
    return (
      <Column alignCrossAxis={AlignItem.Center}>
        <QRCodeImage text={clientUrl}/>
        <SectionTitle>
          Code: {data}
        </SectionTitle>
      </Column>
    )
  }

  // need to specify height, so on iPhone's Safari the popup renders correctly (adjusting its height
  // to the contents)
  return (
    <Popup open={getQrCodeVisible} onClose={hideGetQrCode}>
      <Paper height={Size.Content}>
        {renderContent()}
      </Paper>
    </Popup>
  );
}

// endregion
