// region imports

import {Container} from "./Container.tsx";
import {flexClassNames, type FlexProps} from "./FlexProps.ts";

// endregion

// region exports

/**
 * Row uses a flexbox to place its child elements in a row.
 */
export function Row(props: Partial<FlexProps>) {
  return (
    <Container {...props} className={flexClassNames('row', props)} />
  );
}

// endregion