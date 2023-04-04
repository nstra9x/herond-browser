# Herond Browser


## Overview

This repository holds the build tools needed to build the Herond browser for iOS.  In particular, it fetches and syncs code from the projects defined in `package.json`

  - [Chromium](https://chromium.googlesource.com/chromium/src.git)
    - Fetches code via `depot_tools`.
    - sets the branch for Chromium (ex: 65.0.3325.181).
  - [herond-core](https://github.com/herond/herond-core)
    - Mounted at `src/herond`.


## Clone and initialize the repo

Once you have the prerequisites installed, you can get the code and initialize the build environment.

```bash
git clone git@github.com:herond/herond-core.git path-to-your-project-folder/src/herond
cd path-to-your-project-folder/herond
npm install

# the Chromium source is downloaded, which has a large history (gigabytes of data)
# this might take really long to finish depending on internet speed

npm run init
```

## Build Herond
The default build type is component.

```
# start the component build compile
npm run build
```

To do a release build:

```
# start the release compile
npm run build -- Release
```

To run a debug build (Component build with is_debug=true):

```
# start the debug compile
npm run build -- Debug
```

# Some configurations for build:
1. build_dir: output directory, default is Component
2. target_environment: device, catalyst, simulator
3. application: gn_all, content_shell, ios_web_shell
4. xcode_gen: name of xcode project

Example for build iOS in folder `BuildDir`, target_environment is `device`, xcode project name is `HerondBrowser`, application is `gn_all`, and `Release` mode:
```
npm run build -- -C BuildDir --target_environment device --xcode_gen HerondBrowser --application gn_all Release
```

NOTE: the build will take a while to complete. Depending on your processor and memory, it could potentially take a few hours.
