// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Firebase Authentication UID
    firebaseUid: {
      type: String,
      required: [true, "Firebase UID is required"],
      unique: true,
      index: true,
    },

    // Basic Info
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Company Information
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    companyRegistrationNumber: {
      type: String,
      required: [true, "Company registration number is required"],
    },
    countryOfRegistration: {
      type: String,
      required: [true, "Country of registration is required"],
    },
    businessType: {
      type: String,
      enum: ["Producer", "Certifier", "Buyer", "Regulator"],
      required: [true, "Business type is required"],
    },
    industrySector: {
      type: String,
      required: [true, "Industry sector is required"],
    },
    yearOfIncorporation: {
      type: Number,
      required: [true, "Year of incorporation is required"],
      min: [1800, "Year is too old"],
    },
    numberOfEmployees: {
      type: Number,
      min: 1,
      default: null,
      required: false,
    },

    // Business Contact Info
    businessEmail: {
      type: String,
      required: [true, "Business email is required"],
      match: [/\S+@\S+\.\S+/, "Please enter a valid business email"],
    },
    businessPhoneNumber: {
      type: String,
      required: [true, "Business phone number is required"],
    },
    websiteUrl: {
      type: String,
      default: null,
      match: [/^https?:\/\/.+/, "Enter a valid website URL"],
      required: false,
    },
    linkedinProfile: {
      type: String,
      default: null,
      match: [/^https?:\/\/.+/, "Enter a valid LinkedIn URL"],
      required: false,
    },

    // Legal Documents (store relative paths or cloud URLs)
    businessLicense: {
      type: String,
      required: [true, "Business license document is required"],
    },
    governmentCompanyId: {
      type: String,
      required: [true, "Government-issued company ID is required"],
    },
    proofOfAddress: {
      type: String,
      required: [true, "Proof of address is required"],
    },
    taxIdentificationNumber: {
      type: String,
      required: [true, "Tax Identification Number is required"],
    },
    authorizedRepresentativeId: {
      type: String,
      required: [true, "Authorized representative ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
