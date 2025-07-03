
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface TaskFilters {
  status: string;
  priority: string;
  assignee: string;
  search: string;
}

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
}
