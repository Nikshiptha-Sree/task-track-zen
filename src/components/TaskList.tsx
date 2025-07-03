
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList = ({ tasks, onEditTask, onDeleteTask }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="text-gray-400 mb-4">
            <List className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm">Try adjusting your filters or create a new task</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
          <List className="h-5 w-5" />
          Tasks ({tasks.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
