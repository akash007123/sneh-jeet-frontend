import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Membership {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  alternateMobile?: string;
  address?: {
    houseFlatNo?: string;
    streetArea?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pinZipCode?: string;
  };
  currentAddress?: {
    sameAsPermanent?: boolean;
    houseFlatNo?: string;
    streetArea?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pinZipCode?: string;
  };
  idProofType?: string;
  idProofFile?: string;
  education?: string;
  job?: string;
  gender?: string;
  dateOfBirth?: string;
  age?: number;
  nationality?: string;
  maritalStatus?: string;
  bloodGroup?: string;
  languagesKnown?: string[];
  previousNgoExperience?: {
    hasExperience?: boolean;
    details?: string;
  };
  socialMediaProfiles?: {
    linkedIn?: string;
    facebook?: string;
    instagram?: string;
  };
  interest?: string;
  position?: string;
  image?: string;
  status: 'New' | 'Pending' | 'Talk' | 'Approved';
  createdAt: string;
}

interface ViewMembershipModalProps {
  membership: Membership | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewMembershipModal = ({ membership, isOpen, onClose }: ViewMembershipModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Talk': return 'bg-purple-100 text-purple-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Membership Details</DialogTitle>
        </DialogHeader>
        {membership && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={membership.image ? `${import.meta.env.VITE_API_BASE_URL}${membership.image}` : undefined}
                  alt={`${membership.firstName} ${membership.lastName}`}
                />
                <AvatarFallback className="text-lg">
                  {membership.firstName[0]}{membership.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{membership.firstName} {membership.lastName}</h3>
                <p className="text-sm text-muted-foreground">Profile Image {membership.image ? 'Uploaded' : 'Not Provided'}</p>
              </div>
            </div>
            <div>
              <label className="font-semibold">Name:</label>
              <p>{membership.firstName} {membership.lastName}</p>
            </div>
            <div>
              <label className="font-semibold">Email:</label>
              <p>{membership.email}</p>
            </div>
            <div>
              <label className="font-semibold">Mobile:</label>
              <p>{membership.mobile || 'N/A'}</p>
            </div>
            {membership.alternateMobile && (
              <div>
                <label className="font-semibold">Alternate Mobile:</label>
                <p>{membership.alternateMobile}</p>
              </div>
            )}

            {/* Address Section */}
            {membership.address && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-2">Permanent Address</h4>
                {membership.address.houseFlatNo && (
                  <div>
                    <label className="font-semibold">House/Flat No:</label>
                    <p>{membership.address.houseFlatNo}</p>
                  </div>
                )}
                {membership.address.streetArea && (
                  <div>
                    <label className="font-semibold">Street/Area:</label>
                    <p>{membership.address.streetArea}</p>
                  </div>
                )}
                {membership.address.city && (
                  <div>
                    <label className="font-semibold">City:</label>
                    <p>{membership.address.city}</p>
                  </div>
                )}
                {membership.address.district && (
                  <div>
                    <label className="font-semibold">District:</label>
                    <p>{membership.address.district}</p>
                  </div>
                )}
                {membership.address.state && (
                  <div>
                    <label className="font-semibold">State:</label>
                    <p>{membership.address.state}</p>
                  </div>
                )}
                {membership.address.country && (
                  <div>
                    <label className="font-semibold">Country:</label>
                    <p>{membership.address.country}</p>
                  </div>
                )}
                {membership.address.pinZipCode && (
                  <div>
                    <label className="font-semibold">Pin/ZIP Code:</label>
                    <p>{membership.address.pinZipCode}</p>
                  </div>
                )}
              </div>
            )}

            {/* Current Address Section */}
            {membership.currentAddress && !membership.currentAddress.sameAsPermanent && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-2">Current Address</h4>
                {membership.currentAddress.houseFlatNo && (
                  <div>
                    <label className="font-semibold">House/Flat No:</label>
                    <p>{membership.currentAddress.houseFlatNo}</p>
                  </div>
                )}
                {membership.currentAddress.streetArea && (
                  <div>
                    <label className="font-semibold">Street/Area:</label>
                    <p>{membership.currentAddress.streetArea}</p>
                  </div>
                )}
                {membership.currentAddress.city && (
                  <div>
                    <label className="font-semibold">City:</label>
                    <p>{membership.currentAddress.city}</p>
                  </div>
                )}
                {membership.currentAddress.district && (
                  <div>
                    <label className="font-semibold">District:</label>
                    <p>{membership.currentAddress.district}</p>
                  </div>
                )}
                {membership.currentAddress.state && (
                  <div>
                    <label className="font-semibold">State:</label>
                    <p>{membership.currentAddress.state}</p>
                  </div>
                )}
                {membership.currentAddress.country && (
                  <div>
                    <label className="font-semibold">Country:</label>
                    <p>{membership.currentAddress.country}</p>
                  </div>
                )}
                {membership.currentAddress.pinZipCode && (
                  <div>
                    <label className="font-semibold">Pin/ZIP Code:</label>
                    <p>{membership.currentAddress.pinZipCode}</p>
                  </div>
                )}
              </div>
            )}

            {/* ID Proof Section */}
            {(membership.idProofType || membership.idProofFile) && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-2">ID Proof</h4>
                {membership.idProofType && (
                  <div>
                    <label className="font-semibold">ID Proof Type:</label>
                    <p>{membership.idProofType}</p>
                  </div>
                )}
                {membership.idProofFile && (
                  <div>
                    <label className="font-semibold">ID Proof File:</label>
                    <p>
                      <a
                        href={`${import.meta.env.VITE_API_BASE_URL}${membership.idProofFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View File
                      </a>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Personal Information Section */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-lg mb-2">Personal Information</h4>
              {membership.education && (
                <div>
                  <label className="font-semibold">Education:</label>
                  <p>{membership.education}</p>
                </div>
              )}
              {membership.job && (
                <div>
                  <label className="font-semibold">Job:</label>
                  <p>{membership.job}</p>
                </div>
              )}
              {membership.gender && (
                <div>
                  <label className="font-semibold">Gender:</label>
                  <p>{membership.gender}</p>
                </div>
              )}
              {membership.dateOfBirth && (
                <div>
                  <label className="font-semibold">Date of Birth:</label>
                  <p>{new Date(membership.dateOfBirth).toLocaleDateString()}</p>
                </div>
              )}
              {membership.age && (
                <div>
                  <label className="font-semibold">Age:</label>
                  <p>{membership.age}</p>
                </div>
              )}
              {membership.nationality && (
                <div>
                  <label className="font-semibold">Nationality:</label>
                  <p>{membership.nationality}</p>
                </div>
              )}
              {membership.maritalStatus && (
                <div>
                  <label className="font-semibold">Marital Status:</label>
                  <p>{membership.maritalStatus}</p>
                </div>
              )}
              {membership.bloodGroup && (
                <div>
                  <label className="font-semibold">Blood Group:</label>
                  <p>{membership.bloodGroup}</p>
                </div>
              )}
              {membership.languagesKnown && membership.languagesKnown.length > 0 && (
                <div>
                  <label className="font-semibold">Languages Known:</label>
                  <p>{membership.languagesKnown.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Previous NGO Experience */}
            {membership.previousNgoExperience && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-2">Previous NGO Experience</h4>
                <div>
                  <label className="font-semibold">Has Experience:</label>
                  <p>{membership.previousNgoExperience.hasExperience ? 'Yes' : 'No'}</p>
                </div>
                {membership.previousNgoExperience.hasExperience && membership.previousNgoExperience.details && (
                  <div>
                    <label className="font-semibold">Details:</label>
                    <p className="whitespace-pre-wrap">{membership.previousNgoExperience.details}</p>
                  </div>
                )}
              </div>
            )}

            {/* Social Media Profiles */}
            {membership.socialMediaProfiles && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-2">Social Media Profiles</h4>
                {membership.socialMediaProfiles.linkedIn && (
                  <div>
                    <label className="font-semibold">LinkedIn:</label>
                    <p>
                      <a
                        href={membership.socialMediaProfiles.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {membership.socialMediaProfiles.linkedIn}
                      </a>
                    </p>
                  </div>
                )}
                {membership.socialMediaProfiles.facebook && (
                  <div>
                    <label className="font-semibold">Facebook:</label>
                    <p>
                      <a
                        href={membership.socialMediaProfiles.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {membership.socialMediaProfiles.facebook}
                      </a>
                    </p>
                  </div>
                )}
                {membership.socialMediaProfiles.instagram && (
                  <div>
                    <label className="font-semibold">Instagram:</label>
                    <p>
                      <a
                        href={membership.socialMediaProfiles.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {membership.socialMediaProfiles.instagram}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="border-t pt-4">
              <div>
                <label className="font-semibold">Interest:</label>
                <p className="whitespace-pre-wrap">{membership.interest || 'N/A'}</p>
              </div>
              <div>
                <label className="font-semibold">Position:</label>
                <p>{membership.position || 'N/A'}</p>
              </div>
              <div>
                <label className="font-semibold">Status:</label>
                <Badge className={getStatusColor(membership.status)}>
                  {membership.status}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewMembershipModal;