// region imports

import {AlignItem} from "../types/enums/ui/AlignItem.ts";
import {DistributeContent} from "../types/enums/ui/DistributeContent.ts";

// endregion

// region exports

/**
 * Converts align to distribute.
 *
 * @param align
 *
 * @returns same alignement or stretch if align was undefined
 */
export function alignToDistribute(align?: AlignItem): DistributeContent {
  switch(align) {
    case undefined:
      return DistributeContent.Stretch;
    case AlignItem.Start:
      return DistributeContent.Start;
    case AlignItem.Center:
      return DistributeContent.Center;
    case AlignItem.End:
      return DistributeContent.End;
    case AlignItem.Stretch:
      return DistributeContent.Stretch;
    case AlignItem.Base:
      return DistributeContent.Start;
  }
}

// endregion
