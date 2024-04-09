import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Roles } from 'App/Enums/Roles'
import User from 'App/Models/User'

interface UserSeed {
  email: string
  password: string
  firstname: string
  lastname: string
  roleId: Roles
  restaurantId?: string
}

const users: UserSeed[] = [
  {
    email: 'admin@goodfood.com',
    password: 'admin',
    firstname: 'Admin',
    lastname: 'GoodFood',
    roleId: Roles.ADMIN,
  },
  {
    email: 'macdo@goodfood.com',
    password: 'macdo',
    firstname: 'Mac',
    lastname: 'Donald',
    roleId: Roles.MANAGER,
    restaurantId: 'clpbalmx2000008ju7wmv35yg',
  },
  {
    email: 'macdo-deliverer@goodfood.com',
    password: 'macdo',
    firstname: 'Mac',
    lastname: 'Donald',
    roleId: Roles.DELIVERER,
    restaurantId: 'clpbalmx2000008ju7wmv35yg',
  },

  {
    email: 'customer@goodfood.com',
    password: 'customer',
    firstname: 'John',
    lastname: 'Doe',
    roleId: Roles.CUSTOMER,
  },
]

export default class extends BaseSeeder {
  public async run() {
    for (const user of users) {
      if (await User.findBy('email', user.email)) {
        continue
      }

      await User.create(user)
    }
  }
}
