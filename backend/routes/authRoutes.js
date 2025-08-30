// routes/auditorRoutes.js

import express from "express";
import multer from "multer";
import { register } from "../controllers/authController.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();
router.post(
	"/register",
	upload.fields([
		{ name: "businessLicense", maxCount: 1 },
		{ name: "governmentCompanyId", maxCount: 1 },
		{ name: "proofOfAddress", maxCount: 1 },
		{ name: "authorizedRepresentativeId", maxCount: 1 }
	]),
	register
);

export default router;
