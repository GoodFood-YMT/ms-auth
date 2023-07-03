import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
