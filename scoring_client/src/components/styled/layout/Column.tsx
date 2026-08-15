// region imports

import {flexClassNames, type FlexProps} from "./FlexProps.ts";
import {Container} from "./Container.tsx";

// endregion

// region exports

/**
 * Column uses a flexbox to place its child elements in a column.
 */
export function Column(props: Partial<FlexProps>) {
  return (
    <Container {...props} className={flexClassNames('column', props)} />
  );
}

// endregion