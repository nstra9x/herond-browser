// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const args = process.argv.slice(2);
const fs = require('fs')
const Log = require('../lib/logging')
const path = require('path')
const util = require('../lib/util')

Log.progress('Performing initial checkout of herond-core')

const rootDir = path.resolve(__dirname, '..', 'src')
const herondCoreDir = path.resolve(__dirname, rootDir, 'herond')
const herondCoreRef = util.getProjectVersion(args[0])

if (!fs.existsSync(path.join(herondCoreDir, '.git'))) {
    Log.status(`Cloning herond-core [${herondCoreRef}] into ${herondCoreDir}...`)
    fs.mkdirSync(herondCoreDir, { recursive: true })
    util.runGit(herondCoreDir, ['clone', util.getNPMConfig(['projects', 'herond-core', 'repository', 'url']), '.'])
    util.runGit(herondCoreDir, ['checkout', herondCoreRef])
}

const herondCoreCommit = util.runGit(herondCoreDir, ['rev-parse', 'HEAD'])
Log.progress(`herond-core repo at ${herondCoreDir} is at commit ID ${herondCoreCommit}`)

let npmCommand = 'npm'
if (process.platform === 'win32') {
  npmCommand += '.cmd'
}

util.run(npmCommand, ['install'], { cwd: herondCoreDir })

util.run(npmCommand, ['run', 'sync' ,'--', '--init'].concat(process.argv.slice(2)), {
  cwd: herondCoreDir,
  env: process.env,
  stdio: 'inherit',
  shell: true,
  git_cwd: '.', })
