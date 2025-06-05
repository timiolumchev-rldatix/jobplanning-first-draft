
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
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
  // New fields for timetabled activities
  activityFormat?: 'timetabled' | 'flexible';
  activityType?: 'Core' | 'APA' | 'ATC';
  startTime?: string;
  endTime?: string;
  premiumHours?: number;
  entryMethod?: 'weekly' | 'annualised';
  selectedWeeks?: number[];
  deliveredActivities?: number;
  travelTimeLinked?: boolean;
  activityLocation?: string;
  fromLocation?: string;
  toLocation?: string;
  personalObjective?: string;
  employer?: string;
  comment?: string;
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
    category: 'DCC' as const,
    activityFormat: 'timetabled' as const,
    activityType: 'Core' as const,
    startTime: '',
    endTime: '',
    premiumHours: 0,
    entryMethod: 'weekly' as const,
    selectedWeeks: [] as number[],
    deliveredActivities: 0,
    travelTimeLinked: false,
    activityLocation: '',
    fromLocation: '',
    toLocation: '',
    personalObjective: '',
    employer: '',
    comment: ''
  });
  const [newCalendarActivity, setNewCalendarActivity] = useState({
    title: '',
    time: '',
    duration: '',
    category: 'DCC' as const
  });

  // Sample data for dropdowns
  const personalObjectives = [
    'Improve patient satisfaction',
    'Enhance clinical skills',
    'Research publication',
    'Teaching excellence',
    'Quality improvement'
  ];

  const employers = [
    'NHS Trust A',
    'NHS Trust B',
    'Private Hospital C',
    'University Hospital D'
  ];

  // Combine all activities for unified view
  const allActivities = [...activities, ...calendarActivities];

  const calculatePremiumHours = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return 0;
    
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    
    // Handle overnight shifts
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }
    
    const premiumStart = new Date(`2000-01-01T19:00`);
    const premiumEnd = new Date(`2000-01-02T06:00`);
    
    const overlapStart = new Date(Math.max(start.getTime(), premiumStart.getTime()));
    const overlapEnd = new Date(Math.min(end.getTime(), premiumEnd.getTime()));
    
    if (overlapStart < overlapEnd) {
      return (overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60);
    }
    
    return 0;
  };

  const handleActivityChange = (field: string, value: any) => {
    setNewActivity(prev => {
      const updated = { ...prev, [field]: value };
      
      // Calculate premium hours when start or end time changes
      if (field === 'startTime' || field === 'endTime') {
        const premiumHours = calculatePremiumHours(updated.startTime, updated.endTime);
        updated.premiumHours = premiumHours;
      }
      
      return updated;
    });
  };

  const handleWeekSelection = (week: number, checked: boolean) => {
    setNewActivity(prev => ({
      ...prev,
      selectedWeeks: checked 
        ? [...prev.selectedWeeks, week].sort((a, b) => a - b)
        : prev.selectedWeeks.filter(w => w !== week)
    }));
  };

  const addActivity = () => {
    if (newActivity.title.trim()) {
      const activity = {
        id: Date.now().toString(),
        ...newActivity,
        premiumHours: calculatePremiumHours(newActivity.startTime, newActivity.endTime)
      };
      updateFormData('activities', [...activities, activity]);
      setNewActivity({
        title: '',
        description: '',
        duration: '',
        frequency: '',
        category: 'DCC',
        activityFormat: 'timetabled',
        activityType: 'Core',
        startTime: '',
        endTime: '',
        premiumHours: 0,
        entryMethod: 'weekly',
        selectedWeeks: [],
        deliveredActivities: 0,
        travelTimeLinked: false,
        activityLocation: '',
        fromLocation: '',
        toLocation: '',
        personalObjective: '',
        employer: '',
        comment: ''
      });
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
              {/* Activity Format */}
              <div>
                <Label className="text-xs sm:text-sm">Activity Format *</Label>
                <RadioGroup 
                  value={newActivity.activityFormat} 
                  onValueChange={(value) => handleActivityChange('activityFormat', value)}
                  className="flex flex-row gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="timetabled" id="timetabled" />
                    <Label htmlFor="timetabled" className="text-xs sm:text-sm">Timetabled</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flexible" id="flexible" />
                    <Label htmlFor="flexible" className="text-xs sm:text-sm">Flexible</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="actTitle" className="text-xs sm:text-sm">Activity Title *</Label>
                  <Input
                    id="actTitle"
                    value={newActivity.title}
                    onChange={(e) => handleActivityChange('title', e.target.value)}
                    placeholder="e.g., Outpatient clinic"
                    className="text-xs sm:text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="actCategory" className="text-xs sm:text-sm">Category *</Label>
                  <Select value={newActivity.category} onValueChange={(value) => handleActivityChange('category', value)}>
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
              </div>

              {newActivity.activityFormat === 'timetabled' && (
                <>
                  {/* Activity Type */}
                  <div>
                    <Label className="text-xs sm:text-sm">Activity Type *</Label>
                    <RadioGroup 
                      value={newActivity.activityType} 
                      onValueChange={(value) => handleActivityChange('activityType', value)}
                      className="flex flex-row gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Core" id="core" />
                        <Label htmlFor="core" className="text-xs sm:text-sm">Core</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="APA" id="apa" />
                        <Label htmlFor="apa" className="text-xs sm:text-sm">APA</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ATC" id="atc" />
                        <Label htmlFor="atc" className="text-xs sm:text-sm">ATC</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Time Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime" className="text-xs sm:text-sm">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newActivity.startTime}
                        onChange={(e) => handleActivityChange('startTime', e.target.value)}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime" className="text-xs sm:text-sm">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newActivity.endTime}
                        onChange={(e) => handleActivityChange('endTime', e.target.value)}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Premium Hours Display */}
                  {newActivity.premiumHours && newActivity.premiumHours > 0 && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-yellow-800">
                        Premium time hours (19:00-06:00): {newActivity.premiumHours.toFixed(2)} hours
                      </p>
                    </div>
                  )}

                  {/* Entry Method */}
                  <div>
                    <Label className="text-xs sm:text-sm">Entry Method *</Label>
                    <RadioGroup 
                      value={newActivity.entryMethod} 
                      onValueChange={(value) => handleActivityChange('entryMethod', value)}
                      className="flex flex-row gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly" className="text-xs sm:text-sm">Weekly timetabled</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="annualised" id="annualised" />
                        <Label htmlFor="annualised" className="text-xs sm:text-sm">Annualised</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Weekly Selection */}
                  {newActivity.entryMethod === 'weekly' && (
                    <div>
                      <Label className="text-xs sm:text-sm">Select Weeks (1-26)</Label>
                      <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-13 gap-2 mt-2">
                        {Array.from({ length: 26 }, (_, i) => i + 1).map(week => (
                          <div key={week} className="flex items-center space-x-1">
                            <Checkbox
                              id={`week-${week}`}
                              checked={newActivity.selectedWeeks.includes(week)}
                              onCheckedChange={(checked) => handleWeekSelection(week, checked as boolean)}
                            />
                            <Label htmlFor={`week-${week}`} className="text-xs">{week}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Annualised Activities */}
                  {newActivity.entryMethod === 'annualised' && (
                    <div>
                      <Label htmlFor="deliveredActivities" className="text-xs sm:text-sm">Number of Delivered Activities</Label>
                      <Input
                        id="deliveredActivities"
                        type="number"
                        step="0.1"
                        value={newActivity.deliveredActivities}
                        onChange={(e) => handleActivityChange('deliveredActivities', parseFloat(e.target.value) || 0)}
                        placeholder="e.g., 10.5"
                        className="text-xs sm:text-sm"
                      />
                    </div>
                  )}

                  {/* Location Details */}
                  <div>
                    <Label className="text-xs sm:text-sm">Travel Time Linked *</Label>
                    <RadioGroup 
                      value={newActivity.travelTimeLinked ? 'yes' : 'no'} 
                      onValueChange={(value) => handleActivityChange('travelTimeLinked', value === 'yes')}
                      className="flex flex-row gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="travel-yes" />
                        <Label htmlFor="travel-yes" className="text-xs sm:text-sm">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="travel-no" />
                        <Label htmlFor="travel-no" className="text-xs sm:text-sm">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {newActivity.travelTimeLinked && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="activityLocation" className="text-xs sm:text-sm">Activity Location</Label>
                        <Input
                          id="activityLocation"
                          value={newActivity.activityLocation}
                          onChange={(e) => handleActivityChange('activityLocation', e.target.value)}
                          placeholder="Location name"
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fromLocation" className="text-xs sm:text-sm">From</Label>
                        <Input
                          id="fromLocation"
                          value={newActivity.fromLocation}
                          onChange={(e) => handleActivityChange('fromLocation', e.target.value)}
                          placeholder="Starting location"
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="toLocation" className="text-xs sm:text-sm">To</Label>
                        <Input
                          id="toLocation"
                          value={newActivity.toLocation}
                          onChange={(e) => handleActivityChange('toLocation', e.target.value)}
                          placeholder="Destination"
                          className="text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Other Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="personalObjective" className="text-xs sm:text-sm">Personal Objective</Label>
                      <Select value={newActivity.personalObjective} onValueChange={(value) => handleActivityChange('personalObjective', value)}>
                        <SelectTrigger className="text-xs sm:text-sm">
                          <SelectValue placeholder="Select objective" />
                        </SelectTrigger>
                        <SelectContent>
                          {personalObjectives.map(objective => (
                            <SelectItem key={objective} value={objective}>{objective}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="employer" className="text-xs sm:text-sm">Employer</Label>
                      <Select value={newActivity.employer} onValueChange={(value) => handleActivityChange('employer', value)}>
                        <SelectTrigger className="text-xs sm:text-sm">
                          <SelectValue placeholder="Select employer" />
                        </SelectTrigger>
                        <SelectContent>
                          {employers.map(employer => (
                            <SelectItem key={employer} value={employer}>{employer}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {/* Common fields for both timetabled and flexible */}
              <div>
                <Label htmlFor="actDescription" className="text-xs sm:text-sm">Description</Label>
                <Textarea
                  id="actDescription"
                  value={newActivity.description}
                  onChange={(e) => handleActivityChange('description', e.target.value)}
                  placeholder="Detailed description of the activity"
                  rows={3}
                  className="text-xs sm:text-sm"
                />
              </div>

              <div>
                <Label htmlFor="actComment" className="text-xs sm:text-sm">Comment</Label>
                <Textarea
                  id="actComment"
                  value={newActivity.comment}
                  onChange={(e) => handleActivityChange('comment', e.target.value)}
                  placeholder="Additional comments"
                  rows={2}
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
                            <div className="flex flex-wrap gap-1">
                              <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getCategoryColor(activity.category)}`}>
                                {activity.category}
                              </span>
                              {activity.activityType && (
                                <span className="inline-block px-2 py-1 text-xs rounded-full border bg-gray-100 text-gray-800 border-gray-200">
                                  {activity.activityType}
                                </span>
                              )}
                              {activity.activityFormat && (
                                <span className="inline-block px-2 py-1 text-xs rounded-full border bg-blue-100 text-blue-800 border-blue-200">
                                  {activity.activityFormat}
                                </span>
                              )}
                            </div>
                          </div>
                          {activity.description && (
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">{activity.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-blue-600">
                            {activity.startTime && activity.endTime && (
                              <span>Time: {activity.startTime} - {activity.endTime}</span>
                            )}
                            {activity.premiumHours && activity.premiumHours > 0 && (
                              <span className="text-yellow-600">Premium: {activity.premiumHours.toFixed(2)}h</span>
                            )}
                            {activity.duration && <span>Duration: {activity.duration}</span>}
                            {activity.frequency && <span>Frequency: {activity.frequency}</span>}
                            {activity.date && <span>Date: {activity.date.toLocaleDateString()}</span>}
                            {activity.time && <span>Time: {activity.time}</span>}
                          </div>
                          {activity.comment && (
                            <p className="text-xs sm:text-sm text-gray-500 mt-1 italic">{activity.comment}</p>
                          )}
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
