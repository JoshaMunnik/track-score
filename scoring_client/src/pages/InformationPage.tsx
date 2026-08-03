// region imports

import {AppRoute} from "../types/enums/AppRoute.ts";
import {Page} from "../components/page/Page.tsx";
import {PageType} from "../types/enums/ui/PageType.ts";
import {Paragraph} from "../components/styled/text/Paragraph.tsx";
import {SectionTitle} from "../components/styled/text/SectionTitle.tsx";
import {IconButton} from "../components/styled/button/IconButton.tsx";
import {ImQrcode} from "react-icons/im";
import {IoSettingsSharp} from "react-icons/io5";
import {FaUsers} from "react-icons/fa";
import {Grid} from "../components/styled/grid/Grid.tsx";
import {GridItem} from "../components/styled/grid/GridItem.tsx";
import {AlignItem} from "../types/enums/ui/AlignItem.ts";
import {Link} from "react-router";

// endregion

// region exports

/**
 * A page showing global settings and button to clear stored local data.
 */
export function InformationPage() {
  return (
    <Page
      title="Trackscore.nl - information"
      webTitle="Information"
      backPath={AppRoute.Home}
      type={PageType.Paper}
    >
      <SectionTitle>Track Score App, v2</SectionTitle>
      <Paragraph>
        copyright &copy; 2026 by Ultra Force Development
      </Paragraph>
      <SectionTitle>About</SectionTitle>
      <Paragraph>
        A website application to track scores for various table top and card games. The app
        was designed for mobile resolutions (minimal resolution iPhone SE).
      </Paragraph>
      <SectionTitle>Usage</SectionTitle>
      <Paragraph>
        With the main page, a new game can be started, a previously started game can be continued or
        the results can be viewed of a finished game.
      </Paragraph>
      <Paragraph>
        The top bar may contain the following buttons:
      </Paragraph>
      <Grid templateColumns="auto 1fr">
        <GridItem verticalAlign={AlignItem.Center}>
          <IconButton passive><ImQrcode/></IconButton>
        </GridItem>
        <GridItem verticalAlign={AlignItem.Center}>
          to scan a QR code or enter a code by hand to view a shared game.
        </GridItem>
        <GridItem verticalAlign={AlignItem.Center}>
          <IconButton passive><IoSettingsSharp/></IconButton>
        </GridItem>
        <GridItem verticalAlign={AlignItem.Center}>
          to configure the settings.
        </GridItem>
        <GridItem verticalAlign={AlignItem.Center}>
          <IconButton passive><FaUsers/></IconButton>
        </GridItem>
        <GridItem verticalAlign={AlignItem.Center}>
          to edit the players and/or teams.
        </GridItem>
      </Grid>
      <Paragraph/>
      <SectionTitle>Shared games</SectionTitle>
      <Paragraph>
        Some games can share their current scoring state with other mobile devices. This allows
        other players to view the current scores on their own phones.
      </Paragraph>
      <Paragraph>
        When a game can share its game state,
        a <IconButton small passive><ImQrcode/></IconButton> is
        shown in the top bar. Clicking it will show a QR code.
      </Paragraph>
      <Paragraph>
        To view the shared state, either scan the code with a mobile's camera or click
        the <IconButton small passive><ImQrcode/></IconButton> in the home page.
      </Paragraph>
      <SectionTitle>Fair rolling</SectionTitle>
      <Paragraph>
        With dice related scoring, there is an option for fair rolling. When enabled, the
        application creates a group with all possible roll combinations. The group gets shuffled
        and rolls are obtained from the group until there are no more combinations left.<br/>
        It is possible to use multiple groups and shuffle all groups together.
      </Paragraph>
      <SectionTitle>
        Technologies
      </SectionTitle>
      <Paragraph>
        The following technologies were used to create this application:
      </Paragraph>
      <ul>
        <li>
          <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>
        </li>
        <li>
          <a href="https://react.dev/" target="_blank">React</a>
        </li>
        <li>
          <a href="https://zustand.docs.pmnd.rs/learn/getting-started/introduction" target="_blank">
            Zustand
          </a>
        </li>
        <li>
          <a href="https://react-icons.github.io/react-icons/" target="_blank">
            React Icons
          </a>
        </li>
        <li>
          <a href="https://joshamunnik.github.io/ts-general-lib/modules.html" target="_blank">
            Ultra Force General Typescript Library
          </a>
        </li>
        <li>
          <a href="https://www.php.net/" target="_blank">PHP</a>
        </li>
        <li>
          <a href="https://cakephp.org/" target="_blank">CakePHP</a>
        </li>
        <li>
          <a href="https://www.jetbrains.com/phpstorm/" target="_blank">Phpstorm IDE</a>
        </li>
      </ul>
      <SectionTitle>
        Privacy
      </SectionTitle>
      <Paragraph>
        1. This app does not use cookies.
      </Paragraph>
      <Paragraph>
        2. The app uses the browser's local storage to store scores, names and configurations. To
        remove this data, one can use the remove buttons in
        the <Link to={AppRoute.Settings}>settings page</Link> (accessible from the home page).
      </Paragraph>
      <Paragraph>
        3. When sharing a game score state with other users; the scores, player names and
        configurations are stored in the database at the server. This data is automatically removed
        one month after the last registered activity.
      </Paragraph>
      <SectionTitle>Disclaimer</SectionTitle>
      <Paragraph>
        THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY EXPRESS OR
        IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR
        CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
        CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
        OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
        NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
        ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
      </Paragraph>
    </Page>
  )
}

// endregion
