import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'role_permission'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('role_id').references('roles.id')
      table.string('permission_id').references('permissions.id')
      table.unique(['role_id', 'permission_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
