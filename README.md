# Cypress Playlist Tests

This project contains Cypress end-to-end tests for verifying playlist functionality in the app.

## Prerequisites

* Node.js >= 18
* npm installed

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
```

## Setup Environment

1. Create a `.env` file as it shown in `.env.example` in the project root and define your own variables, for example your app's base URL and search tracks.

   * Example variables you might include:

     * `BASE_URL`: your app's base URL
     * `SEARCH_TRACK_1`: search string to check functionality
     * `SEARCH_TRACK_2`: search track for adding a single track test
     * `SEARCH_TRACK_3`: comma-separated list of tracks for total duration test

2. The Cypress configuration will automatically load the environment variables from `.env`.

## Running Tests

### Open Cypress Test Runner (Interactive Mode)

```bash
npx cypress open
```

### Run Tests in Headless Mode

```bash
npx cypress run
```

## Test Details

1. **Search Functionality**

   * Verifies that every displayed track name contains the search string defined in `.env` (`SEARCH_TRACK_1`).
2. **Add Track Functionality**

   * Adds a single track using the "+" button (`SEARCH_TRACK_2`) and checks that it appears in the playlist.
3. **Verify Total Duration of Playlist**

   * Adds multiple tracks (`SEARCH_TRACK_3`), calculates the total duration in seconds, and verifies that it matches the displayed total.

## Notes

* All tests use `Cypress.env()` to access search terms and other configurable values.
* The `BASE_URL` is set via `.env` and used in `cypress.config.js`.
* Ensure that the app is running or accessible at the specified base URL before running tests.
* You can format and lint the code using ESLint and Prettier to maintain consistent code quality.

## Additional Config Files

* `cypress.config.js` : Cypress configuration including environment variable loading.


```bash
const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

dotenv.config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    setupNodeEvents(on, config) {
      config.env.SEARCH_TRACK_1 = process.env.SEARCH_TRACK_1;
      config.env.SEARCH_TRACK_2 = process.env.SEARCH_TRACK_2;
      config.env.SEARCH_TRACK_3 = process.env.SEARCH_TRACK_3;
      return config;
    },
  },
});

```

* `package.json` : include the following script to run all tests with just `npm run test`.

```bash
"scripts": {
"test": "cypress run"
}
```
