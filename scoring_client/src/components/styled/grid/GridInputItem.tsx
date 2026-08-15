import {GridItem, type GridItemProps} from "./GridItem.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";

/**
 * {@link GridInputItem} aligns the content horizontally to the end and vertically in the center.
 */
export function GridInputItem(props: GridItemProps) {
  return (
    <GridItem verticalAlign={AlignItem.Center} horizontalAlign={AlignItem.End} {...props} />
  );
}