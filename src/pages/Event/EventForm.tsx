import { useState, useRef } from "react";
import { IEvent } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { DatePickerWithRange } from "@/components/date-picker-range";
import { DateRange } from "react-day-picker";
import { Upload, Image as ImageIcon } from "lucide-react";

interface EventFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: IEvent) => void;
  initialData?: Partial<IEvent>;
  title?: string;
}

export function EventForm({ 
  open, 
  onClose, 
  onSave, 
  initialData = {}, 
  title = "New Event" 
}: EventFormProps) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    imageUrl: initialData.imageUrl || '',
    location: initialData.location || '',
    status: initialData.status || 'coming-soon' as 'coming-soon' | 'ongoing' | 'finished'
  });

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: initialData.dateFrom ? new Date(initialData.dateFrom) : undefined,
    to: initialData.dateTo ? new Date(initialData.dateTo) : undefined
  });
  
  // New state for image upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.imageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      status: value as 'coming-soon' | 'ongoing' | 'finished' 
    }));
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    // Create a preview URL
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };
  
  // Trigger file input click
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };
  
  // Upload the file to server/storage
  const uploadImage = async (): Promise<string> => {
    if (!selectedFile) {
      return formData.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070';
    }
    
    setIsUploading(true);
    
    try {
      // TODO: Replace with your actual upload logic
      // This is a mock implementation
      
      // For a real implementation, you would:
      // 1. Create a FormData object
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      
      // 2. Send it to your backend
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      // return data.imageUrl;
      
      // Mock implementation - simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, return the URL from your server
      // For now, we'll just use the preview URL
      return previewUrl || formData.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070';
    } catch (error) {
      console.error('Error uploading image:', error);
      return formData.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070';
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!dateRange?.from) {
      alert("Please select at least a start date");
      return;
    }
    
    // Upload image if a new one was selected
    const imageUrl = await uploadImage();

    // Create a new event object
    const eventData: IEvent = {
      id: initialData.id || crypto.randomUUID(),
      title: formData.title,
      imageUrl: imageUrl,
      dateFrom: dateRange.from,
      dateTo: dateRange.to,
      location: formData.location,
      status: formData.status,
      createdAt: initialData.createdAt || new Date(),
      updatedAt: new Date()
    };
    
    onSave(eventData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Event title"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Image
            </Label>
            <div className="col-span-3">
              <div className="flex flex-col gap-2">
                {previewUrl ? (
                  <div className="relative w-full h-40 rounded-md overflow-hidden border">
                    <img 
                      src={previewUrl} 
                      alt="Event preview" 
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute bottom-2 right-2"
                      onClick={handleSelectFile}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-40 flex flex-col gap-2 justify-center items-center border-dashed"
                    onClick={handleSelectFile}
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span>Upload event image</span>
                  </Button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="text-xs text-gray-500">
                  Recommended: 1200×600px, JPEG or PNG
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Event location"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <div className="col-span-3">
              <DatePickerWithRange 
                className="w-full"
                dateRange={dateRange}
                onDateRangeChange={handleDateRangeChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select 
              value={formData.status} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coming-soon">Coming Soon</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="finished">Finished</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.title || !formData.location || !dateRange?.from || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
