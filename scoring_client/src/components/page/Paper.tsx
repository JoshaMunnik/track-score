// region imports

import {Spacing} from "../../types/enums/ui/Spacing.ts";
import {Color} from "../../types/enums/ui/Color.ts";
import {BorderRadius} from "../../types/enums/ui/BorderRadius.ts";
import type {PropsWithChildren} from "react";
import {Size} from "../../types/enums/ui/Size.ts";
import {Container} from "../styled/layout/Container.tsx";

// endregion

// region local types

type PaperProps = Readonly<PropsWithChildren<{
  /**
   * Default value is {@link Size.Full}
   */
  width: Size;

  /**
   * Default value is {@link Size.Full}
   */
  height: Size;

  /**
   * When true, use a light background color. Default is false.
   */
  light?: boolean;
}>>;

// endregion

// region exports

/**
 * {@link Paper} is a container with padding and a background.
 */
export function Paper({children, width = Size.Full, height = Size.Full, light = false}: Partial<PaperProps>) {
  // use a column, so that Safari on iPhone can size it correctly based on the contents.
  return (
    <Container
      padding={Spacing.Normal}
      backgroundColor={light ? Color.Light : Color.Default}
      borderRadius={BorderRadius.Small}
      width={width}
      height={height}
    >
      {children}
    </Container>
  )
}

// endregion