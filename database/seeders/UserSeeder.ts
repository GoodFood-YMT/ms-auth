import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Roles } from 'App/Enums/Roles'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'admin@goodfood.com',
      password: 'admin',
      firstname: 'Admin',
      lastname: 'GoodFood',
      roleId: Roles.ADMIN,
    })

    await User.create({
      email: 'macdo@goodfood.com',
      password: 'macdo',
      firstname: 'Mac',
      lastname: 'Donald',
      roleId: Roles.MANAGER,
      restaurantId: 'clpbalmx2000008ju7wmv35yg',
    })

    await User.create({
      email: 'macdo-deliverer@goodfood.com',
      password: 'macdo',
      firstname: 'Mac',
      lastname: 'Donald',
      roleId: Roles.DELIVERER,
      restaurantId: 'clpbalmx2000008ju7wmv35yg',
    })

    await User.create({
      email: 'customer@goodfood.com',
      password: 'customer',
      firstname: 'John',
      lastname: 'Doe',
      roleId: Roles.CUSTOMER,
    })
  }
}
