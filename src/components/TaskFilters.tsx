
import { TaskFilters as TaskFiltersType } from '@/types/task';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
  assignees: string[];
}

export const TaskFilters = ({ filters, onFiltersChange, assignees }: TaskFiltersProps) => {
  const updateFilter = (key: keyof TaskFiltersType, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="mb-6 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="font-medium text-gray-700">Filters</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-9 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.priority} onValueChange={(value) => updateFilter('priority', value)}>
            <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.assignee} onValueChange={(value) => updateFilter('assignee', value)}>
            <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="All Assignees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              {assignees.map((assignee) => (
                <SelectItem key={assignee} value={assignee}>
                  {assignee}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
