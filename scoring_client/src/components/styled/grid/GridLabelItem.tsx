import {GridItem, type GridItemProps} from "./GridItem.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";

/**
 * {@link GridLabelItem} aligns the content vertically in the center.
 */
export function GridLabelItem(props: GridItemProps) {
  return (
    <GridItem verticalAlign={AlignItem.Center} {...props} />
  );
}