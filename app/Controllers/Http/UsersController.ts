import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Roles } from 'App/Enums/Roles'
import User from 'App/Models/User'
import UpdateRoleValidator from 'App/Validators/UpdateRoleValidator'

export default class UsersController {
  public async index({}: HttpContextContract) {
    // TODO : Check Permission

    const users = await User.all()

    return {
      users,
    }
  }

  public async show({ request }: HttpContextContract) {
    // TODO : Check Permission

    const id = request.param('id')

    const user = await User.findOrFail(id)

    return {
      user,
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
      throw new Error('Restaurant id is required for this role')
    }

    const user = await User.findOrFail(id)

    user.roleId = payload.roleId
    if (payload.restaurantId) {
      user.restaurantId = payload.restaurantId
    }
    await user.save()

    return {
      user,
    }
  }
}
