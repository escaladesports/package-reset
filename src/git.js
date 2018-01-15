import { remove } from 'fs-extra'
import cmd from 'node-cmd-promise'

export default async function (options) {
	let gitPath = options.path + '.git'
	await remove(gitPath)
	await cmd(`cd ${options.path} && ls`)
	//await cmd(`cd ${options.path} && git init && git commit -m 'Initial commit'`)
}
