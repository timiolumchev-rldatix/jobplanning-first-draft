import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Sessions This Week',
      value: '12',
      subtitle: '2 DCC, 10 SPA',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Compliance Status',
      value: '94%',
      subtitle: 'Appraisal due in 3 months',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Upcoming Deadlines',
      value: '3',
      subtitle: 'CPD submission due',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Leave Remaining',
      value: '18',
      subtitle: 'Study leave days',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const handleAddActivity = async () => {
    const newActivity = {
      activityName: "Outpatient Clinic",
      location: "Main Hospital - Room 302",
      category: "Clinical",
      subCategory: "Outpatient",
      duration: 4,
      day: "Monday",
      startTime: "09:00",
      endTime: "13:00",
      description: "Weekly outpatient clinic for dermatology",
      notes: "Bring updated referral data"
    };

    try {
      const response = await fetch(
        'https://6gdijwesul.execute-api.eu-west-2.amazonaws.com/add-activity',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: '12345',
            activity: newActivity,
          }),
        }
      );

      const result = await response.json();
      alert(`Activity added:\n${JSON.stringify(result, null, 2)}`);
    } catch (err) {
      alert(`Error adding activity: ${err}`);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleAddActivity}
          className="nhs-blue text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Add Sample Activity
        </button>
      </div>
    </>
  );
};

export default DashboardStats;
