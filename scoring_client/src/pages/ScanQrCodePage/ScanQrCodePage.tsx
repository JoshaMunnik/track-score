// region imports

import {Page} from "../../components/page/Page.tsx";
import {AppRoute} from "../../types/enums/AppRoute.ts";
import {PageType} from "../../types/enums/ui/PageType.ts";
import {Column} from "../../components/styled/layout/Column.tsx";
import {NormalText} from "../../components/styled/text/NormalText.tsx";
import {InputField} from "../../components/styled/form/InputField.tsx";
import {QrScanner} from "./components/QrScanner.tsx";
import {Spacing} from "../../types/enums/ui/Spacing.ts";
import {AlignItem} from "../../types/enums/ui/AlignItem.ts";
import {Row} from "../../components/styled/layout/Row.tsx";
import {IconButton} from "../../components/styled/button/IconButton.tsx";
import {FaPlay} from "react-icons/fa";
import React, {useState} from "react";
import {Size} from "../../types/enums/ui/Size.ts";
import {useNavigate} from "react-router";
import {Container} from "../../components/styled/layout/Container.tsx";

// endregion

// region exports

/**
 * This page allows the user to scan a QR code or enter a code.
 */
export function ScanQrCodePage() {
  const [textCode, setTextCode] = useState('');
  const navigate = useNavigate();

  function processCode(code: string): void {
    // ignore empty codes
    if (!code || code.trim().length === 0) {
      return;
    }
    const cleanedCode = code.trim();
    console.log('Qr code: ' + cleanedCode);
    navigate(AppRoute.View.replace(':code', cleanedCode));
  }

  function handleKey(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      processCode(textCode);
    }
  }

  return (
    <Page
      title="Scan QR Code"
      backPath={AppRoute.Home}
      type={PageType.Paper}
    >
      <Column alignCrossAxis={AlignItem.Center} width={Size.Full}>
        <Column gap={Spacing.Normal} alignCrossAxis={AlignItem.Stretch}>
          <Column width={Size.Full}>
            <NormalText>Enter code</NormalText>
            <Row alignCrossAxis={AlignItem.Stretch} gap={Spacing.Tiny} width={Size.Full}>
              <Container flex={1}>
                <InputField
                  value={textCode}
                  onChange={(value) => setTextCode(value?.trim().toUpperCase())}
                  onKeyPress={handleKey}
                  placeholder="XXXXX"
                />
              </Container>
              <IconButton
                disabled={textCode.length === 0}
                onClick={() => processCode(textCode)}
              >
                <FaPlay/>
              </IconButton>
            </Row>
          </Column>
          <Column>
            <NormalText>Scan code</NormalText>
            <QrScanner onScanResult={(result) => processCode(result)}/>
          </Column>
        </Column>
      </Column>
    </Page>
  )
}

// endregion