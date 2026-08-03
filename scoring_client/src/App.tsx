// region imports

import {MainPage} from "./pages/MainPage/MainPage.tsx";
import {
  BrowserRouter,
  createBrowserRouter, Route,
  type RouteObject,
  RouterProvider, Routes,
} from "react-router";
import {AppRoute} from "./types/enums/AppRoute.ts";
import {SettingsPage} from "./pages/SettingsPage/SettingsPage.tsx";
import {modules} from "./modules/modules.ts";
import {PlayerNamesPopup} from "./popups/PlayerNamesPopup.tsx";
import {QrCodePopup} from "./popups/QrCodePopup.tsx";
import {ScanQrCodePage} from "./pages/ScanQrCodePage/ScanQrCodePage.tsx";
import {ViewPage} from "./pages/ViewPage.tsx";
import {InformationPage} from "./pages/InformationPage.tsx";
import {useMainStore} from "./store/main/useMainStore.ts";
import {FirstVisitPage} from "./pages/FirstVisitPage.tsx";
import {UnknownPage} from "./pages/UnknownPage.tsx";
import {useShallow} from "zustand/react/shallow";

// endregion

// region initialization

const routes: RouteObject[] = [
  {
    path: AppRoute.Home,
    Component: MainPage,
  },
  {
    path: AppRoute.Settings,
    Component: SettingsPage,
  },
  {
    path: AppRoute.Information,
    Component: InformationPage,
  },
  {
    path: AppRoute.ScanQrCode,
    Component: ScanQrCodePage,
  },
  {
    path: AppRoute.View,
    Component: ViewPage,
  },
];
modules.forEach(module => {
  routes.push(...module.routes);
});
// push fallback as last route entry
routes.push({
  path: '*',
  Component: UnknownPage,
});
const router = createBrowserRouter(
  routes,
  {
    basename: import.meta.env.BASE_URL,
  }
);

// endregion

// region exports

export function App() {
  const {firstVisitPage} = useMainStore(useShallow((state) => ({
    firstVisitPage: state.firstVisitPage,
  })));
  if (firstVisitPage) {
    return (
      <>
        <RouterProvider router={router}/>
        <PlayerNamesPopup/>
        <QrCodePopup/>
      </>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<FirstVisitPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

// endregion
