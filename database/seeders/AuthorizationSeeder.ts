import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Roles } from 'App/Enums/Roles'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {
    await this.createPermissions()
    await this.createRoles()
    await this.createRolePermissions()
  }

  private async createPermissions() {
    // await Permission.updateOrCreateMany('id', [
    //   {
    //     name: 'Get list of restaurants',
    //     category: 'restaurants',
    //     type: 'GET',
    //   },
    // ])
  }

  private async createRoles() {
    await Role.updateOrCreateMany('id', [
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
      {
        id: Roles.MANAGER,
        name: 'Manager',
      },
      {
        id: Roles.DELIVERER,
        name: 'Deliverer',
      },
      {
        id: Roles.CUSTOMER,
        name: 'Customer',
      },
    ])
  }

  private async createRolePermissions() {
    // const adminRole = await Role.findOrFail(Roles.ADMIN)
    // adminRole.related('permissions').createMany([{ id: 'restaurants.GET' }])
  }
}
