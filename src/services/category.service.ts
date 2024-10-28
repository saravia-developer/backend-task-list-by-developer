import { database } from "../config/database";
import { AppDate } from "../lib/app-date";
import { ICreateCategory, IUpdateCategory } from "../utils/interfaces/category.interface";

const table = 'categories';
const alias = 'c';

export class CategoryServices {

  static async getCategory() {
    try {
      const query = `SELECT ${alias}.category_id, ${alias}.name_category FROM ${table} ${alias}`;
      const result = await database.query(query)
      return result
    } catch (error) {
      throw error
    }
  }

  static async getCategoryById(id: number) {
    try {
      const query = `SELECT ${alias}.category_id, ${alias}.name_category FROM ${table} WHERE category_id=${id}`;
      const result = await database.query(query)
      return result
    } catch (error) {
      throw error
    }
  }

  static async createCategory({ nameCategory }: ICreateCategory) {
    try {
      const query = `INSERT INTO ${table} (name_category, created_at) VALUES (?, ?)`;
      const createdAt = new AppDate().toMYSQLDatetime();
      const values = [nameCategory, createdAt]
      const result = await database.query(query, values)
      return result
    } catch (error) {
      throw error
    }
  }

  static async updateCategory(id: number, { nameCategory }: IUpdateCategory) {
    try {
      const attributeModified = [
        nameCategory && `name_category = '${nameCategory}'`
      ].filter(e => e).join(', ')
      const query = `UPDATE ${table} SET ${attributeModified} WHERE category_id = ${id}`;
      const result = await database.query(query);
      return result 
    } catch (error) {
      throw error
    }
  }

  static async deleteCategory(id: number) {
    try {
      const query = `DELETE FROM ${table} WHERE category_id = ${id}`
      const result = await database.query(query);
      return result
    } catch (error) {
      throw error
    }
  }
}