import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminAddMemberProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminAddMember = ({ isOpen, onClose }: AdminAddMemberProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    alternateMobile: "",
    address: {
      houseFlatNo: "",
      streetArea: "",
      city: "",
      district: "",
      state: "",
      country: "",
      pinZipCode: "",
    },
    currentAddress: {
      sameAsPermanent: false,
      houseFlatNo: "",
      streetArea: "",
      city: "",
      district: "",
      state: "",
      country: "",
      pinZipCode: "",
    },
    idProofType: "",
    education: "",
    job: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    nationality: "",
    maritalStatus: "",
    bloodGroup: "",
    languagesKnown: [] as string[],
    previousNgoExperience: {
      hasExperience: false,
      details: "",
    },
    socialMediaProfiles: {
      linkedIn: "",
      facebook: "",
      instagram: "",
    },
    interest: "",
    position: "",
    status: "New",
  });

  const [image, setImage] = useState<File | null>(null);
  const [idProofFile, setIdProofFile] = useState<File | null>(null);
  const [languageInput, setLanguageInput] = useState("");

  const addMembershipMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/membership/admin`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );
      if (!response.ok) throw new Error("Failed to add member");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
      toast({ title: "Success", description: "Member added successfully" });
      handleClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add member",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (type: "address" | "currentAddress", field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleSocialMediaChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialMediaProfiles: {
        ...prev.socialMediaProfiles,
        [field]: value,
      },
    }));
  };

  const handleNgoExperienceChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      previousNgoExperience: {
        ...prev.previousNgoExperience,
        [field]: value,
      },
    }));
  };

  const addLanguage = () => {
    if (languageInput.trim() && !formData.languagesKnown.includes(languageInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        languagesKnown: [...prev.languagesKnown, languageInput.trim()],
      }));
      setLanguageInput("");
    }
  };

  const removeLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languagesKnown: prev.languagesKnown.filter((l) => l !== lang),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();

    // Add basic fields
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        submitData.append(key, JSON.stringify(value));
      } else {
        submitData.append(key, value as string);
      }
    });

    // Add files
    if (image) submitData.append("image", image);
    if (idProofFile) submitData.append("idProofFile", idProofFile);

    addMembershipMutation.mutate(submitData);
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      alternateMobile: "",
      address: {
        houseFlatNo: "",
        streetArea: "",
        city: "",
        district: "",
        state: "",
        country: "",
        pinZipCode: "",
      },
      currentAddress: {
        sameAsPermanent: false,
        houseFlatNo: "",
        streetArea: "",
        city: "",
        district: "",
        state: "",
        country: "",
        pinZipCode: "",
      },
      idProofType: "",
      education: "",
      job: "",
      gender: "",
      dateOfBirth: "",
      age: "",
      nationality: "",
      maritalStatus: "",
      bloodGroup: "",
      languagesKnown: [],
      previousNgoExperience: {
        hasExperience: false,
        details: "",
      },
      socialMediaProfiles: {
        linkedIn: "",
        facebook: "",
        instagram: "",
      },
      interest: "",
      position: "",
      status: "New",
    });
    setImage(null);
    setIdProofFile(null);
    setLanguageInput("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="alternateMobile">Alternate Mobile Number</Label>
                <Input
                  id="alternateMobile"
                  value={formData.alternateMobile}
                  onChange={(e) => handleInputChange("alternateMobile", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="image">Profile Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle>Permanent Address</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="houseFlatNo">House/Flat No</Label>
                <Input
                  id="houseFlatNo"
                  value={formData.address.houseFlatNo}
                  onChange={(e) => handleAddressChange("address", "houseFlatNo", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="streetArea">Street/Area</Label>
                <Input
                  id="streetArea"
                  value={formData.address.streetArea}
                  onChange={(e) => handleAddressChange("address", "streetArea", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => handleAddressChange("address", "city", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={formData.address.district}
                  onChange={(e) => handleAddressChange("address", "district", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.address.state}
                  onChange={(e) => handleAddressChange("address", "state", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.address.country}
                  onChange={(e) => handleAddressChange("address", "country", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="pinZipCode">Pin/ZIP Code</Label>
                <Input
                  id="pinZipCode"
                  value={formData.address.pinZipCode}
                  onChange={(e) => handleAddressChange("address", "pinZipCode", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Current Address */}
          <Card>
            <CardHeader>
              <CardTitle>Current Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sameAsPermanent"
                  checked={formData.currentAddress.sameAsPermanent}
                  onCheckedChange={(checked) => {
                    const isChecked = !!checked;
                    setFormData((prev) => ({
                      ...prev,
                      currentAddress: isChecked
                        ? { ...prev.address, sameAsPermanent: true }
                        : { sameAsPermanent: false, houseFlatNo: "", streetArea: "", city: "", district: "", state: "", country: "", pinZipCode: "" },
                    }));
                  }}
                />
                <Label htmlFor="sameAsPermanent">Same as Permanent Address</Label>
              </div>
              {!formData.currentAddress.sameAsPermanent && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentHouseFlatNo">House/Flat No</Label>
                    <Input
                      id="currentHouseFlatNo"
                      value={formData.currentAddress.houseFlatNo}
                      onChange={(e) => handleAddressChange("currentAddress", "houseFlatNo", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentStreetArea">Street/Area</Label>
                    <Input
                      id="currentStreetArea"
                      value={formData.currentAddress.streetArea}
                      onChange={(e) => handleAddressChange("currentAddress", "streetArea", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentCity">City</Label>
                    <Input
                      id="currentCity"
                      value={formData.currentAddress.city}
                      onChange={(e) => handleAddressChange("currentAddress", "city", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentDistrict">District</Label>
                    <Input
                      id="currentDistrict"
                      value={formData.currentAddress.district}
                      onChange={(e) => handleAddressChange("currentAddress", "district", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentState">State</Label>
                    <Input
                      id="currentState"
                      value={formData.currentAddress.state}
                      onChange={(e) => handleAddressChange("currentAddress", "state", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentCountry">Country</Label>
                    <Input
                      id="currentCountry"
                      value={formData.currentAddress.country}
                      onChange={(e) => handleAddressChange("currentAddress", "country", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentPinZipCode">Pin/ZIP Code</Label>
                    <Input
                      id="currentPinZipCode"
                      value={formData.currentAddress.pinZipCode}
                      onChange={(e) => handleAddressChange("currentAddress", "pinZipCode", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ID Proof */}
          <Card>
            <CardHeader>
              <CardTitle>ID Proof</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idProofType">ID Proof Type</Label>
                <Select value={formData.idProofType} onValueChange={(value) => handleInputChange("idProofType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID Proof Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aadhaar Card">Aadhaar Card</SelectItem>
                    <SelectItem value="Passport">Passport</SelectItem>
                    <SelectItem value="Voter ID">Voter ID</SelectItem>
                    <SelectItem value="Driving License">Driving License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="idProofFile">ID Proof File (PDF/Image)</Label>
                <Input
                  id="idProofFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setIdProofFile(e.target.files?.[0] || null)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange("education", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="job">Job</Label>
                <Input
                  id="job"
                  value={formData.job}
                  onChange={(e) => handleInputChange("job", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Marital Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Languages Known */}
          <Card>
            <CardHeader>
              <CardTitle>Languages Known</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add language"
                  value={languageInput}
                  onChange={(e) => setLanguageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
                />
                <Button type="button" onClick={addLanguage}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.languagesKnown.map((lang) => (
                  <span key={lang} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                    {lang}
                    <button type="button" onClick={() => removeLanguage(lang)} className="text-red-500">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Previous NGO Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Previous NGO Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasExperience"
                  checked={formData.previousNgoExperience.hasExperience}
                  onCheckedChange={(checked) => handleNgoExperienceChange("hasExperience", checked)}
                />
                <Label htmlFor="hasExperience">Has Previous NGO Experience</Label>
              </div>
              {formData.previousNgoExperience.hasExperience && (
                <div>
                  <Label htmlFor="experienceDetails">Experience Details</Label>
                  <Textarea
                    id="experienceDetails"
                    value={formData.previousNgoExperience.details}
                    onChange={(e) => handleNgoExperienceChange("details", e.target.value)}
                    placeholder="Describe your previous NGO experience..."
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Media Profiles */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Profiles</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="linkedIn">LinkedIn</Label>
                <Input
                  id="linkedIn"
                  value={formData.socialMediaProfiles.linkedIn}
                  onChange={(e) => handleSocialMediaChange("linkedIn", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={formData.socialMediaProfiles.facebook}
                  onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/username"
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.socialMediaProfiles.instagram}
                  onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/username"
                />
              </div>
            </CardContent>
          </Card>

          {/* Interest and Position */}
          <Card>
            <CardHeader>
              <CardTitle>Interest and Position</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="interest">Interest</Label>
                <Textarea
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => handleInputChange("interest", e.target.value)}
                  placeholder="Describe your interest in joining the NGO..."
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addMembershipMutation.isPending}>
              {addMembershipMutation.isPending ? "Adding..." : "Add Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddMember;