
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Plus, Trash2, Calendar as CalendarIcon, List } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  frequency: string;
}

interface CalendarActivity {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
}

interface JobPlanActivitiesProps {
  activities: Activity[];
  calendarActivities: CalendarActivity[];
  updateFormData: (section: string, data: any) => void;
}

const JobPlanActivities = ({ activities, calendarActivities, updateFormData }: JobPlanActivitiesProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    duration: '',
    frequency: ''
  });
  const [newCalendarActivity, setNewCalendarActivity] = useState({
    title: '',
    time: '',
    duration: ''
  });

  const addActivity = () => {
    if (newActivity.title.trim()) {
      const activity = {
        id: Date.now().toString(),
        ...newActivity
      };
      updateFormData('activities', [...activities, activity]);
      setNewActivity({ title: '', description: '', duration: '', frequency: '' });
    }
  };

  const addCalendarActivity = () => {
    if (newCalendarActivity.title.trim() && selectedDate) {
      const activity = {
        id: Date.now().toString(),
        date: selectedDate,
        ...newCalendarActivity
      };
      updateFormData('calendarActivities', [...calendarActivities, activity]);
      setNewCalendarActivity({ title: '', time: '', duration: '' });
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
      activity.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Job Plan Activities</h3>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">
            <List className="h-4 w-4 mr-2" />
            List View
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add New Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="actTitle">Activity Title *</Label>
                  <Input
                    id="actTitle"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Outpatient clinic"
                  />
                </div>
                
                <div>
                  <Label htmlFor="actDuration">Duration</Label>
                  <Input
                    id="actDuration"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 3 hours"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="actDescription">Description</Label>
                <Textarea
                  id="actDescription"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description of the activity"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="actFrequency">Frequency</Label>
                <Input
                  id="actFrequency"
                  value={newActivity.frequency}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, frequency: e.target.value }))}
                  placeholder="e.g., Weekly, Twice per week"
                />
              </div>
              
              <Button onClick={addActivity} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </CardContent>
          </Card>

          {activities.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Activities List ({activities.length})</h4>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-medium">{activity.title}</h5>
                          {activity.description && (
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                          )}
                          <div className="flex space-x-4 mt-2 text-sm text-blue-600">
                            {activity.duration && <span>Duration: {activity.duration}</span>}
                            {activity.frequency && <span>Frequency: {activity.frequency}</span>}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeActivity(activity.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Select Date & Add Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                
                {selectedDate && (
                  <div className="mt-4 space-y-3">
                    <p className="font-medium">
                      Add activity for {selectedDate.toLocaleDateString()}
                    </p>
                    <Input
                      placeholder="Activity title"
                      value={newCalendarActivity.title}
                      onChange={(e) => setNewCalendarActivity(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <Input
                      type="time"
                      placeholder="Time"
                      value={newCalendarActivity.time}
                      onChange={(e) => setNewCalendarActivity(prev => ({ ...prev, time: e.target.value }))}
                    />
                    <Input
                      placeholder="Duration (e.g., 2 hours)"
                      value={newCalendarActivity.duration}
                      onChange={(e) => setNewCalendarActivity(prev => ({ ...prev, duration: e.target.value }))}
                    />
                    <Button onClick={addCalendarActivity} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {selectedDate ? `Activities for ${selectedDate.toLocaleDateString()}` : 'Select a date'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate && (
                  <div className="space-y-3">
                    {getActivitiesForDate(selectedDate).map((activity) => (
                      <div key={activity.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-gray-600">
                            {activity.time} • {activity.duration}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeCalendarActivity(activity.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {getActivitiesForDate(selectedDate).length === 0 && (
                      <p className="text-gray-500 text-center py-4">No activities scheduled</p>
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
