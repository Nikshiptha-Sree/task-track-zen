
import { useState, useMemo } from 'react';
import { Task, TaskFilters, TaskStats } from '@/types/task';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design System Setup',
    description: 'Create design tokens and component library foundation',
    status: 'completed',
    priority: 'high',
    assignee: 'Sarah Chen',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    dueDate: new Date('2024-01-25')
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Connect frontend with backend services and handle authentication',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Alex Rodriguez',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-22'),
    dueDate: new Date('2024-01-30')
  },
  {
    id: '3',
    title: 'User Testing',
    description: 'Conduct usability testing sessions with target users',
    status: 'pending',
    priority: 'medium',
    assignee: 'Maria Santos',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    dueDate: new Date('2024-02-05')
  },
  {
    id: '4',
    title: 'Performance Optimization',
    description: 'Optimize bundle size and improve loading times',
    status: 'pending',
    priority: 'low',
    assignee: 'David Kim',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    dueDate: new Date('2024-02-10')
  },
  {
    id: '5',
    title: 'Mobile Responsiveness',
    description: 'Ensure all components work perfectly on mobile devices',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Lisa Wang',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-23'),
    dueDate: new Date('2024-02-01')
  },
  {
    id: '6',
    title: 'Documentation',
    description: 'Write comprehensive documentation for the project',
    status: 'pending',
    priority: 'low',
    assignee: 'John Smith',
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23'),
    dueDate: new Date('2024-02-15')
  }
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    search: ''
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesStatus = filters.status === 'all' || task.status === filters.status;
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      const matchesAssignee = filters.assignee === 'all' || task.assignee === filters.assignee;
      const matchesSearch = filters.search === '' || 
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase());

      return matchesStatus && matchesPriority && matchesAssignee && matchesSearch;
    });
  }, [tasks, filters]);

  const taskStats = useMemo((): TaskStats => {
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      highPriority: tasks.filter(t => t.priority === 'high').length,
      mediumPriority: tasks.filter(t => t.priority === 'medium').length,
      lowPriority: tasks.filter(t => t.priority === 'low').length,
    };
  }, [tasks]);

  const assignees = useMemo(() => {
    const uniqueAssignees = Array.from(new Set(tasks.map(task => task.assignee)));
    return uniqueAssignees.sort();
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    updateTask(taskId, { status: newStatus });
  };

  return {
    tasks,
    filteredTasks,
    filters,
    setFilters,
    taskStats,
    assignees,
    addTask,
    updateTask,
    deleteTask,
    moveTask
  };
};
