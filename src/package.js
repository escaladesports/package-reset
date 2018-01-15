import path from 'path'
import { readJson, outputJson } from 'fs-extra'

export default async function (options) {
	const packagePath = options.path + options.package
	const content = await readJson(packagePath)

	// Change name
	if (options.name) {
		content.name = options.name
	}
	else if (options.dirName) {
		let name = process.cwd()
		name = path.parse(name)
		name = name.base
		content.name = name
	}

	// Reset version
	if (options.version) {
		content.version = options.version
	}

	// Reset repository
	if (options.repository === true) {
		delete content.repository
	}
	else if (typeof options.repository === 'string') {
		content.repository = options.repository
	}

	await outputJson(packagePath, content)
}
