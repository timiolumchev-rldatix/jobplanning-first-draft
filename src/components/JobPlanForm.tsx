
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const JobPlanForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    hospital: '',
    totalSessions: '',
    dccSessions: '',
    spaSessions: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job plan created:', formData);
    // Here you would typically save the data
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Job Plan Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Main Consultant Post"
          />
        </div>

        <div>
          <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-2">
            Hospital/Trust *
          </label>
          <input
            type="text"
            id="hospital"
            name="hospital"
            required
            value={formData.hospital}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Royal London Hospital"
          />
        </div>

        <div>
          <label htmlFor="totalSessions" className="block text-sm font-medium text-gray-700 mb-2">
            Total Sessions per Week *
          </label>
          <input
            type="number"
            id="totalSessions"
            name="totalSessions"
            required
            min="1"
            max="20"
            value={formData.totalSessions}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10"
          />
        </div>

        <div>
          <label htmlFor="dccSessions" className="block text-sm font-medium text-gray-700 mb-2">
            DCC Sessions *
          </label>
          <input
            type="number"
            id="dccSessions"
            name="dccSessions"
            required
            min="0"
            step="0.5"
            value={formData.dccSessions}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="7.5"
          />
        </div>

        <div>
          <label htmlFor="spaSessions" className="block text-sm font-medium text-gray-700 mb-2">
            SPA Sessions *
          </label>
          <input
            type="number"
            id="spaSessions"
            name="spaSessions"
            required
            min="0"
            step="0.5"
            value={formData.spaSessions}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2.5"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe the main responsibilities and duties for this job plan..."
        />
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="nhs-blue text-white hover:bg-blue-700"
        >
          Create Job Plan
        </Button>
      </div>
    </form>
  );
};

export default JobPlanForm;
