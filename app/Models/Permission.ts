import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: string
}
