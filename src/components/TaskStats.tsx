
import { TaskStats as TaskStatsType } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, BarChart3 } from 'lucide-react';

interface TaskStatsProps {
  stats: TaskStatsType;
}

export const TaskStats = ({ stats }: TaskStatsProps) => {
  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
  const inProgressRate = stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">Total Tasks</CardTitle>
          <BarChart3 className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
          <p className="text-xs text-blue-600 mt-1">
            Active projects
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-700">Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-900">{stats.completed}</div>
          <div className="mt-2">
            <Progress value={completionRate} className="h-2" />
          </div>
          <p className="text-xs text-emerald-600 mt-1">
            {completionRate.toFixed(1)}% completion rate
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-yellow-700">In Progress</CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-900">{stats.inProgress}</div>
          <div className="mt-2">
            <Progress value={inProgressRate} className="h-2" />
          </div>
          <p className="text-xs text-yellow-600 mt-1">
            {inProgressRate.toFixed(1)}% in progress
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-700">High Priority</CardTitle>
          <AlertCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-900">{stats.highPriority}</div>
          <p className="text-xs text-red-600 mt-1">
            Urgent attention needed
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
