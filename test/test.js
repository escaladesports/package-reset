import { expect } from 'chai'
import { copy, remove, readJson, pathExists, outputFile, readFile } from 'fs-extra'

import packageReset from '../src'

const options = {
	path: 'test/',
	package: false,
	git: false,
	readme: false,
}

describe('Reset package.json', async () => {
	let contents
	before(async () => {
		await copy('test/package.json', 'test/package-test.json')
		await packageReset({
			...options,
			package: 'package-test.json',
		})
		contents = await readJson('test/package-test.json')
	})
	after(async () => {
		await remove('test/package-test.json')
	})

	it('should change name', () => {
		expect(contents.name).to.equal('package-reset')
	})
	it('should reset version', () => {
		expect(contents.version).to.equal('0.0.0')
	})
	it('should remove repo', () => {
		expect(contents).to.not.have.property('repository')
	})
})


describe('Delete readme', async () => {
	it('should delete README.md', async () => {
		// Create readme
		await outputFile('test/README.md', '# Test Readme')
		let exists = await pathExists('test/README.md')
		expect(exists).to.equal(true)

		// Reset
		await packageReset({
			...options,
			readme: true,
		})
		exists = await pathExists('test/README.md')
		expect(exists).to.equal(false)
	})
})

describe('Reset git', async () => {
	it('should reset .git', async () => {
		// Create original .git content
		await outputFile('test/.git/test', 'original')
		let contents = await readFile('test/.git/test')
		contents = contents.toString()
		expect(contents).to.equal('original')

		// Reset
		await packageReset({
			...options,
			git: true,
			quiet: true,
		})
		let exists = await pathExists('test/.git/test')
		expect(exists).to.equal(false)
		exists = await pathExists('test/.git/HEAD')
		expect(exists).to.equal(true)

		// Clean up
		await remove('test/.git')
	})
})