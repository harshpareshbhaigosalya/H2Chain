import express from "express";
import User from "../models/User.js";
import multer from "multer";

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" }); // You can customize storage as needed

// Register new user or return existing
router.post("/register", upload.fields([
  { name: "businessLicense", maxCount: 1 },
  { name: "governmentCompanyId", maxCount: 1 },
  { name: "proofOfAddress", maxCount: 1 },
  { name: "authorizedRepresentativeId", maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      firebaseUid, name, email, companyName, companyRegistrationNumber,
      countryOfRegistration, businessType, industrySector, yearOfIncorporation,
      numberOfEmployees, businessEmail, businessPhoneNumber, websiteUrl,
      linkedinProfile, taxIdentificationNumber
    } = req.body;

    // Validate required fields (add more as needed)
    if (!companyName || !companyRegistrationNumber || !countryOfRegistration ||
        !businessType || !industrySector || !yearOfIncorporation ||
        !businessEmail || !businessPhoneNumber || !taxIdentificationNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ firebaseUid });
    if (!user) {
      user = await User.create({
        firebaseUid,
        name,
        email,
        role: email === "admin@gmail.com" ? "admin" : "user",
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
        businessLicense: req.files?.businessLicense?.[0]?.path,
        governmentCompanyId: req.files?.governmentCompanyId?.[0]?.path,
        proofOfAddress: req.files?.proofOfAddress?.[0]?.path,
        taxIdentificationNumber,
        authorizedRepresentativeId: req.files?.authorizedRepresentativeId?.[0]?.path
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
