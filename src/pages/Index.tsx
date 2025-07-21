import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';

const DashboardStats = () => {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await fetch(
        'https://6gdijwesul.execute-api.eu-west-2.amazonaws.com/add-activity',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: '12345',
            activity: {
              activityName: 'Outpatient Clinic',
              location: 'Main Hospital - Room 302',
              category: 'Clinical',
              subCategory: 'Outpatient',
              duration: 4,
              day: 'Monday',
              startTime: '09:00',
              endTime: '13:00',
              description: 'Weekly outpatient clinic for dermatology',
              notes: 'Bring updated referral data',
            },
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`Activity added successfully: ${data.message}`);
      } else {
        alert(`Failed to add activity: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Error adding activity: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="mb-4">
        <button
          onClick={handleAddActivity}
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Adding Activity...' : 'Add Sample Activity'}
        </button>
      </div>

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
    </>
  );
};

export default DashboardStats;
