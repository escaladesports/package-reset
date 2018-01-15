import { remove } from 'fs-extra'

export default async function (options) {
	let readmePath = options.path + 'README.md'
	await remove(readmePath)
}
