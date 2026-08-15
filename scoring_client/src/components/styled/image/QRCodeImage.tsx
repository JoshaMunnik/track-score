// region imports

import {useEffect, useState} from 'react';
import * as QRCode from 'qrcode';
import {NormalText} from "../text/NormalText.tsx";
import {Color} from "../../../types/enums/ui/Color.ts";
import {SmallText} from "../text/SmallText.tsx";

// endregion

// region local

interface QRCodeImageProps {
  /**
   * Text to encode.
   */
  text: string;

  /**
   * Width and height (default is 200) of image.
   */
  size?: number;
}

// endregion

// region exports

export function QRCodeImage({text, size = 200}: QRCodeImageProps) {
  const [qrImageData, setQrImageData] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  useEffect(
    () => {
      // Prevent encoding empty strings
      if (!text) return;
      QRCode.toDataURL(
        text,
        {
          width: size,
          margin: 2,
          errorCorrectionLevel: 'H', // High error correction
        }
      )
        .then((url) => {
          setQrImageData(url);
          setError(null);
        })
        .catch((err) => {
          console.error('Failed to generate QR code', err);
          setError('Failed to generate QR code');
        });
    },
    [text, size]
  );
  if (error) {
    return <NormalText color={Color.Danger}>{error}</NormalText>;
  }
  return qrImageData ? (
    <img
      src={qrImageData}
      alt={`QR Code for ${text}`}
      style={{width: size, height: size}}
    />
  ) : (
    <div style={{width: size, height: size, backgroundColor: '#f0f0f0'}}>
      <SmallText>Loading QR Code...</SmallText>
    </div>
  );
}

// endregion