// region imports

import type {ConfigurationModel} from "../../../types/models/ConfigurationModel.ts";
import type {ZustandStore} from "../../../types/store/ZustandStore.ts";
import {useShallow} from "zustand/react/shallow";
import {Paper} from "../../page/Paper.tsx";
import {Row} from "../../styled/layout/Row.tsx";
import {InputField} from "../../styled/form/InputField.tsx";
import {IconButton} from "../../styled/button/IconButton.tsx";
import {BsThreeDots} from "react-icons/bs";
import {RiDeleteBin2Line} from "react-icons/ri";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {useEffect, useState} from "react";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import type {GameState} from "../../../store/game/GameStore.ts";
import {FaPlus} from "react-icons/fa6";
import type {ConfigurationsStore} from "../../../store/configurations/ConfigurationsStore.ts";
import type {ConfigurationStore} from "../../../store/configuration/ConfigurationStore.ts";
import {ConfigurationDeleteConfirmPopup} from "./components/ConfigurationDeleteConfirmPopup.tsx";
import {ConfigurationConfirmActionPopup} from "./components/ConfigurationConfirmActionPopup.tsx";
import {ConfigurationListPopup} from "./components/ConfigurationListPopup.tsx";

// endregion

// region local

type ConfigurationFormProps<T extends ConfigurationModel> = Readonly<{
  /**
   * The store that manages the configurations
   */
  configurationsStore: ZustandStore<ConfigurationsStore<T>>,

  /**
   * The store that contains the game and active state and uses one of the configurations.
   */
  gameStore: ZustandStore<GameState & ConfigurationStore<T>>,
}>;

// endregion

// region exports

/**
 * This form can be used to edit the name of a configuration, add new configurations, delete
 * configurations, and select a configuration from a list. It will update both the configurations
 * store and game store.
 */
export function ConfigurationForm<T extends ConfigurationModel>(
  {configurationsStore, gameStore}: ConfigurationFormProps<T>
) {
  const {
    active,
    configuration,
    updateGameConfiguration,
  } = gameStore(useShallow(state => ({
    active: state.active,
    configuration: state.configuration,
    updateGameConfiguration: state.updateConfiguration,
  })));
  const {
    index,
    configurations,
    updateName,
    selectConfiguration,
    deleteConfiguration,
    addConfiguration,
    selectForConfiguration,
  } = configurationsStore(useShallow((state) => ({
    index: state.selected,
    configurations: state.configurations,
    updateName: state.updateName,
    selectConfiguration: state.select,
    deleteConfiguration: state.delete,
    addConfiguration: state.add,
    selectForConfiguration: state.selectForConfiguration,
  })));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  useEffect(
    () => {
      selectForConfiguration(configuration);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function checkActive(action: () => void) {
    if (active) {
      // when calling a useState setter with a function, it will execute the function and assign
      // the result; so do not pass active as parameter but use a function that returns the active
      // value.
      setConfirmAction(() => action);
    } else {
      action();
    }
  }

  function add() {
    addConfiguration();
    updateGameConfiguration(configurationsStore.getState().getConfiguration(), true);
  }

  function handleChangeName(name: string): void {
    updateName(name);
    updateGameConfiguration(configurationsStore.getState().getConfiguration(), true);
  }

  function handleSelect(index: number): void {
    setShowList(false);
    selectConfiguration(index);
    updateGameConfiguration(configurationsStore.getState().getConfiguration(), true);
  }

  function handleDeleteConfirm(confirm: boolean) {
    setShowDeleteConfirm(false);
    if (confirm) {
      deleteConfiguration();
      updateGameConfiguration(configurationsStore.getState().getConfiguration(), true);
    }
  }

  return (
    <>
      <Paper>
        <Row width={Size.Full} gap={Spacing.Tiny} alignCrossAxis={AlignItem.Stretch}>
          <Row flex={1} alignCrossAxis={AlignItem.Stretch}>
            <InputField
              value={index < 0 ? '(unknown)' : configurations[index].name}
              onChange={handleChangeName}
              readonly={index < 0}
            />
          </Row>
          <IconButton onClick={() => checkActive(() => setShowList(true))}>
            <BsThreeDots/>
          </IconButton>
          <IconButton onClick={() => checkActive(add)}>
            <FaPlus/>
          </IconButton>
          <IconButton
            onClick={() => setShowDeleteConfirm(true)}
            type={ButtonType.Danger}
            disabled={index < 0}
          >
            <RiDeleteBin2Line/>
          </IconButton>
        </Row>
      </Paper>
      <ConfigurationDeleteConfirmPopup
        open={showDeleteConfirm}
        onClose={(confirm) => handleDeleteConfirm(confirm)}
        configurationName={configuration.name}
        active={active}
      />
      <ConfigurationConfirmActionPopup
        open={confirmAction != null}
        onClose={() => setConfirmAction(null)}
        action={confirmAction}
      />
      <ConfigurationListPopup
        open={showList}
        onClose={() => setShowList(false)}
        onSelect={handleSelect}
        configurations={configurations}
      />
    </>
  )
}
