import { test } from '@japa/runner'

test.group('Authentication', () => {
  test('should not login the user', async ({ assert, client }) => {
    const response = await client.post('/auth/login').json({
      email: 'test@test.com',
      password: 'test',
    })

    const json = response.body()

    assert.isNotNull(json.errors)
    assert.deepInclude(json.errors, { message: 'Invalid credentials', field: 'email' })
  })
})
