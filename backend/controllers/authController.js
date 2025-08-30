

import User from "../models/User.js";

export function login(req, res) {
  res.status(501).send("Not implemented");
}

export async function register(req, res) {
  // Extract fields from request body
  const {
    firebaseUid = "",
    name = "",
    email = "",
    role = "user",
    companyName = "",
    companyRegistrationNumber = "",
    countryOfRegistration = "",
    businessType = "Producer",
    industrySector = "",
    yearOfIncorporation = 2000,
    numberOfEmployees = 1,
    businessEmail = "",
    businessPhoneNumber = "",
    websiteUrl = "",
    linkedinProfile = "",
    taxIdentificationNumber = ""
  } = req.body;

  // Handle uploaded files
  const businessLicense = req.files?.businessLicense?.[0]?.path || "";
  const governmentCompanyId = req.files?.governmentCompanyId?.[0]?.path || "";
  const proofOfAddress = req.files?.proofOfAddress?.[0]?.path || "";
  const authorizedRepresentativeId = req.files?.authorizedRepresentativeId?.[0]?.path || "";

  // Only require email and firebaseUid for registration
  if (!firebaseUid || !email) {
    return res.status(400).json({ message: "Missing firebaseUid or email" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      firebaseUid,
      name,
      email,
      role,
      companyName,
      companyRegistrationNumber,
      countryOfRegistration,
      businessType,
      industrySector,
      yearOfIncorporation,
      numberOfEmployees,
      businessEmail,
      businessPhoneNumber,
      websiteUrl,
      linkedinProfile,
      taxIdentificationNumber,
      businessLicense,
      governmentCompanyId,
      proofOfAddress,
      authorizedRepresentativeId
    });

    await user.save();
    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: error.message });
  }
}

// ...add other controller methods as needed...
