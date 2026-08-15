// region imports

import {useMainStore} from "../store/main/useMainStore.ts";
import {useShallow} from "zustand/react/shallow";
import {ListPopup} from "../components/popup/ListPopup.tsx";

// endregion

// region exports

/**
 * This popup is a global dialog, showing and hiding itself based on the main store. Place it
 * outside the router views.
 *
 * @constructor
 */
export function PlayerNamesPopup() {
  const {
    selectPlayerNameVisible,
    playerNames,
    onSelectPlayerName,
    hidePlayerNames
  } = useMainStore(useShallow(
    (state) => ({
      selectPlayerNameVisible: state.selectPlayerNameVisible,
      playerNames: state.playerNames,
      onSelectPlayerName: state.onSelectPlayerName,
      hidePlayerNames: state.hidePlayerNames,
    })
  ));
  const sortedNames = [...playerNames].sort((a, b) => a.localeCompare(b));
  return (
    <ListPopup
      open={selectPlayerNameVisible}
      onClose={hidePlayerNames}
      onSelect={
        (index) => {
          onSelectPlayerName?.(sortedNames[index]);
          hidePlayerNames();
        }}
      values={sortedNames}
    />
  )
}

// endregion
