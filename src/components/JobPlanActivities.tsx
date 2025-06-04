
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Plus, Trash2, Calendar as CalendarIcon, List } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  frequency: string;
  category: 'DCC' | 'SPA' | 'Admin' | 'Research' | 'Teaching' | 'Other';
  date?: Date;
  time?: string;
}

interface JobPlanActivitiesProps {
  activities: Activity[];
  calendarActivities: Activity[];
  updateFormData: (section: string, data: any) => void;
}

const JobPlanActivities = ({ activities, calendarActivities, updateFormData }: JobPlanActivitiesProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    duration: '',
    frequency: '',
    category: 'DCC' as const
  });
  const [newCalendarActivity, setNewCalendarActivity] = useState({
    title: '',
    time: '',
    duration: '',
    category: 'DCC' as const
  });

  // Combine all activities for unified view
  const allActivities = [...activities, ...calendarActivities];

  const addActivity = () => {
    if (newActivity.title.trim()) {
      const activity = {
        id: Date.now().toString(),
        ...newActivity
      };
      updateFormData('activities', [...activities, activity]);
      setNewActivity({ title: '', description: '', duration: '', frequency: '', category: 'DCC' });
    }
  };

  const addCalendarActivity = () => {
    if (newCalendarActivity.title.trim() && selectedDate) {
      const activity = {
        id: Date.now().toString(),
        date: selectedDate,
        ...newCalendarActivity,
        description: '',
        frequency: ''
      };
      updateFormData('calendarActivities', [...calendarActivities, activity]);
      setNewCalendarActivity({ title: '', time: '', duration: '', category: 'DCC' });
    }
  };

  const removeActivity = (id: string) => {
    updateFormData('activities', activities.filter(act => act.id !== id));
  };

  const removeCalendarActivity = (id: string) => {
    updateFormData('calendarActivities', calendarActivities.filter(act => act.id !== id));
  };

  const getActivitiesForDate = (date: Date) => {
    return calendarActivities.filter(activity => 
      activity.date && activity.date.toDateString() === date.toDateString()
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DCC': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SPA': return 'bg-green-100 text-green-800 border-green-200';
      case 'Admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Research': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Teaching': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-lg font-semibold">Job Plan Activities</h3>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list" className="flex items-center gap-1 sm:gap-2">
            <List className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">List View</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-1 sm:gap-2">
            <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Calendar View</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm sm:text-base">Add New Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="actTitle" className="text-xs sm:text-sm">Activity Title *</Label>
                  <Input
                    id="actTitle"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Outpatient clinic"
                    className="text-xs sm:text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="actCategory" className="text-xs sm:text-sm">Category *</Label>
                  <Select value={newActivity.category} onValueChange={(value) => setNewActivity(prev => ({ ...prev, category: value as any }))}>
                    <SelectTrigger className="text-xs sm:text-sm">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DCC">DCC - Direct Clinical Care</SelectItem>
                      <SelectItem value="SPA">SPA - Supporting Professional Activities</SelectItem>
                      <SelectItem value="Admin">Administrative</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Teaching">Teaching</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="actDuration" className="text-xs sm:text-sm">Duration</Label>
                  <Input
                    id="actDuration"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 3 hours"
                    className="text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="actFrequency" className="text-xs sm:text-sm">Frequency</Label>
                  <Input
                    id="actFrequency"
                    value={newActivity.frequency}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, frequency: e.target.value }))}
                    placeholder="e.g., Weekly, Twice per week"
                    className="text-xs sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="actDescription" className="text-xs sm:text-sm">Description</Label>
                <Textarea
                  id="actDescription"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description of the activity"
                  rows={3}
                  className="text-xs sm:text-sm"
                />
              </div>
              
              <Button onClick={addActivity} className="w-full text-xs sm:text-sm">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Add Activity
              </Button>
            </CardContent>
          </Card>

          {allActivities.length > 0 && (
            <div>
              <h4 className="font-medium mb-3 text-sm sm:text-base">All Activities ({allActivities.length})</h4>
              <div className="space-y-3">
                {allActivities.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="pt-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h5 className="font-medium text-sm sm:text-base">{activity.title}</h5>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getCategoryColor(activity.category)}`}>
                              {activity.category}
                            </span>
                          </div>
                          {activity.description && (
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">{activity.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-blue-600">
                            {activity.duration && <span>Duration: {activity.duration}</span>}
                            {activity.frequency && <span>Frequency: {activity.frequency}</span>}
                            {activity.date && <span>Date: {activity.date.toLocaleDateString()}</span>}
                            {activity.time && <span>Time: {activity.time}</span>}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => activity.date ? removeCalendarActivity(activity.id) : removeActivity(activity.id)}
                          className="text-xs sm:text-sm"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Select Date & Add Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                />
                
                {selectedDate && (
                  <div className="mt-4 space-y-3">
                    <p className="font-medium text-sm sm:text-base">
                      Add activity for {selectedDate.toLocaleDateString()}
                    </p>
                    <Input
                      placeholder="Activity title"
                      value={newCalendarActivity.title}
                      onChange={(e) => setNewCalendarActivity(prev => ({ ...prev, title: e.target.value }))}
                      className="text-xs sm:text-sm"
                    />
                    <Select 
                      value={newCalendarActivity.category} 
                      onValueChange={(value) => setNewCalendarActivity(prev => ({ ...prev, category: value as any }))}
                    >
                      <SelectTrigger className="text-xs sm:text-sm">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DCC">DCC</SelectItem>
                        <SelectItem value="SPA">SPA</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="Teaching">Teaching</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="time"
                      placeholder="Time"
                      value={newCalendarActivity.time}
                      onChange={(e) => setNewCalendarActivity(prev => ({ ...prev, time: e.target.value }))}
                      className="text-xs sm:text-sm"
                    />
                    <Input
                      placeholder="Duration (e.g., 2 hours)"
                      value={newCalendarActivity.duration}
                      onChange={(e) => setNewCalendarActivity(prev => ({ ...prev, duration: e.target.value }))}
                      className="text-xs sm:text-sm"
                    />
                    <Button onClick={addCalendarActivity} className="w-full text-xs sm:text-sm">
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">
                  {selectedDate ? `Activities for ${selectedDate.toLocaleDateString()}` : 'Select a date'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate && (
                  <div className="space-y-3">
                    {getActivitiesForDate(selectedDate).map((activity) => (
                      <div key={activity.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border rounded-lg gap-2">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <p className="font-medium text-sm sm:text-base">{activity.title}</p>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getCategoryColor(activity.category)}`}>
                              {activity.category}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {activity.time} • {activity.duration}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeCalendarActivity(activity.id)}
                          className="text-xs sm:text-sm"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    ))}
                    {getActivitiesForDate(selectedDate).length === 0 && (
                      <p className="text-gray-500 text-center py-4 text-xs sm:text-sm">No activities scheduled</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobPlanActivities;
