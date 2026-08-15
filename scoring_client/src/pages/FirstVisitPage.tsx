// region imports

import {Page} from "../components/page/Page.tsx";
import {SectionTitle} from "../components/styled/text/SectionTitle.tsx";
import {Paragraph} from "../components/styled/text/Paragraph.tsx";
import {Button} from "../components/styled/button/Button.tsx";
import {useNavigate} from "react-router";
import {useMainStore} from "../store/main/useMainStore.ts";
import {PageType} from "../types/enums/ui/PageType.ts";
import {Row} from "../components/styled/layout/Row.tsx";
import {Size} from "../types/enums/ui/Size.ts";
import {DistributeContent} from "../types/enums/ui/DistributeContent.ts";

// endregion

// region exports

export function FirstVisitPage() {
  const {viewedFirstVisitPage} = useMainStore();
  const navigate = useNavigate();

  const handleClose = () => {
    viewedFirstVisitPage();
    navigate(window.location.pathname, {replace: true});
  };

  return (
    <Page
      title="Welcome"
      type={PageType.Paper}
    >
      <SectionTitle>
        Privacy notice
      </SectionTitle>
      <Paragraph>
        By using this web application, you understand that:
      </Paragraph>
      <Paragraph>
        1. This app does not use cookies.
      </Paragraph>
      <Paragraph>
        2. The app uses the browser's local storage to store scores, names and configurations.
      </Paragraph>
      <Paragraph>
        3. When sharing a game with other users; the scores, player names and
        configuration are stored in the database at the server.
      </Paragraph>
      <Paragraph>
        Use the start button at the bottom to begin.
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
      <Row width={Size.Full} distributeMainAxis={DistributeContent.Center}>
        <Button
          onClick={handleClose}
        >
          I acknowledge the above and I'm ready to use the application
        </Button>
      </Row>
    </Page>
  )
}

// endregion