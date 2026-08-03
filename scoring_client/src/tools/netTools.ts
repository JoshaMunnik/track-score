// region imports

import {config} from "../config.ts";

// endregion

// region local

/**
 * Gets the url to the server api; ends with '/'
 */
export function getServerApiUrl(): string {
  // path of client within the server
  const base = import.meta.env.BASE_URL;
  // running from within a vitest, so hard code full url to local test server
  if (base === '/') {
    return `${config.testRoot}/${config.apiRoot}`;
  }
  const origin = window.location.origin;
  // use hardcoded local server when origin contains localhost (running with vite dev server)
  const server = (origin.includes('localhost') ? config.testRoot : origin);
  return server
    // remove last part since the spa client is placed within a subfolder below the server root
    + base.substring(0, base.lastIndexOf('/', base.length - 2) + 1)
    + config.apiRoot;

}

/**
 * Gets the full url to the client, ends with '/'
 */
export function getClientBaseUrl(): string {
  const base = import.meta.env.BASE_URL;
  // running from within a vitest, so hard code full url to local client
  if (base === '/') {
    return `${config.testRoot}/${config.clientRoot}`;
  }
  const origin = window.location.origin;
  return origin + base;
}

// endregion