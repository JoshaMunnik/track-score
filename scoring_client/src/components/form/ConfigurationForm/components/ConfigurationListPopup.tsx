import {ListPopup} from "../../../popup/ListPopup.tsx";
import type {ConfigurationModel} from "../../../../types/models/ConfigurationModel.ts";

type ConfigurationListPopupProps = Readonly<{
  open: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
  configurations: ConfigurationModel[];
}>;

export function ConfigurationListPopup(
  {open, onClose, onSelect, configurations}: ConfigurationListPopupProps
) {
  return (
    <ListPopup
      open={open}
      values={configurations.map(entry => entry.name)}
      onSelect={onSelect}
      onClose={onClose}
    />
  );
}