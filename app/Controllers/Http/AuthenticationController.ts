import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthenticationController {
  public async login({ request, auth, response }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)

    try {
      const token = await auth.use('api').attempt(payload.email, payload.password, {
        expiresIn: '7days',
      })
      return token
    } catch {
      return response.unauthorized({
        errors: [
          {
            message: 'Invalid credentials',
            field: 'email',
          },
        ],
      })
    }
  }

  public async register({ request, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    await User.create(payload)

    const token = await auth.use('api').attempt(payload.email, payload.password, {
      expiresIn: '7days',
    })
    return token
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
  }

  public async me({ auth, response }: HttpContextContract) {
    console.log('Try to authentificate user')
    try {
      await auth.use('api').authenticate()

      console.log('User is authenticated ' + auth.user?.id)

      return response.status(200).json({
        id: auth.user?.id,
      })
    } catch {
      console.log('User is not authenticated')
      return response.status(401).json({
        errors: [
          {
            message: 'Unauthorized',
          },
        ],
      })
    }
  }
}
