import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Permission from 'App/Models/Permission'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @manyToMany(() => Permission, {
    pivotTable: 'role_permission',
  })
  public permissions: ManyToMany<typeof Permission>

  public hasPermission(permissionId: string): boolean {
    return this.permissions.some((permission) => permission.id === permissionId)
  }

  public hasAllPermissions(permissionIds: string[]): boolean {
    return permissionIds.every((permissionId) => this.hasPermission(permissionId))
  }
}
