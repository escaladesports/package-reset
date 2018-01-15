import path from 'path'
import { readJson, outputJson, remove } from 'fs-extra'

import resetPackage from './package'
import resetReadme from './readme'

export default async function(options = {}){
	options = {
		path: './',
		package: 'package.json',
		dirName: true,
		version: '0.0.0',
		repository: true,
		readme: true,
		...options,
	}

	const promises = []

	// Package.json rewrites
	if (options.package) {
		promises.push(resetPackage(options))
	}

	if(options.readme){
		promises.push(resetReadme(options))
	}

	await Promise.all(promises)
}
