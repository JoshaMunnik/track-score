# Client for track score website

## Installation

Use `npm install` to install the dependencies.

Update `src/config.ts` with your configuration settings.

Run `npm run dev` to start the development server.

Or run `npm run build` to build the project for production. The build files will be placed in
`../public_html/client/`; if another location is needed, update the `outDir` in `vite.config.ts`.

## Architecture

The application uses a modules/features layout to separate the logic for different games. Each
module has its own stores, components and pages and runs independently of the other modules. 
The main application is responsible for routing and providing the common components.

There is logic to show a privacy page the first time a user visits the site. The privacy page
is shown until the user accepts the privacy policy.

The application supports sharing a game state between devices. The data is stored in a MySql 
database at the server. A simple API has been defined to support this. 
See [api.md](../scoring_server/doc/api.md) for more information.

Game states can also be stored locally in the browser's local storage. This allows users to continue
previously started games or view finished games. 

### Styling

The application is styled so that it can be viewed on mobile devices.

The application defines its own styling. Some general styling is defined in 
[src/styles/index.css](src/styles/index.css); the 
file [src/styles/variables.css](src/styles/variables.css) defines the color scheme and 
other variables. 

All components use CSS Modules when they need their own styling.

The application defines set of general usable styled components in
[src/components/styled](src/components/styled). These components are used throughout the 
application.

## Modules

To add a new module, perform the following steps:

1. Add a value to the `GameType` enum in [src/types/enums/GameType.ts](src/types/enums/GameType.ts).
2. Create a folder in `src/modules`. 
3. Create an object that implements the `ModuleModel` type from 
   [src/types/models/ModuleModel.ts](src/types/models/ModuleModel.ts). 
4. It is assumed every module has at least a game store. Create a store that implements the 
   `ResettableActions` defined in 
   [src/store/resettable/ResettableActions.ts](src/store/resettable/ResettableActions.ts).
5. Add a reference to the store in the module object.
6. Add the other fields in the module object.
7. Update the `src/modules/modules.ts` and add the newly created module object.

### Local storage

To add support for storing the game state in the local storage, perform the following steps:

1. The game store must implement the fields and actions found in 
   [src/store/storable/StorableGameStore.ts](src/store/storable/StorableGameStore.ts).
2. Whenever the game state changes, call `updateGameSession` defined in 
   [src/tools/mainTools.ts](src/tools/mainTools.ts) to update the game state in the local storage.
3. The main page of the game should use the `<PageWithState>` component and implement the
   `onProcessState` callback. The callback should restore the game state if there is any.

### Sharing across devices

To add support for sharing the game state across devices, perform the following steps:

1. Create a sharable store using `createSharableGameStore` in
   [src/store/sharable/createSharableGameStore.ts](src/store/sharable/createSharableGameStore.ts) 
   A separate store is created, since the fields in this store do not need to be stored or shared.
2. The game store must implement the fields and actions found in
   [src/store/storable/StorableGameStore.ts](src/store/storable/StorableGameStore.ts).
3. Whenever the game state changes, call `updateGameSession` defined in 
   [src/tools/mainTools.ts](src/tools/mainTools.ts) to update the game state in the local storage 
   and at the server by passing the sharable store created in step 1.
4. The main page of the game should use the `<PageWithState>` component and implement the
   `onProcessState` callback. The callback should restore the game state if there is any. Do not 
   forget to check if the user is viewing a shared game and disable interaction if they are.
5. Set the `sharableStore` property of `<PageWithState>` to the shareable store created in step 1. 
   The page will show an extra QR button at the top, which the user can click to start sharing the
   game state with other devices. 

When creating a new gaming session, use the `getGameSessionId` function defined 
in [src/tools/mainTools.ts](src/tools/mainTools.ts) to get a new identifier that is unique across 
all devices (using an uuid). 

### Players

A game might support multiple players. The application has built-in support for players, that
a module can use.

To add use the built-in support, perform the following steps:
1. Create a subtype of `PlayerModel` in 
   [src/types/models/PlayerModel.ts](src/types/models/PlayerModel.ts) for your module. Add fields to
   the model, make sure only to use primitive types since the model data might get stored in the 
   local storage.
2. Use `withPlayers` or `withConfigurationAndPlayers` middleware when creating the game store. This 
   will add a field `players` and various player actions to the game store.
3. When creating a page to manage the players, use the component
   [src/components/form/PlayersForm.tsx](src/components/form/PlayersForm/PlayersForm.tsx) to manage the players.  
   It supports both individual players and teams with or without dealer tracking. The component 
   also stores entered player names, so they can be reused in other games.

### Configurations

A game might have multiple configurations. The application has built-in support for 
configurations, that a module can use. 

The built-in support stores the configurations in a separate store. This is done, so the game store
state can be shared between devices without sharing the configurations.

However, a copy of the selected configuration is stored in the game store instead of using a 
reference to the configurations store. This allows players on other devices to continue a shared
game or view the finished game that uses some custom configuration that differs from the 
configurations stored at their devices.

When a user continues a shared game on another device and wants to change the configuration, the app 
tries to match the game configuration with the stored configurations. If no match is found, a new
configuration is created. 

To add support to a module for multiple configurations, perform the following steps:

1. Create a subtype of `ConfigurationModel` in
   [src/types/models/ConfigurationModel.ts](src/types/models/ConfigurationModel.ts) for your module.
   Add fields to the model, make sure only to use primitive types since the model data might get 
   stored in the local storage.
2. Create a configurations store for your module using the `createConfigurationsStore` function.
3. Create the game store using the `withConfiguration` or `withConfigurationAndPlayers` middleware
   for your module. This will add various actions to manage the configuration.
4. Create field named `configuration` in the game store, using the type defined in step 1. 
5. Create a form to edit the configuration, use `updateConfiguration` in the game store to update
   the configuration. When calling this function, pass the configurations store; so it gets updated
   as well.
6. Create a page that contains both the configuration form and the component
   [src/components/form/ConfigurationForm.tsx](src/components/form/ConfigurationForm/ConfigurationForm.tsx) that will   
   manage the configurations.
7. Add a reference to the configuration store in the module object; so that it can get reset.

## Testing

The application uses vitest for unit testing and playwright for end-to-end testing. 

To run the vitest tests, use `npm run test:unit`. For sources that have tests, there will be a
`__tests` folder that contains the test files. The test files have the same name as the source file, 
but with a `.test.ts` or `.test.tsx` extension.

To run playwright tests, use `npm run test:e2e`. The tests are located in the `tests` folder and
use the `.spec.ts` extension. To test with the playwright UI, use `npm run test:e2e:ui`.

When creating new playwright tests, use `npm run test:e2e:gen` to start an ui to help with creating
code to locate certain elements on a page.
