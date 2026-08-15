// region imports

import {AppRoute} from "../types/enums/AppRoute.ts";
import {Page} from "../components/page/Page.tsx";
import {PageType} from "../types/enums/ui/PageType.ts";
import {Paragraph} from "../components/styled/text/Paragraph.tsx";
import {SectionTitle} from "../components/styled/text/SectionTitle.tsx";
import {Button} from "../components/styled/button/Button.tsx";

// endregion

// region exports

/**
 * A page that is shown, when an unknown url is used.
 */
export function UnknownPage() {
  return (
    <Page
      title="Trackscore.nl - unknown url"
      webTitle="Unknown url"
      backPath={AppRoute.Home}
      type={PageType.Paper}
    >
      <SectionTitle>Unknown url</SectionTitle>
      <Paragraph>
        Can not match the url to an existing page. Click the button to go back to the main page.
      </Paragraph>
      <Button to={AppRoute.Home}>Go back to main page</Button>
    </Page>
  )
}

// endregion
