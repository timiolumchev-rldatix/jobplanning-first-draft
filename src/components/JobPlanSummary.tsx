
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JobPlanSummaryProps {
  formData: any;
}

const JobPlanSummary = ({ formData }: JobPlanSummaryProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Job Plan Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Title</p>
              <p className="font-medium">{formData.title || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Hospital/Trust</p>
              <p className="font-medium">{formData.hospital || 'Not specified'}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="font-medium">{formData.totalSessions || '0'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">DCC Sessions</p>
                <p className="font-medium">{formData.dccSessions || '0'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">SPA Sessions</p>
                <p className="font-medium">{formData.spaSessions || '0'}</p>
              </div>
            </div>
            {formData.description && (
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-sm">{formData.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Total Objectives</p>
              <p className="font-medium">{formData.objectives?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Resources Required</p>
              <p className="font-medium">{formData.resources?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Activities (List)</p>
              <p className="font-medium">{formData.activities?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Calendar Activities</p>
              <p className="font-medium">{formData.calendarActivities?.length || 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {formData.objectives?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.objectives.map((objective: any, index: number) => (
                <div key={objective.id} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium">{index + 1}. {objective.title}</p>
                  {objective.description && (
                    <p className="text-sm text-gray-600">{objective.description}</p>
                  )}
                  {objective.target && (
                    <p className="text-sm text-blue-600">Target: {objective.target}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {formData.resources?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.resources.map((resource: any, index: number) => (
                <div key={resource.id} className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium">{index + 1}. {resource.name}</p>
                  {resource.type && (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded mr-2">
                      {resource.type}
                    </span>
                  )}
                  {resource.quantity && (
                    <span className="text-sm text-green-600">Allocation: {resource.quantity}</span>
                  )}
                  {resource.description && (
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {(formData.activities?.length > 0 || formData.calendarActivities?.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.activities?.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Regular Activities</h4>
                <div className="space-y-2">
                  {formData.activities.map((activity: any, index: number) => (
                    <div key={activity.id} className="border-l-4 border-purple-500 pl-4">
                      <p className="font-medium">{index + 1}. {activity.title}</p>
                      <div className="flex space-x-4 text-sm text-gray-600">
                        {activity.duration && <span>Duration: {activity.duration}</span>}
                        {activity.frequency && <span>Frequency: {activity.frequency}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.calendarActivities?.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Scheduled Activities</h4>
                <div className="space-y-2">
                  {formData.calendarActivities.map((activity: any, index: number) => (
                    <div key={activity.id} className="border-l-4 border-orange-500 pl-4">
                      <p className="font-medium">{index + 1}. {activity.title}</p>
                      <p className="text-sm text-gray-600">
                        {activity.date.toLocaleDateString()} at {activity.time} • {activity.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobPlanSummary;
