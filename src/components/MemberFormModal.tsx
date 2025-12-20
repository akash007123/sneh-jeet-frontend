import { useState } from "react";
import { Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const MemberFormModal = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    interest: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/membership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Your membership application has been submitted successfully!',
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          interest: '',
        });
        setOpen(false);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to submit application. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Network error. Please check your connection.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" size="sm" className="w-full">
          Become Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Sneh Jeet NGO</DialogTitle>
          <DialogDescription>
            Fill out the form below to apply for membership. We'll review your application and get back to you soon.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                First Name *
              </label>
              <Input
                id="firstName"
                placeholder="First name"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                Last Name *
              </label>
              <Input
                id="lastName"
                placeholder="Last name"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email *
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-foreground mb-2">
              Mobile
            </label>
            <Input
              id="mobile"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-2">
              Why are you interested in joining?
            </label>
            <Textarea
              id="interest"
              placeholder="Tell us about your interest..."
              rows={3}
              value={formData.interest}
              onChange={handleChange}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Your information is confidential and will never be shared.
          </p>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
            <Send className="w-5 h-5 ml-1" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MemberFormModal;