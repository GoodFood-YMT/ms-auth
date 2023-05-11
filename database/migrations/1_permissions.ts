import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('category', 100).notNullable()
      table.string('type', 100).notNullable()

      table.unique(['category', 'type'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
