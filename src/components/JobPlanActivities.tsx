import React, { useState } from 'react';

type Activity = {
  activityName: string;
  location: string;
  category: string;
  subCategory: string;
  duration: number;
  day: string;
  startTime: string;
  endTime: string;
  description?: string;
  notes?: string;
};

type Props = {
  activities: Activity[];
  calendarActivities: Activity[];
  updateFormData: (section: string, data: any) => void;
};

const JobPlanActivities: React.FC<Props> = ({
  activities,
  calendarActivities,
  updateFormData,
}) => {
  const [activityName, setActivityName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [duration, setDuration] = useState<number>(0);
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddActivity = async () => {
    if (!activityName || !location || !category || !day) {
      alert('Please fill in required fields: Activity Name, Location, Category, Day');
      return;
    }

    const newActivity: Activity = {
      activityName,
      location,
      category,
      subCategory,
      duration,
      day,
      startTime,
      endTime,
      description,
      notes,
    };

    try {
      const response = await fetch(
        'https://6gdijwesul.execute-api.eu-west-2.amazonaws.com/add-activity',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: '12345', // replace with dynamic user ID if needed
            activity: newActivity,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert(`Activity added successfully:\n${JSON.stringify(result, null, 2)}`);

        // Optionally update local state or parent form data
        updateFormData('activities', [...activities, newActivity]);

        // Clear form fields
        setActivityName('');
        setLocation('');
        setCategory('');
        setSubCategory('');
        setDuration(0);
        setDay('');
        setStartTime('');
        setEndTime('');
        setDescription('');
        setNotes('');
      } else {
        alert(`Failed to add activity:\n${result.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      alert(`Error adding activity: ${error.message || error.toString()}`);
    }
  };

  return (
    <div>
      <h2>Add Activity</h2>

      <div>
        <label>Activity Name*</label>
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />
      </div>

      <div>
        <label>Location*</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <label>Category*</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <label>Sub Category</label>
        <input
          type="text"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        />
      </div>

      <div>
        <label>Duration (hours)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Day*</label>
        <input
          type="text"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>

      <div>
        <label>Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div>
        <label>End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button onClick={handleAddActivity}>Add Activity</button>

      <hr />

      <h3>Current Activities</h3>
      <ul>
        {activities.map((act, idx) => (
          <li key={idx}>
            {act.activityName} — {act.day} @ {act.location} ({act.duration} hrs)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobPlanActivities;
