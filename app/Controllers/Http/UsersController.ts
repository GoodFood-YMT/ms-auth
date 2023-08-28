import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Permissions } from 'App/Enums/Permissions'
import { Roles } from 'App/Enums/Roles'
import User from 'App/Models/User'
import UpdateRoleValidator from 'App/Validators/UpdateRoleValidator'
import RestaurantApi from '../../Api/RestaurantApi'

export default class UsersController {
  public async index({ request, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    if (!auth.user || !auth.user.havePermission(Permissions.USERS_GET)) {
      throw new Error('Unauthorized')
    }

    const page = request.input('page', 1)
    const limit = 10

    if (auth.user.roleId === Roles.MANAGER) {
      return await User.query()
        .where('restaurant_id', auth.user.restaurantId ?? '')
        .paginate(page, limit)
    }

    return await User.query().paginate(page, limit)
  }

  public async show({ request, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    if (!auth.user || !auth.user.havePermission(Permissions.USERS_GET)) {
      throw new Error('Unauthorized')
    }

    const id = request.param('id')

    const user = await User.findOrFail(id)

    return {
      ...user.toJSON(),
    }
  }

  public async update({ request, auth, response }: HttpContextContract) {
    await auth.use('api').authenticate()

    if (!auth.user || !auth.user.havePermission(Permissions.USERS_PUT)) {
      throw new Error('Unauthorized')
    }

    const id = request.param('id')
    const payload = await request.validate(UpdateRoleValidator)

    if (
      (payload.roleId === Roles.MANAGER || payload.roleId === Roles.DELIVERER) &&
      !payload.restaurantId
    ) {
      throw new Error('restaurantId is required for this role')
    }

    if (payload.restaurantId) {
      const restaurantData = await RestaurantApi.getRestaurant(payload.restaurantId)

      if (!restaurantData) {
        return response.status(400).send({
          message: 'Restaurant not found',
        })
      }
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
