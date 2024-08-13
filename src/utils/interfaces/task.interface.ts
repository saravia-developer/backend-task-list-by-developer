export interface ICreateTask {
  nameTask: string;
  description: string;
  isCompleted: boolean;
  estimatedTime: number;
  category: number;
}

export interface IUpdateTask extends Partial<ICreateTask> {}