import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public category: string

  @column()
  public type: string

  @beforeCreate()
  public static async setId(permission: Permission) {
    permission.id = `${permission.category}.${permission.type}`
  }
}
