export enum AppRoute {
  Home = '/',
  Settings = '/settings',
  ScanQrCode = '/scan-qr-code',
  Information = '/information',

  /**
   * This route includes a parameter, do not use it as a link directly.
   */
  View = '/view/:code',
}