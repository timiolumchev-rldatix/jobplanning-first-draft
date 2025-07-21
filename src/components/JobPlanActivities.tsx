import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Activity {
  name: string;
  description: string;
}

interface JobPlanActivitiesProps {
  activities: Activity[];
  calendarActivities: any[]; // You can strongly type this if needed
  updateFormData: (section: string, data: any) => void;
}

const JobPlanActivities: React.FC<JobPlanActivitiesProps> = ({
  activities,
  calendarActivities,
  updateFormData
}) => {
  const [newActivity, setNewActivity] = useState<Activity>({
    name: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewActivity(prev => ({ ...prev, [name]: value }));
  };

  const handleAddActivity = async () => {
    if (!newActivity.name || !newActivity.description) {
      setError('Please fill out all fields.');
      return;
    }

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch('https://6gdijwesul.execute-api.eu-west-2.amazonaws.com/add-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newActivity)
      });

      if (!response.ok) {
        throw new Error('Failed to add activity');
      }

      const result = await response.json();
      console.log('Activity added via API:', result);

      const updatedActivities = [...activities, newActivity];
      updateFormData('activities', updatedActivities);
      setNewActivity({ name: '', description: '' });
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError('Failed to add activity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Add Activity</h2>

      <div className="space-y-2">
        <Input
          name="name"
          placeholder="Activity Name"
          value={newActivity.name}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Activity Description"
          value={newActivity.description}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">Activity added successfully!</p>}
        <Button onClick={handleAddActivity} disabled={loading}>
          {loading ? 'Adding...' : 'Add Activity'}
        </Button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Current Activities</h3>
        {activities.length === 0 ? (
          <p className="text-gray-500">No activities added yet.</p>
        ) : (
          <ul className="list-disc list-inside">
            {activities.map((activity, index) => (
              <li key={index}>
                <strong>{activity.name}</strong>: {activity.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobPlanActivities;
