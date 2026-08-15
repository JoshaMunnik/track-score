// region imports

import {Page} from "../../components/page/Page.tsx";
import {MainListSelectionButtons} from "./components/MainListSelectionButtons.tsx";
import {useState} from "react";
import {MainList} from "./components/MainList.ts";
import {AppRoute} from "../../types/enums/AppRoute.ts";
import {NewGameList} from "./components/NewGameList.tsx";
import {GameSessionList} from "./components/GameSessionList.tsx";
import {PageType} from "../../types/enums/ui/PageType.ts";

// endregion

// region exports

export function MainPage() {
  const [list, setList] = useState(MainList.New);

  const renderList = () => {
    switch (list) {
      case MainList.New:
        return <NewGameList/>;
      case MainList.Continue:
        return <GameSessionList finished={false}/>;
      case MainList.Finished:
        return <GameSessionList finished={true}/>;
    }
  };
  return (
    <>
      <Page
        title="Trackscore.nl"
        webTitle=""
        qrCodePath={AppRoute.ScanQrCode}
        infoPath={AppRoute.Information}
        settingsPath={AppRoute.Settings}
        type={PageType.Padding}
      >
        <MainListSelectionButtons selected={list} onSelected={setList}/>
        {renderList()}
      </Page>
    </>
  );
}

// endregion