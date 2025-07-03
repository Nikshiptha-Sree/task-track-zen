
import { useState } from 'react';
import { Task } from '@/types/task';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Edit, Trash2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
  className?: string;
}

const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-800 border-gray-200',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-emerald-100 text-emerald-800 border-emerald-200'
};

export const TaskCard = ({ task, onEdit, onDelete, isDragging, className }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const isOverdue = task.dueDate && new Date() > task.dueDate && task.status !== 'completed';

  return (
    <Card 
      className={cn(
        "group transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-l-4",
        task.priority === 'high' && "border-l-red-500",
        task.priority === 'medium' && "border-l-yellow-500",
        task.priority === 'low' && "border-l-green-500",
        isDragging && "opacity-50 rotate-2 shadow-xl",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {task.title}
          </h3>
          <div className={cn(
            "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
            isHovered && "opacity-100"
          )}>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              className="h-7 w-7 p-0 hover:bg-blue-50 hover:text-blue-600"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {task.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={cn("text-xs font-medium", priorityColors[task.priority])}>
            {task.priority}
          </Badge>
          <Badge className={cn("text-xs font-medium", statusColors[task.status])}>
            {task.status.replace('-', ' ')}
          </Badge>
        </div>
        
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{task.assignee}</span>
          </div>
          
          {task.dueDate && (
            <div className={cn(
              "flex items-center gap-1",
              isOverdue && "text-red-600 font-medium"
            )}>
              {isOverdue ? <Clock className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
              <span>
                {isOverdue ? 'Overdue' : 'Due'} {formatDate(task.dueDate)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
