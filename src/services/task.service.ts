import { database } from "../config/database";
import { ICreateTask, IUpdateTask } from "../utils/interfaces/task.interface";

const table = "task";
const alias = "t"  

export class TaskServices {
  static async getTask() {
    try {
      const query = `SELECT t.task_id, t.name_task, t.description, t.estimated_time, c.name_category  FROM ${table} ${alias} JOIN categories c ON t.category = c.category_id ORDER BY t.task_id DESC;`;
      const result = await database.query(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async createTask({
    nameTask,
    description,
    isCompleted,
    estimatedTime,
    category,
  }: ICreateTask) {
    try {
      const query = `INSERT INTO ${table} (name_task, description, is_completed, estimated_time, category) VALUES (?, ?, ?, ?, ?)`;
      const values = [
        nameTask,
        description,
        isCompleted,
        estimatedTime,
        category,
      ];
      const result = await database.query(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateTask(
    id: number,
    { nameTask, description, isCompleted, estimatedTime, category }: IUpdateTask
  ) {
    try {
      const attributeModified = [
        nameTask && `name_task = '${nameTask}'`,
        description && `description = '${description}'`,
        isCompleted && `description = '${isCompleted}'`,
        estimatedTime && `estimated_time = '${estimatedTime}'`,
        category && `category = '${category}'`,
      ]
        .filter((e) => e)
        .join(", ");
      const query = `UPDATE ${table} SET ${attributeModified} WHERE task_id = ${id}`;
      const result = await database.query(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTask(id: number) {
    try {
      const query = `DELETE FROM ${table} WHERE task_id = ${id}`;
      const result = await database.query(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
