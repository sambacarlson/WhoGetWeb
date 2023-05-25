/**
 * Props and types are defined here for the entire Application.
 */
/// the complete ask type
export type askType = {
  _id: string;
  user: any;
  message: string;
  categories: string[];
  images: string[];
  expiry: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  status: {
    hidden: boolean;
    hiddenDate?: string;
  };
  createdAt: string;
  updatedAt: string;
}

/// the complete ask type
export type userType = {
  _id: string;
  username: string;
  oAuthId: string;
  oAuthProvider: "google" | "facebook";
  interests: string[];
  status: {
    banned: boolean;
    bannedDate: string;
  },
  telephone: number;
  email: string;
  whatsapp: number;
  photo: string;
  createdAt: string;
  updatedAt: string;
}