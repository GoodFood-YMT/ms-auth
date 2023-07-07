import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Permissions } from 'App/Enums/Permissions'
import { Roles } from 'App/Enums/Roles'
import { RolesPermissions } from 'App/Enums/RolesPermissions'
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
      if (!(await Permission.findBy('id', permission))) {
        await Permission.create({ id: permission })
      }
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
    const adminRole = await Role.findOrFail(Roles.ADMIN)
    const managerRole = await Role.findOrFail(Roles.MANAGER)
    const delivererRole = await Role.findOrFail(Roles.DELIVERER)
    const customerRole = await Role.findOrFail(Roles.CUSTOMER)

    if (adminRole) {
      await this.createPermissionsForRole(adminRole.id, RolesPermissions[Roles.ADMIN])
    }

    if (managerRole) {
      await this.createPermissionsForRole(managerRole.id, RolesPermissions[Roles.MANAGER])
    }

    if (delivererRole) {
      await this.createPermissionsForRole(delivererRole.id, RolesPermissions[Roles.DELIVERER])
    }

    if (customerRole) {
      await this.createPermissionsForRole(customerRole.id, RolesPermissions[Roles.CUSTOMER])
    }
  }

  private async createPermissionsForRole(roleId: string, permissions: string[]) {
    for (const permission of permissions) {
      if (
        (
          await Database.query()
            .from('role_permission')
            .where('role_id', roleId)
            .where('permission_id', permission)
        ).length <= 0
      ) {
        await Database.insertQuery().table('role_permission').insert({
          role_id: roleId,
          permission_id: permission,
        })
      }
    }
  }
}
