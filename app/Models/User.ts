import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
  belongsTo,
  BelongsTo,
  afterCreate,
} from '@ioc:Adonis/Lucid/Orm'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Role from 'App/Models/Role'
import Rabbit from '@ioc:Adonis/Addons/Rabbit'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public firstname: string

  @column()
  public lastname: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public restaurantId: string | null

  @column()
  public roleId: string

  @belongsTo(() => Role, {
    foreignKey: 'role_id',
  })
  public role: BelongsTo<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async havePermission(permissionId: string): Promise<boolean> {
    const role = await Role.findByOrFail('id', this.roleId)
    const permissions = await role.related('permissions').query()

    const havePermission = permissions.some((permission) => permission.id === permissionId)

    return havePermission
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async setId(user: User) {
    user.id = cuid()
  }

  @afterCreate()
  public static async sendMail(user: User) {
    await Rabbit.assertQueue('mailing')
    await Rabbit.sendToQueue(
      'mailing',
      JSON.stringify({
        to: user.email,
        subject: 'Welcome to GoodFood',
        text: `Hello ${user.firstname} ${user.lastname}, welcome to our app`,
      })
    )
  }

  @afterCreate()
  public static async sendToEventBus(user: User) {
    await Rabbit.assertQueue('marketing.user.created')
    await Rabbit.sendToQueue(
      'marketing.user.created',
      JSON.stringify({
        userId: user.id,
        createdAt: user.createdAt,
      })
    )
  }
}
