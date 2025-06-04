
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface JobPlanBasicInfoProps {
  formData: any;
  updateFormData: (section: string, data: any) => void;
}

const JobPlanBasicInfo = ({ formData, updateFormData }: JobPlanBasicInfoProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <Label htmlFor="title" className="text-xs sm:text-sm">Job Plan Title *</Label>
          <Input
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Main Consultant Post"
            className="text-xs sm:text-sm"
          />
        </div>

        <div>
          <Label htmlFor="hospital" className="text-xs sm:text-sm">Hospital/Trust *</Label>
          <Input
            id="hospital"
            name="hospital"
            required
            value={formData.hospital}
            onChange={handleInputChange}
            placeholder="e.g., Royal London Hospital"
            className="text-xs sm:text-sm"
          />
        </div>

        <div>
          <Label htmlFor="totalSessions" className="text-xs sm:text-sm">Total Sessions per Week *</Label>
          <Input
            type="number"
            id="totalSessions"
            name="totalSessions"
            required
            min="1"
            max="20"
            value={formData.totalSessions}
            onChange={handleInputChange}
            placeholder="10"
            className="text-xs sm:text-sm"
          />
        </div>

        <div>
          <Label htmlFor="dccSessions" className="text-xs sm:text-sm">DCC Sessions *</Label>
          <Input
            type="number"
            id="dccSessions"
            name="dccSessions"
            required
            min="0"
            step="0.5"
            value={formData.dccSessions}
            onChange={handleInputChange}
            placeholder="7.5"
            className="text-xs sm:text-sm"
          />
        </div>

        <div className="md:col-span-1">
          <Label htmlFor="spaSessions" className="text-xs sm:text-sm">SPA Sessions *</Label>
          <Input
            type="number"
            id="spaSessions"
            name="spaSessions"
            required
            min="0"
            step="0.5"
            value={formData.spaSessions}
            onChange={handleInputChange}
            placeholder="2.5"
            className="text-xs sm:text-sm"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description" className="text-xs sm:text-sm">Job Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe the main responsibilities and duties for this job plan..."
          className="text-xs sm:text-sm"
        />
      </div>
    </div>
  );
};

export default JobPlanBasicInfo;
