// region imports

import {TopBar, type TopBarProps} from "./TopBar.tsx";
import type {PropsWithChildren} from "react";
import {ScrollablePage} from "../styled/page/ScrollablePage.tsx";
import {PageType} from "../../types/enums/ui/PageType.ts";
import {Container} from "../styled/layout/Container.tsx";
import {Spacing} from "../../types/enums/ui/Spacing.ts";
import {Paper} from "./Paper.tsx";

// endregion

// region exports

export type PageProps = TopBarProps & PropsWithChildren<Readonly<{
  /**
   * The type of page to show and wrap the children with
   */
  type?: PageType;
}>>;

/**
 * {@link Page} can be used to display a page with a top bar and scrollable content.
 * @constructor
 */
export function Page({type = PageType.Plain, ...topProps}: PageProps) {

  function renderChildren() {
    switch (type) {
      case PageType.Plain:
        return topProps.children;
      case PageType.Padding:
        return (
          <Container verticalPadding={Spacing.Normal} horizontalPadding={Spacing.Small}>
            {topProps.children}
          </Container>
        );
      case PageType.Paper:
        return (
          <Container verticalPadding={Spacing.Normal} horizontalPadding={Spacing.Small}>
            <Paper>
              {topProps.children}
            </Paper>
          </Container>
        );
    }
  }

  return (
    <ScrollablePage top={<TopBar {...topProps} />}>
      {renderChildren()}
    </ScrollablePage>
  );
}

// endregion