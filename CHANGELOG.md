# Changelog

## [0.0.8](https://github.com/liblaf/sub-converter/compare/v0.0.7...v0.0.8) (2024-12-16)


### 🐛 Bug Fixes

* correct outbound filtering logic and add Clash provider support ([a7edf0b](https://github.com/liblaf/sub-converter/commit/a7edf0bca4e7e4dd60000666dfb8619df3ef2bf7))

## [0.0.7](https://github.com/liblaf/sub-converter/compare/v0.0.6...v0.0.7) (2024-12-16)


### ♻ Code Refactoring

* improve fetch logic for provider outbounds ([4169315](https://github.com/liblaf/sub-converter/commit/4169315f153b03fe72be399a76923a951c15f0d1))
* improve provider info fetching with error handling ([fbdfaed](https://github.com/liblaf/sub-converter/commit/fbdfaed9e843b72f2157742ad99d0735f1725a7b))

## [0.0.6](https://github.com/liblaf/sub-converter/compare/v0.0.5...v0.0.6) (2024-12-16)

### ♻ Code Refactoring

- exclude specific outbound types during fetch ([ab10a56](https://github.com/liblaf/sub-converter/commit/ab10a567cac8426ed4a1b376de23e25167ba5140))
- improve error handling and logging ([c8632c8](https://github.com/liblaf/sub-converter/commit/c8632c85a00b8e14f48cfe41b7009df4a991f0c7))

## [0.0.5](https://github.com/liblaf/sub-converter/compare/v0.0.4...v0.0.5) (2024-12-15)

### 🐛 Bug Fixes

- clone response object to prevent mutation during error handling ([cc1570b](https://github.com/liblaf/sub-converter/commit/cc1570b0d933298aa9838dd1cd148e6d3bb771a1))

### ♻ Code Refactoring

- simplify fetchClashInfo function signature and error handling ([f73116c](https://github.com/liblaf/sub-converter/commit/f73116c16a5f74649810016d82c7abc178917f29))

## [0.0.4](https://github.com/liblaf/sub-converter/compare/v0.0.3...v0.0.4) (2024-12-15)

### ♻ Code Refactoring

- reorganize and modularize codebase for better maintainability ([7ade227](https://github.com/liblaf/sub-converter/commit/7ade227b8264853fe14c9bbc345ff1c0176c911e))

## [0.0.3](https://github.com/liblaf/sub-converter/compare/v0.0.2...v0.0.3) (2024-12-15)

### ♻ Code Refactoring

- reorganize subscription info fetching logic ([b30ca78](https://github.com/liblaf/sub-converter/commit/b30ca78f5a20c7cede9cfe6591a187e5bce25624))

## [0.0.2](https://github.com/liblaf/sub-converter/compare/v0.0.1...v0.0.2) (2024-12-15)

### ✨ Features

- add subscription info fetching for providers ([c04531a](https://github.com/liblaf/sub-converter/commit/c04531a52be7b55d7dd5f4a1b43110c90cf074a4))

### ♻ Code Refactoring

- enhance configuration templates and add iOS support ([ee1afdd](https://github.com/liblaf/sub-converter/commit/ee1afdd46b68bddec9810d615a5cf0c0153edbdc))
- improve module exports and update outbound filter logic ([0ec6b51](https://github.com/liblaf/sub-converter/commit/0ec6b5170a99d0738dda8ce900036625fffd3310))

## [0.0.1](https://github.com/liblaf/sub-converter/compare/v0.0.0...v0.0.1) (2024-12-15)

### ✨ Features

- add DNS and inbound configuration for sing-box ([0473d8f](https://github.com/liblaf/sub-converter/commit/0473d8f2ec56b49127c3d9532d3a1389f0040525))
- add test case preparation and URI parsing improvements ([81b9cf8](https://github.com/liblaf/sub-converter/commit/81b9cf81d978f49f07e78ed6b648253934ad47c4))
- enhance URI parsing and add support for new protocols ([7de08ae](https://github.com/liblaf/sub-converter/commit/7de08aecb236debbb85bccde95777369438afafc))

### 📝 Documentation

- update changelog with recent CI workflow improvements ([0df0752](https://github.com/liblaf/sub-converter/commit/0df07524035cf4f3374f4f4415fc0a8818948805))

### ♻ Code Refactoring

- reorganize and enhance sing-box configuration and exchange logic ([9a410da](https://github.com/liblaf/sub-converter/commit/9a410dabd4ce82d614d939a0eb39a9c2e1d6f423))
- reorganize and modularize sing-box client code ([7ea1edc](https://github.com/liblaf/sub-converter/commit/7ea1edc201573b00ae63459a1dc1b89ad0d81b16))
- reorganize codebase for better modularity and maintainability ([545a2b3](https://github.com/liblaf/sub-converter/commit/545a2b34afee7cbaf955470103a056405ab656a7))

### 🔧 Continuous Integration

- add GitHub Actions workflow for running tests ([fb8fb66](https://github.com/liblaf/sub-converter/commit/fb8fb66702c6169e6f3f22d45259f202ae4a1f52))

## 0.0.0 (2024-12-02)

### 🔧 Continuous Integration

- add build step to CI workflow ([37b865c](https://github.com/liblaf/sub-converter/commit/37b865c69a15f1162399a87b9b1da4cbc02448fa))
- add pre-release job and refactor publish job ([5a143e1](https://github.com/liblaf/sub-converter/commit/5a143e1c33bdfe129d40c4382450d07e975c336b))
- configure pnpm action to use latest version and skip install ([e4cd3e4](https://github.com/liblaf/sub-converter/commit/e4cd3e4a67ef9ea9233853fdb120bf45c8d85fb7))
- enhance release workflow permissions and format JSON files ([f9ff16e](https://github.com/liblaf/sub-converter/commit/f9ff16ebfa2c4518d650c8d32467221f3152f668))
- streamline CI workflow and add publish job ([b158e15](https://github.com/liblaf/sub-converter/commit/b158e152e28204b3753862154903533dc5c20721))
- update release configuration and CI workflow ([f9c95d3](https://github.com/liblaf/sub-converter/commit/f9c95d348d8d39f82b86be779441f0928e88e60f))

## 0.0.0 (2024-12-02)

### 🔧 Continuous Integration

- add build step to CI workflow ([37b865c](https://github.com/liblaf/sub-converter/commit/37b865c69a15f1162399a87b9b1da4cbc02448fa))
- add pre-release job and refactor publish job ([5a143e1](https://github.com/liblaf/sub-converter/commit/5a143e1c33bdfe129d40c4382450d07e975c336b))
- configure pnpm action to use latest version and skip install ([e4cd3e4](https://github.com/liblaf/sub-converter/commit/e4cd3e4a67ef9ea9233853fdb120bf45c8d85fb7))
- streamline CI workflow and add publish job ([b158e15](https://github.com/liblaf/sub-converter/commit/b158e152e28204b3753862154903533dc5c20721))
- update release configuration and CI workflow ([f9c95d3](https://github.com/liblaf/sub-converter/commit/f9c95d348d8d39f82b86be779441f0928e88e60f))

## 0.0.0 (2024-12-02)

### 🔧 Continuous Integration

- add build step to CI workflow ([37b865c](https://github.com/liblaf/sub-converter/commit/37b865c69a15f1162399a87b9b1da4cbc02448fa))
- add pre-release job and refactor publish job ([5a143e1](https://github.com/liblaf/sub-converter/commit/5a143e1c33bdfe129d40c4382450d07e975c336b))
- configure pnpm action to use latest version and skip install ([e4cd3e4](https://github.com/liblaf/sub-converter/commit/e4cd3e4a67ef9ea9233853fdb120bf45c8d85fb7))
- streamline CI workflow and add publish job ([b158e15](https://github.com/liblaf/sub-converter/commit/b158e152e28204b3753862154903533dc5c20721))
