import { test } from '@japa/runner'
import { removeLastSlash } from 'App/Utils/String'

test.group('StringUtils', () => {
  test('should remove last slash for a given string', ({ assert }) => {
    const toTest = 'https://google.com/'
    const result = removeLastSlash(toTest)

    assert.equal(result, 'https://google.com')
  })
})
