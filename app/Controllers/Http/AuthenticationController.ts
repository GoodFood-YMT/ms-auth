import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getRoutePermission } from 'App/Enums/RoutesPermissions'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import { removeLastSlash } from 'App/Utils/String'
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

  public async authorized({ request, auth, response }: HttpContextContract) {
    try {
      console.log(request.headers())
      const fromUrl = request.header('FromUrl')
      const method = request.header('Method')

      if (!fromUrl || !method) {
        throw new Error('Invalid request')
      }

      const requiredPermission = getRoutePermission(removeLastSlash(fromUrl), method)

      if (!requiredPermission) {
        return response.status(200).json({})
      }

      await auth.use('api').authenticate()

      if (!auth.user) {
        throw new Error('User not found')
      }

      const role = await Role.findByOrFail('id', auth.user.roleId)
      const permissions = await role.related('permissions').query()

      const havePermission = permissions.some((permission) => permission.id === requiredPermission)

      if (!havePermission) {
        throw new Error("You don't have permission to access this route")
      }

      response.header('UserID', `${auth.user?.id}`)

      return response.status(200).json({
        id: auth.user?.id,
      })
    } catch {
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
