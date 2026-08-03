// region imports

import {Component} from 'react';
import {Html5Qrcode, type CameraDevice} from 'html5-qrcode';
import styles from './QrScanner.module.css';
import {Button} from "../../../components/styled/button/Button.tsx";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {SelectionField} from "../../../components/form/SelectionField.tsx";
import {IconButton} from "../../../components/styled/button/IconButton.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import {FaPlay, FaStop} from "react-icons/fa";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {Color} from "../../../types/enums/ui/Color.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {FaCamera} from "react-icons/fa6";
import {AppRoute} from "../../../types/enums/AppRoute.ts";

// endregion

// region local

type QrScannerState = Readonly<{
  devices: CameraDevice[];
  selectedCameraIndex: number;
  scanResult: string | null;
  isScanning: boolean;
  error: string | null;
  hasPermission: boolean;
  busy: boolean;
}>;

type QrScannerProps = Readonly<{
  onScanResult: (value: string) => void;
}>;

const QR_REGION_ID = "qr-reader-target";

const viewUrlRegExp = new RegExp(
  'http.+' +
  AppRoute.View
    .replace('/', '\\/')
    .replace(':code', '([a-zA-Z0-9]+)') +
  '$'
);

// endregion

// region exports

export class QrScanner extends Component<QrScannerProps, QrScannerState> {
  // region private variables

  private m_html5QrcodeInstance: Html5Qrcode | null = null;

  // endregion

  // region react methods and constructor

  constructor(props: QrScannerProps) {
    super(props);

    this.state = {
      devices: [],
      selectedCameraIndex: -1,
      scanResult: null,
      isScanning: false,
      error: null,
      hasPermission: false,
      busy: false,
    };
  }

  componentWillUnmount() {
    // noinspection JSIgnoredPromiseFromCall
    this.stopScanning();
  }

  // endregion

  // region private methods

  // Explicitly request camera access
  private async requestCameraPermission() {
    try {
      this.setState({error: null, busy: true});
      // this triggers the browser's native permission prompt if not already granted
      const cameraDevices = await Html5Qrcode.getCameras();
      if (cameraDevices && cameraDevices.length > 0) {
        let selectedCameraIndex = 0;
        // try to select the back camera (if any)
        for (let index = 0; index < cameraDevices.length; index++) {
          const device = cameraDevices[index];
          // Check if this is likely a back camera
          if (device.label?.toLowerCase().includes('back') ||
            device.id.toLowerCase().includes('back') ||
            device.label?.toLowerCase().includes('environment')) {
            selectedCameraIndex = index;
            break;
          }
        }
        this.setState(
          {
            devices: cameraDevices,
            selectedCameraIndex: selectedCameraIndex,
            hasPermission: true
          },
          () => this.startScanning()
        );
      } else {
        this.setState({
          error: 'No camera devices found on this device.',
          busy: false,
        });
      }
    } catch (error) {
      console.error('Permission request failed:', error);
      this.setState({
        error: 'Camera permission denied. Please enable it in your browser settings.',
        hasPermission: false,
        busy: false,
      });
    }
  }

  private handleCode(code: string): void {
    // extract the code from the url (if the code contains a full url)
    const execResult = viewUrlRegExp.exec(code);
    if ((execResult !== null) && (execResult.length === 2)) {
      code = execResult[1];
    }
    // only update if code has changed (user might scan same code multiple times)
    if (code !== this.state.scanResult) {
      this.setState({scanResult: code});
      this.props.onScanResult(code);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleError(_: string): void {
    // @ignore
  }

  private async startScanning() {
    const {selectedCameraIndex, devices} = this.state;
    if (selectedCameraIndex < 0) {
      this.setState({error: 'Please select a camera first.'});
      return;
    }
    try {
      this.setState({error: null, scanResult: null, busy: true,});
      if (!this.m_html5QrcodeInstance) {
        this.m_html5QrcodeInstance = new Html5Qrcode(QR_REGION_ID);
      }
      this.setState({isScanning: true});
      await this.m_html5QrcodeInstance.start(
        devices[selectedCameraIndex].id,
        {
          fps: 10,
          qrbox: {width: 280, height: 280},
        },
        (decodedText) => this.handleCode(decodedText),
        (errorMessage) => this.handleError(errorMessage),
      );
      this.setState({busy: false});
    } catch (error) {
      console.error('Failed to start scanning:', error);
      this.setState({
        error: 'Failed to start the camera stream.',
        isScanning: false,
        busy: false,
      });
    }
  }

  async stopScanning() {
    if (this.m_html5QrcodeInstance && this.m_html5QrcodeInstance.isScanning) {
      try {
        this.setState({busy: true});
        await this.m_html5QrcodeInstance.stop();
        this.setState({isScanning: false, busy: false,});
      } catch (error) {
        console.error('Failed to stop scanning:', error);
        this.setState({busy: false});
      }
    }
  }

  private async selectCamera(index: number) {
    this.setState({selectedCameraIndex: index});
    if (this.state.isScanning) {
      await this.stopScanning();
      setTimeout(async () => await this.startScanning(), 300);
    }
  }

  // endregion

  // region rendering

  private renderBottomRow() {
    const {isScanning, hasPermission, selectedCameraIndex, devices, busy} = this.state;
    if (!hasPermission) {
      return (
        <Button
          onClick={() => this.requestCameraPermission()}
          disabled={busy}
        >
          Request camera access
        </Button>
      );
    }
    return (
      <Row alignCrossAxis={AlignItem.Stretch} gap={Spacing.Tiny}>
        <SelectionField
          currentIndex={selectedCameraIndex}
          values={devices.map(device => device.label ?? `Camera ${device.id}`)}
          onChange={(index) => this.selectCamera(index)}
          disabled={busy}
        />
        {
          isScanning &&
          <IconButton
            onClick={() => this.stopScanning()}
            type={ButtonType.Danger}
            disabled={busy}
          >
            <FaStop/>
          </IconButton>
        }
        {
          !isScanning &&
          <IconButton
            onClick={() => this.startScanning()}
            type={ButtonType.Success}
            disabled={busy}
          >
            <FaPlay/>
          </IconButton>
        }
      </Row>
    );
  }

  render() {
    const {error, isScanning} = this.state;
    return (
      <Column
        alignCrossAxis={AlignItem.Center}
        className={styles['camera-container']}
      >
        {
          error &&
          <div className={styles['error']}>
            <NormalText color={Color.Danger}>{error}</NormalText>
          </div>
        }
        {
          !error && !isScanning &&
          <div className={styles['idle']}>
            <FaCamera/>
          </div>
        }
        <div
          id={QR_REGION_ID}
          className={styles['camera'] + (isScanning ? ' ' + styles['camera--is-visible'] : '')}
        />
        {this.renderBottomRow()}
      </Column>
    );
  }

  // endregion
}

// endregion