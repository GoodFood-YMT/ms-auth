import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Permissions } from 'App/Enums/Permissions'
import { Roles } from 'App/Enums/Roles'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {
    await this.createPermissions()
    await this.createRoles()
    await this.createRolePermissions()
  }

  private async createPermissions() {
    for (const permission of Object.values(Permissions)) {
      if (await Permission.findBy('id', permission)) continue
      await Permission.create({ id: permission })
    }
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
    const customerRole = await Role.findOrFail(Roles.CUSTOMER)
    if (customerRole) {
      customerRole.related('permissions').createMany([{ id: Permissions.PRODUCT_CATEGORY_CREATE }])
    }
  }
}
