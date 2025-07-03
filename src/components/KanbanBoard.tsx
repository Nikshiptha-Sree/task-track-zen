
import { useState } from 'react';
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KanbanBoardProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onMoveTask: (taskId: string, newStatus: Task['status']) => void;
}

const statusConfig = {
  pending: {
    title: 'Pending',
    icon: AlertCircle,
    color: 'bg-gray-100 border-gray-300',
    headerColor: 'text-gray-700',
    badgeColor: 'bg-gray-500'
  },
  'in-progress': {
    title: 'In Progress',
    icon: Clock,
    color: 'bg-blue-50 border-blue-300',
    headerColor: 'text-blue-700',
    badgeColor: 'bg-blue-500'
  },
  completed: {
    title: 'Completed',
    icon: CheckCircle,
    color: 'bg-emerald-50 border-emerald-300',
    headerColor: 'text-emerald-700',
    badgeColor: 'bg-emerald-500'
  }
};

export const KanbanBoard = ({ tasks, onEditTask, onDeleteTask, onMoveTask }: KanbanBoardProps) => {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<Task['status'] | null>(null);

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    if (draggedTask) {
      onMoveTask(draggedTask, status);
      setDraggedTask(null);
      setDragOverColumn(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {(Object.keys(statusConfig) as Task['status'][]).map((status) => {
        const config = statusConfig[status];
        const statusTasks = getTasksByStatus(status);
        const Icon = config.icon;
        
        return (
          <Card 
            key={status}
            className={cn(
              "transition-all duration-200",
              config.color,
              dragOverColumn === status && "ring-2 ring-blue-400 ring-opacity-50 scale-105"
            )}
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, status)}
          >
            <CardHeader className="pb-4">
              <CardTitle className={cn("flex items-center justify-between text-lg", config.headerColor)}>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span>{config.title}</span>
                </div>
                <Badge className={cn("text-white", config.badgeColor)}>
                  {statusTasks.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3 min-h-[400px]">
              {statusTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                  className="cursor-move"
                >
                  <TaskCard
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    isDragging={draggedTask === task.id}
                    className="hover:shadow-md transition-shadow"
                  />
                </div>
              ))}
              
              {statusTasks.length === 0 && (
                <div className="flex items-center justify-center h-32 text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-lg">
                  Drop tasks here
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
