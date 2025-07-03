
import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';
import { TaskStats } from '@/components/TaskStats';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskDialog } from '@/components/TaskDialog';
import { KanbanBoard } from '@/components/KanbanBoard';
import { TaskList } from '@/components/TaskList';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, LayoutGrid, List, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const {
    filteredTasks,
    filters,
    setFilters,
    taskStats,
    assignees,
    addTask,
    updateTask,
    deleteTask,
    moveTask
  } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [activeTab, setActiveTab] = useState('kanban');

  const handleCreateTask = () => {
    setEditingTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted.",
    });
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    addTask(taskData);
    toast({
      title: "Task created",
      description: "New task has been successfully created.",
    });
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    updateTask(id, updates);
    toast({
      title: "Task updated",
      description: "The task has been successfully updated.",
    });
  };

  const handleMoveTask = (taskId: string, newStatus: Task['status']) => {
    moveTask(taskId, newStatus);
    toast({
      title: "Task moved",
      description: `Task status updated to ${newStatus.replace('-', ' ')}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                Task Management Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Organize, track, and manage your team's tasks efficiently
              </p>
            </div>
            <Button 
              onClick={handleCreateTask}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        {/* Stats */}
        <TaskStats stats={taskStats} />

        {/* Filters */}
        <TaskFilters 
          filters={filters} 
          onFiltersChange={setFilters} 
          assignees={assignees} 
        />

        {/* Task Views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6 bg-white border border-gray-200 shadow-sm">
            <TabsTrigger 
              value="kanban" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <LayoutGrid className="h-4 w-4" />
              Kanban Board
            </TabsTrigger>
            <TabsTrigger 
              value="list"
              className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <List className="h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="space-y-4">
            <KanbanBoard
              tasks={filteredTasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onMoveTask={handleMoveTask}
            />
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <TaskList
              tasks={filteredTasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </TabsContent>
        </Tabs>

        {/* Task Dialog */}
        <TaskDialog
          onSave={handleSaveTask}
          onUpdate={handleUpdateTask}
          task={editingTask}
          assignees={assignees}
        />
      </div>
    </div>
  );
};

export default Index;
