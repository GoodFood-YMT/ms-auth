import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Roles } from 'App/Enums/Roles'
import User from 'App/Models/User'
import UpdateRoleValidator from 'App/Validators/UpdateRoleValidator'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    // TODO : Check Permission

    const page = request.input('page', 1)
    const limit = 10

    const users = await User.query().paginate(page, limit)

    return users
  }

  public async show({ request }: HttpContextContract) {
    // TODO : Check Permission

    const id = request.param('id')

    const user = await User.findOrFail(id)

    return {
      ...user.toJSON(),
    }
  }

  public async update({ request }: HttpContextContract) {
    // TODO : Check Permission

    const id = request.param('id')
    const payload = await request.validate(UpdateRoleValidator)

    if (
      (payload.roleId === Roles.MANAGER || payload.roleId === Roles.DELIVERER) &&
      !payload.restaurantId
    ) {
      throw new Error('restaurantId is required for this role')
    }

    const user = await User.findOrFail(id)

    user.roleId = payload.roleId
    user.restaurantId = payload.restaurantId ? payload.restaurantId : null
    await user.save()

    return {
      ...user.toJSON(),
    }
  }
}
