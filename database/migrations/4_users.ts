import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { Roles } from 'App/Enums/Roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('firstname', 100).notNullable()
      table.string('lastname', 100).notNullable()
      table.string('password', 180).notNullable()

      table
        .string('role_id')
        .defaultTo(Roles.CUSTOMER)
        .references('roles.id')
        .onDelete('SET DEFAULT')

      table.string('restaurant_id').nullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
