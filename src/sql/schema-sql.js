import { DB as Database } from '../db/config/config.js'

class QuerySchema {

  constructor(schema) {
    this.schema = schema
  }

  async findOne(columnArray, columns = "") {
    const attr = columns === "" ? "*" : columns
    const query = `SELECT ${attr} FROM ${this.schema}`

    if (columnArray.length > 0)
      return this.#mountQuerySelectSQL(columnArray, query)
    return { rows: [] }
  }
  async insertOne(columnObj, columns = "") {
    const attr = columns === "" ? "*" : columns
    const query = `INSERT INTO ${this.schema} (${attr}) VALUES`

    if (!this.#isEmptyObj(columnObj))
      return this.#mountQueryInsertSQL(columnObj, query)

    return { rows: [] }
  }
  async update(columns, columnObj, condition = []) {
    const query = `UPDATE ${this.schema} SET`
    if (!(this.#isEmptyObj(columnObj)) && !(columns === ""))
      return this.#mountQueryUpdateSQL(columnObj, columns, query, condition)
    return { rows: [] }
  }
  async delete(condition){
    let query = `DELETE FROM ${this.schema}`
    query = this.#addWhereInQuerySQL(condition, query)
    return await this.#exec(query)

  }

  async #mountQuerySelectSQL(columnArray, query) {
    query = this.#addWhereInQuerySQL(columnArray, query)
    return await this.#exec(query)
  }
  async #mountQueryInsertSQL(columnObj, query) {
    let queryPart = ""
    let newValue  = ""
    const columnsArray = Object.keys(columnObj).map(key => columnObj[key])
    
    columnsArray.forEach((value, index) => {
      newValue = this.#handlingQuerySQL(typeof value, value)
      queryPart += newValue

      if (index < (columnsArray.length - 1))
        queryPart = " " + queryPart + ","
    })
    query += " " + "(" + queryPart + ") RETURNING id"
    return await this.#exec(query)
  }
  async #mountQueryUpdateSQL(columnObj, attrStr, query, condition = []) {
    let newQuery  = ""
    let queryPart = ""

    const fn = (value, index, columnsArray, attrArray) => {
      let newValue = this.#handlingQuerySQL(typeof value, value)
      const attr = attrArray[index]
      queryPart = " " + attr + "=" + newValue

      if (index < (columnsArray.length - 1))
        queryPart = queryPart + ","
      return queryPart
    }

    newQuery = await this.#mountAttQuery(columnObj, attrStr, fn)
    newQuery = query + " " + newQuery
    newQuery = this.#addWhereInQuerySQL(condition, newQuery)
    return await this.#exec(newQuery)
  }
  async #exec(query) {
    try {
      const client = await Database.connect()
      const response = await client.query(query)
      client.release()
      return response
    } catch (error) {
      console.log(error.stack)
      return error
    }
  }

  #addWhereInQuerySQL(columnArray, query) {
    let newQuery = query

    if (columnArray.length > 0) {
      newQuery += " " + "WHERE"
      columnArray.forEach((column, index) => {
        const name = Object.keys(column)[0]
        const value = Object.values(column)[0]

        let newValue = this.#handlingQuerySQL(typeof value, value)
        let queryPart = `${name} = ${newValue}`

        if (index !== 0)
          queryPart = "and" + " " + queryPart

        newQuery += " " + queryPart
      });
    }

    return newQuery
  }
  #handlingQuerySQL(valueType, value) {
    return valueType === 'string' ? `'${value}'` : value
  }
  #isEmptyObj(obj) {
    return Object.keys(obj).length === 0
  }
  async #mountAttQuery(columnObj, attr, fn) {
    let queryPart = ""
    const columnsArray = Object.keys(columnObj).map(key => columnObj[key])
    const attrArray = (attr.trim()).split(',')
    const size = columnsArray.length === attrArray.length ? true : false
    
    if (size) {
      columnsArray.forEach((value, index) => {
        const response = fn(value, index, columnsArray, attrArray)
        queryPart += response
      })
      return queryPart
    }
  } 
}
export default QuerySchema;