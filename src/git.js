import { remove } from 'fs-extra'
import cmd from 'exeq'

export default async function (options) {
	let gitPath = options.path + '.git'
	let quiet = ''
	if(options.quiet){
		quiet = '--quiet'
	}
	await remove(gitPath)
	await cmd(
		`cd ${options.path}`,
		`rm -rf .git`,
		`git init ${quiet}`,
		`git add .`,
		`git commit -m 'Initial commit' ${quiet}`
	)
}
