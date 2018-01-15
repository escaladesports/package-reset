import { expect } from 'chai'
import { copy, remove, readJson } from 'fs-extra'

import packageReset from '../src'

describe('Reset package.json', () => {
	let contents
	before(async () => {
		await copy('test/package.json', 'test/package-test.json')
		await packageReset({ path: 'test/package-test.json' })
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