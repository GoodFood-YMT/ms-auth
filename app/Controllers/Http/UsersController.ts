import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class UsersController {
  public async login({}: HttpContextContract) {}

  public async register({ request, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = new User()
    user.email = payload.email
    user.firstname = payload.firstname
    user.lastname = payload.lastname
    user.password = payload.password
    await user.save()

    const token = await auth.use('api').attempt(payload.email, payload.password)
    return token
  }

  public async update({}: HttpContextContract) {}

  public async logout({}: HttpContextContract) {}
}
