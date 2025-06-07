# Changelog

## [0.2.3](https://github.com/liblaf/sub-converter/compare/v0.2.2..v0.2.3) - 2025-06-07

### ♻ Code Refactoring

- **group:** update flag icon URL format - ([b284367](https://github.com/liblaf/sub-converter/commit/b284367b1bc0b656bc7f73d04e8bf22527e657db))

### ❤️ New Contributors

- [@liblaf](https://github.com/liblaf) made their first contribution

## [0.2.2](https://github.com/liblaf/sub-converter/compare/v0.2.1..v0.2.2) - 2025-06-06

### ✨ Features

- **config:** add emoji and icon display configuration - ([e0aff24](https://github.com/liblaf/sub-converter/commit/e0aff243f0dbd173c595202b0780227b670066b1))
- **groups:** add icons to proxy groups - ([e2a023b](https://github.com/liblaf/sub-converter/commit/e2a023b35e99fd59d8bfc26e126f3b5d8c039fee))

## [0.2.1](https://github.com/liblaf/sub-converter/compare/v0.2.0..v0.2.1) - 2025-06-01

### ✨ Features

- add KV storage scripts for profile management - ([d9906b7](https://github.com/liblaf/sub-converter/commit/d9906b772eaf7fc3c6ca9802387878059202438a))

### ♻ Code Refactoring

- **config:** move direct domains to external ruleset - ([86dd8eb](https://github.com/liblaf/sub-converter/commit/86dd8eb21edb4b21b1cf43dccc3f2ab710beed17))

### 🔧 Continuous Integration

- standardize path references and temporarily disable Windows builds - ([004fd47](https://github.com/liblaf/sub-converter/commit/004fd474f70015a6fa53d9d6e46f9fc866df2bdf))

## [0.2.0](https://github.com/liblaf/sub-converter/compare/v0.1.12..v0.2.0) - 2025-06-01

### 💥 BREAKING CHANGES

- migrate from tsup to bunup - ([4c3a2a9](https://github.com/liblaf/sub-converter/commit/4c3a2a964c16b0c1e8712933ae8cb6a529cbdace))

## [0.1.12](https://github.com/liblaf/sub-converter/compare/v0.1.11..v0.1.12) - 2025-06-01

### ✨ Features

- **mihomo:** add geox-url configuration with default sources - ([2b57fe2](https://github.com/liblaf/sub-converter/commit/2b57fe2e1aaba0b7b502933dccb46145f3d20592))

### 🐛 Bug Fixes

- correct node_modules bin path in mise config - ([8652f30](https://github.com/liblaf/sub-converter/commit/8652f301d244e466e26b2aa6b5469e62927518f1))

### 👷 Build System

- migrate from Justfile to mise config - ([848a835](https://github.com/liblaf/sub-converter/commit/848a835b8b147f89f2931a1d0ffb14cf51da25da))

## [0.1.11](https://github.com/liblaf/sub-converter/compare/v0.1.10..v0.1.11) - 2025-05-20

### ♻ Code Refactoring

- rename Node to ProxyNode for clarity - ([fabbb8d](https://github.com/liblaf/sub-converter/commit/fabbb8dcc912cd34dde007c6f4189c41ea80c74c))

## [0.1.10](https://github.com/liblaf/sub-converter/compare/v0.1.9..v0.1.10) - 2025-05-11

### ✨ Features

- **mihomo:** add new direct domains and yaml dependency - ([b986a92](https://github.com/liblaf/sub-converter/commit/b986a92c629a17f798f06bde9787a5ca45c8adf8))

### 🐛 Bug Fixes

- rename CLI entry point from sing to sub-converter - ([021dd64](https://github.com/liblaf/sub-converter/commit/021dd640e4f77b92ec3ab3cd9fbf13aa4c168c3d))

### ♻ Code Refactoring

- **mihomo:** reorganize anchors in default config - ([fedd2df](https://github.com/liblaf/sub-converter/commit/fedd2df24555fbee38ea3b01d3631d58129f8af1))
- migrate from sing-box to mihomo configuration (#74) - ([947658c](https://github.com/liblaf/sub-converter/commit/947658c48f7fc34e7e5cc299b56044119ef7f95b))

## [0.1.9](https://github.com/liblaf/sub-converter/compare/v0.1.8..v0.1.9) - 2025-04-20

### 🐛 Bug Fixes

- **sing:** replace PORT schema with direct zod validation - ([f93ab86](https://github.com/liblaf/sub-converter/commit/f93ab862cddd6563836818ea4ac6a35f7929e104))

## [0.1.8](https://github.com/liblaf/sub-converter/compare/v0.1.7..v0.1.8) - 2025-04-17

### ♻ Code Refactoring

- **cli:** migrate from clipanion to commander with chalk styling - ([31278af](https://github.com/liblaf/sub-converter/commit/31278af6996166b5e4c696308c6a5dd2dcb6a8ef))

## [0.1.7](https://github.com/liblaf/sub-converter/compare/v0.1.6..v0.1.7) - 2025-04-08

### 🐛 Bug Fixes

- remove direct outbound filter from AUTO group - ([0b0287e](https://github.com/liblaf/sub-converter/commit/0b0287ef8e5f28b48c8c1b32632e88c820f26b0a))

## [0.1.6](https://github.com/liblaf/sub-converter/compare/v0.1.5..v0.1.6) - 2025-04-07

### ✨ Features

- enhance provider support and country inference - ([b3fae37](https://github.com/liblaf/sub-converter/commit/b3fae374fd8951b3c8aef394707e3f2cc53460a0))

### 🐛 Bug Fixes

- **fetch:** handle errors when fetching singbox outbounds - ([8c351d0](https://github.com/liblaf/sub-converter/commit/8c351d01d5e51fa2c2ffa4079bbd55cc9f1eb659))

### ♻ Code Refactoring

- reorganize imports and make Sing class private - ([4489e3f](https://github.com/liblaf/sub-converter/commit/4489e3f0ecc9122f6c2b0850d3271306cd137206))

## [0.1.5](https://github.com/liblaf/sub-converter/compare/v0.1.4..v0.1.5) - 2025-04-07

### ✨ Features

- migrate CLI to clipanion and enhance outbound filtering - ([2a76af9](https://github.com/liblaf/sub-converter/commit/2a76af95869f0df29267539f3a59df9942cb4894))

### ♻ Code Refactoring

- restructure sing-box client implementation - ([4579e6c](https://github.com/liblaf/sub-converter/commit/4579e6cb002beb1b55fb7823025fdbe3accbbde5))

## [0.1.4](https://github.com/liblaf/sub-converter/compare/v0.1.3..v0.1.4) - 2025-03-23

### 🐛 Bug Fixes

- correct rule set tag from ADS to AI - ([855f254](https://github.com/liblaf/sub-converter/commit/855f254777b6bcfc065edfaaabbea81d895bb192))

## [0.1.3](https://github.com/liblaf/sub-converter/compare/v0.1.2..v0.1.3) - 2025-03-04

### 🐛 Bug Fixes

- switch from node to bun runtime in sing.ts - ([042d80b](https://github.com/liblaf/sub-converter/commit/042d80b148b2c6bb2d102ee7e6b8f66fd1f87e2b))

## [0.1.2](https://github.com/liblaf/sub-converter/compare/v0.1.1..v0.1.2) - 2025-03-02

### 🐛 Bug Fixes

- add shebang to sing.ts for direct execution - ([e127ac6](https://github.com/liblaf/sub-converter/commit/e127ac669466ba8c432c625cfb62b8b5f5fd13bd))

## [0.1.1](https://github.com/liblaf/sub-converter/compare/v0.1.0..v0.1.1) - 2025-03-02

### 🐛 Bug Fixes

- update DNS configuration to prevent hijacking and improve privacy - ([53068f8](https://github.com/liblaf/sub-converter/commit/53068f8d38217145cdc561586785100a3db6b658))

### ♻ Code Refactoring

- **sing-box:** simplify iOS template generation - ([80c31f2](https://github.com/liblaf/sub-converter/commit/80c31f25f27706f4e213cabffe748b9bcad17353))

### 👷 Build System

- simplify package exports and add CLI entry - ([e5b7cdb](https://github.com/liblaf/sub-converter/commit/e5b7cdbf7ca955c611be5aedf8bcbecdd5df51b4))

### ❤️ New Contributors

- [@mergery[bot]](https://github.com/apps/mergery) made their first contribution

## [0.1.0](https://github.com/liblaf/sub-converter/compare/v0.0.19..v0.1.0) - 2025-03-02

### 💥 BREAKING CHANGES

- next (#61) - ([807f192](https://github.com/liblaf/sub-converter/commit/807f192864691f099ff0aa22456d7dbd53dbc917))

### ✨ Features

- **infer:** add and reorder country flags and regexps - ([452d34b](https://github.com/liblaf/sub-converter/commit/452d34b4ca23caaa87b98bc5ab5905267d07a755))
- **logging:** add pino-pretty for enhanced log formatting - ([7ec062a](https://github.com/liblaf/sub-converter/commit/7ec062a0e75f70df4374030e213349db166604cf))

### 🐛 Bug Fixes

- exclude Emby and other specific names from country group filters - ([cdb5aea](https://github.com/liblaf/sub-converter/commit/cdb5aea0e1037d352f7ab31d975495a28f07b5c0))
- correct filter function in makeCountryGroup - ([8d0bda4](https://github.com/liblaf/sub-converter/commit/8d0bda4e9c827642f385638695890cca50ddacaa))

### 🔧 Continuous Integration

- add write permissions to release job - ([8bd72ee](https://github.com/liblaf/sub-converter/commit/8bd72ee97a39ec2f82b9cdcea44ab268f299328c))
- refactor release workflow to use Just for builds - ([e2ad1e3](https://github.com/liblaf/sub-converter/commit/e2ad1e33adb02ed82add7f4ba50a64fbd4b8296c))
- add GitHub Actions workflow for binary release - ([35d68aa](https://github.com/liblaf/sub-converter/commit/35d68aa9fe49a5f947ba0a2f1d768bb519aab872))

## [0.0.18](https://github.com/liblaf/sub-converter/compare/v0.0.17..v0.0.18) - 2025-02-17

### ⬆️ Dependencies

- **deps:** update dependency remeda to v2.20.2 (#56) - ([494a564](https://github.com/liblaf/sub-converter/commit/494a56461c034c615da639aa024288f08dbb5550))
- **deps:** update dependency @liblaf/utils to ^0.0.16 (#55) - ([be3ca20](https://github.com/liblaf/sub-converter/commit/be3ca207327adaeff4f292b2337374e2b113a41c))
- **deps:** update dependency zod to v3.24.2 (#52) - ([9ad34e8](https://github.com/liblaf/sub-converter/commit/9ad34e8b04fe2d70839335130ae8dc297e3d1b5b))

## [0.0.17](https://github.com/liblaf/sub-converter/compare/v0.0.16..v0.0.17) - 2025-02-09

### ⬆️ Dependencies

- **deps:** update dependency @liblaf/utils to ^0.0.7 (#47) - ([067609e](https://github.com/liblaf/sub-converter/commit/067609e2a1705918cf1f66b5cf69a6752afb9e2c))

## [0.0.16](https://github.com/liblaf/sub-converter/compare/v0.0.15..v0.0.16) - 2025-02-04

### ⬆️ Dependencies

- **deps:** update dependency remeda to v2.20.1 (#45) - ([e3d08cc](https://github.com/liblaf/sub-converter/commit/e3d08ccd225240099963cab889a9396ece8426e7))
- **deps:** update dependency loupe to v3.1.3 (#43) - ([0a33ce2](https://github.com/liblaf/sub-converter/commit/0a33ce22a76e6f1b60c5777bc6e3476b439c4f97))
- **deps:** update dependency remeda to v2.20.0 (#38) - ([cf3055b](https://github.com/liblaf/sub-converter/commit/cf3055b47aa340778eecada07966a11eb83c7930))

### ❤️ New Contributors

- [@github-actions[bot]](https://github.com/apps/github-actions) made their first contribution in [#41](https://github.com/liblaf/sub-converter/pull/41)

## [0.0.15](https://github.com/liblaf/sub-converter/compare/v0.0.14..v0.0.15) - 2025-01-17

### ⬆️ Dependencies

- **deps:** update dependency remeda to v2.19.2 (#30) - ([c3b0824](https://github.com/liblaf/sub-converter/commit/c3b08243da0134dc8f6567902fb3a186b1790d8f))

## [0.0.10](https://github.com/liblaf/sub-converter/compare/v0.0.9..v0.0.10) - 2025-01-13

### ⬆️ Dependencies

- **deps:** update dependency remeda to v2.19.1 (#20) - ([13fb9a6](https://github.com/liblaf/sub-converter/commit/13fb9a6eb19de64c6125d731ad36c2aa09e0b382))

## [0.0.9](https://github.com/liblaf/sub-converter/compare/v0.0.8..v0.0.9) - 2025-01-12

### ⬆️ Dependencies

- **deps:** update dependency @liblaf/utils to ^0.0.5 (#17) - ([c998bbc](https://github.com/liblaf/sub-converter/commit/c998bbcc0fc46ddb0585995050df60fed8c1c670))
- **deps:** update dependency @liblaf/utils to ^0.0.3 (#14) - ([7d414dd](https://github.com/liblaf/sub-converter/commit/7d414dd6f3041aa37e74e9590d0764e39b810809))

### ♻ Code Refactoring

- update import paths for utility functions - ([e59980b](https://github.com/liblaf/sub-converter/commit/e59980b2f7feb99398afd28b0dc3a754fd20817c))
- streamline template handling and improve logging - ([049ded8](https://github.com/liblaf/sub-converter/commit/049ded857506d57e81b45f2c3fd9af64e239fb0e))
- improve sing-box provider handling and group filtering - ([4802cbd](https://github.com/liblaf/sub-converter/commit/4802cbd4eca8aad192840110b566b0f1f94e049a))
- consolidate utility functions and improve linting - ([8123268](https://github.com/liblaf/sub-converter/commit/81232687bb2e58d5ff424e3d55898ff93046366b))

### 🔧 Continuous Integration

- update artifact handling and ignore patterns - ([1ad176b](https://github.com/liblaf/sub-converter/commit/1ad176b2de0983c11979395d2d9f7b15f7e71958))

### ❤️ New Contributors

- [@renovate[bot]](https://github.com/apps/renovate) made their first contribution in [#19](https://github.com/liblaf/sub-converter/pull/19)
- [@liblaf-bot[bot]](https://github.com/apps/liblaf-bot) made their first contribution

## [0.0.8](https://github.com/liblaf/sub-converter/compare/v0.0.7..v0.0.8) - 2024-12-16

### 🐛 Bug Fixes

- correct outbound filtering logic and add Clash provider support - ([a7edf0b](https://github.com/liblaf/sub-converter/commit/a7edf0bca4e7e4dd60000666dfb8619df3ef2bf7))

## [0.0.7](https://github.com/liblaf/sub-converter/compare/v0.0.6..v0.0.7) - 2024-12-16

### ♻ Code Refactoring

- improve provider info fetching with error handling - ([fbdfaed](https://github.com/liblaf/sub-converter/commit/fbdfaed9e843b72f2157742ad99d0735f1725a7b))
- improve fetch logic for provider outbounds - ([4169315](https://github.com/liblaf/sub-converter/commit/4169315f153b03fe72be399a76923a951c15f0d1))

## [0.0.6](https://github.com/liblaf/sub-converter/compare/v0.0.5..v0.0.6) - 2024-12-16

### ♻ Code Refactoring

- exclude specific outbound types during fetch - ([ab10a56](https://github.com/liblaf/sub-converter/commit/ab10a567cac8426ed4a1b376de23e25167ba5140))
- improve error handling and logging - ([c8632c8](https://github.com/liblaf/sub-converter/commit/c8632c85a00b8e14f48cfe41b7009df4a991f0c7))

## [0.0.5](https://github.com/liblaf/sub-converter/compare/v0.0.4..v0.0.5) - 2024-12-16

### 🐛 Bug Fixes

- clone response object to prevent mutation during error handling - ([cc1570b](https://github.com/liblaf/sub-converter/commit/cc1570b0d933298aa9838dd1cd148e6d3bb771a1))

### ♻ Code Refactoring

- simplify fetchClashInfo function signature and error handling - ([f73116c](https://github.com/liblaf/sub-converter/commit/f73116c16a5f74649810016d82c7abc178917f29))

## [0.0.4](https://github.com/liblaf/sub-converter/compare/v0.0.3..v0.0.4) - 2024-12-15

### ♻ Code Refactoring

- reorganize and modularize codebase for better maintainability - ([7ade227](https://github.com/liblaf/sub-converter/commit/7ade227b8264853fe14c9bbc345ff1c0176c911e))

## [0.0.3](https://github.com/liblaf/sub-converter/compare/v0.0.2..v0.0.3) - 2024-12-15

### ♻ Code Refactoring

- reorganize subscription info fetching logic - ([b30ca78](https://github.com/liblaf/sub-converter/commit/b30ca78f5a20c7cede9cfe6591a187e5bce25624))

## [0.0.2](https://github.com/liblaf/sub-converter/compare/v0.0.1..v0.0.2) - 2024-12-15

### ✨ Features

- add subscription info fetching for providers - ([c04531a](https://github.com/liblaf/sub-converter/commit/c04531a52be7b55d7dd5f4a1b43110c90cf074a4))

### ♻ Code Refactoring

- enhance configuration templates and add iOS support - ([ee1afdd](https://github.com/liblaf/sub-converter/commit/ee1afdd46b68bddec9810d615a5cf0c0153edbdc))
- improve module exports and update outbound filter logic - ([0ec6b51](https://github.com/liblaf/sub-converter/commit/0ec6b5170a99d0738dda8ce900036625fffd3310))

## [0.0.1](https://github.com/liblaf/sub-converter/compare/v0.0.0..v0.0.1) - 2024-12-15

### ✨ Features

- enhance URI parsing and add support for new protocols - ([7de08ae](https://github.com/liblaf/sub-converter/commit/7de08aecb236debbb85bccde95777369438afafc))
- add test case preparation and URI parsing improvements - ([81b9cf8](https://github.com/liblaf/sub-converter/commit/81b9cf81d978f49f07e78ed6b648253934ad47c4))
- add DNS and inbound configuration for sing-box - ([0473d8f](https://github.com/liblaf/sub-converter/commit/0473d8f2ec56b49127c3d9532d3a1389f0040525))

### 📝 Documentation

- update changelog with recent CI workflow improvements - ([0df0752](https://github.com/liblaf/sub-converter/commit/0df07524035cf4f3374f4f4415fc0a8818948805))

### ♻ Code Refactoring

- reorganize and modularize sing-box client code - ([7ea1edc](https://github.com/liblaf/sub-converter/commit/7ea1edc201573b00ae63459a1dc1b89ad0d81b16))
- reorganize codebase for better modularity and maintainability - ([545a2b3](https://github.com/liblaf/sub-converter/commit/545a2b34afee7cbaf955470103a056405ab656a7))
- reorganize and enhance sing-box configuration and exchange logic - ([9a410da](https://github.com/liblaf/sub-converter/commit/9a410dabd4ce82d614d939a0eb39a9c2e1d6f423))

### 🔧 Continuous Integration

- add GitHub Actions workflow for running tests - ([fb8fb66](https://github.com/liblaf/sub-converter/commit/fb8fb66702c6169e6f3f22d45259f202ae4a1f52))

## [0.0.0] - 2024-12-02

### 🔧 Continuous Integration

- enhance release workflow permissions and format JSON files - ([f9ff16e](https://github.com/liblaf/sub-converter/commit/f9ff16ebfa2c4518d650c8d32467221f3152f668))
- update release configuration and CI workflow - ([f9c95d3](https://github.com/liblaf/sub-converter/commit/f9c95d348d8d39f82b86be779441f0928e88e60f))
- add pre-release job and refactor publish job - ([5a143e1](https://github.com/liblaf/sub-converter/commit/5a143e1c33bdfe129d40c4382450d07e975c336b))
- streamline CI workflow and add publish job - ([b158e15](https://github.com/liblaf/sub-converter/commit/b158e152e28204b3753862154903533dc5c20721))
- add build step to CI workflow - ([37b865c](https://github.com/liblaf/sub-converter/commit/37b865c69a15f1162399a87b9b1da4cbc02448fa))
- configure pnpm action to use latest version and skip install - ([e4cd3e4](https://github.com/liblaf/sub-converter/commit/e4cd3e4a67ef9ea9233853fdb120bf45c8d85fb7))

### ❤️ New Contributors

- [@release-please[bot]](https://github.com/apps/release-please) made their first contribution in [#4](https://github.com/liblaf/sub-converter/pull/4)
- [@liblaf](https://github.com/liblaf) made their first contribution
