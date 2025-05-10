import { useState } from "react";
import { IRegistration } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";

interface RegistrationFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (registration: IRegistration) => void;
  initialData?: Partial<IRegistration>;
  title?: string;
}

export function RegistrationForm({ 
  open, 
  onClose, 
  onSave, 
  initialData = {}, 
  title = "New Registration" 
}: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    tagName: initialData.tagName || '',
    cpf: initialData.cpf || '',
    email: initialData.email || '',
    phoneNumber: initialData.phoneNumber || '',
    address: initialData.address || '',
    postalCode: initialData.postalCode || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.cpf) {
      alert("Please fill in all required fields");
      return;
    }

    let tagName = formData.tagName;
    if (!tagName || tagName.trim() === '') {
      const nameParts = formData.fullName.trim().split(/\s+/);
      if (nameParts.length < 2) {
        tagName = formData.fullName.toUpperCase();
      } else {
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        tagName = `${firstName} ${lastName}`.toUpperCase();
      }
    }

    // Create a new registration object
    const registrationData: IRegistration = {
      id: initialData.id || crypto.randomUUID(),
      fullName: formData.fullName,
      tagName: tagName,
      cpf: formData.cpf,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      postalCode: formData.postalCode,
      createdAt: initialData.createdAt || new Date(),
      updatedAt: new Date()
    };
    
    onSave(registrationData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              Full Name *
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="col-span-3"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tagName" className="text-right">
              Tag Name
            </Label>
            <Input
              id="tagName"
              name="tagName"
              value={formData.tagName}
              onChange={handleChange}
              className="col-span-3"
              placeholder="JOHN DOE"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cpf" className="text-right">
              CPF *
            </Label>
            <Input
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="col-span-3"
              placeholder="123.456.789-00"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="col-span-3"
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="col-span-3"
              placeholder="+1 234-567-8900"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="col-span-3"
              placeholder="123 Main St, San Francisco, CA"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="postalCode" className="text-right">
              Postal Code
            </Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="col-span-3"
              placeholder="94105"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button"
            onClick={handleSubmit}
            disabled={!formData.fullName || !formData.email || !formData.cpf}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
