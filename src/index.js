import path from 'path'
import { readJson, outputJson } from 'fs-extra'

export default async function(options = {}){
	options = {
		path: 'package.json',
		dirName: true,
		version: '0.0.0',
		repository: true,
		...options
	}

	const content = await readJson(options.path)

	// Change name
	if(options.name){
		content.name = options.name
	}
	else if(options.dirName){
		let name = process.cwd()
		name = path.parse(name)
		name = name.base
		content.name = name
	}

	// Reset version
	if(options.version){
		content.version = options.version
	}

	// Reset repository
	if(options.repository === true){
		delete content.repository
	}
	else if(typeof options.repository === 'string'){
		content.repository = options.repository
	}

	await outputJson(options.path, content)
	return content
}
