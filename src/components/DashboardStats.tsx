
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

  return (
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
  );
};

export default DashboardStats;
