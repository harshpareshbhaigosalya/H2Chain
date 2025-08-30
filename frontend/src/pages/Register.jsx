import React, { useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import AnimatedCard from "../components/AnimatedCard";
import Loader from "../components/Loader";
import { attachTokenToHeaders } from "../api";

const initialForm = {
  name: "",
  email: "",
  password: "",
  companyName: "",
  companyRegistrationNumber: "",
  countryOfRegistration: "",
  businessType: "",
  industrySector: "",
  yearOfIncorporation: "",
  numberOfEmployees: "",
  businessEmail: "",
  businessPhoneNumber: "",
  websiteUrl: "",
  linkedinProfile: "",
  taxIdentificationNumber: "",
};

const initialState = {
  firebaseUid: "",
  name: "",
  email: "",
  password: "",
  companyName: "",
  companyRegistrationNumber: "",
  countryOfRegistration: "",
  businessType: "",
  industrySector: "",
  yearOfIncorporation: "",
  numberOfEmployees: "",
  businessEmail: "",
  businessPhoneNumber: "",
  websiteUrl: "",
  linkedinProfile: "",
  taxIdentificationNumber: ""
};

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState({
    businessLicense: null,
    governmentCompanyId: null,
    proofOfAddress: null,
    authorizedRepresentativeId: null
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    let value = e.target.value;
    // Convert number fields to numbers or null
    if (["yearOfIncorporation", "numberOfEmployees"].includes(e.target.name)) {
      value = value === "" ? null : Number(value);
    }
    setForm({ ...form, [e.target.name]: value ?? "" });
  };

  const handleFileChange = e => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!form.name || !form.email || !form.password) {
        return "Please fill in all required fields.";
      }
      // Simple email validation
      if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        return "Please enter a valid email address.";
      }
    }
    if (step === 2) {
      if (!form.companyName || !form.companyRegistrationNumber || !form.countryOfRegistration || !form.businessType) {
        return "Please fill in all required company fields.";
      }
    }
    if (step === 3) {
      if (!form.industrySector || !form.yearOfIncorporation || !form.businessEmail || !form.businessPhoneNumber || !form.taxIdentificationNumber) {
        return "Please fill in all required business fields.";
      }
      if (form.yearOfIncorporation < 1800 || isNaN(form.yearOfIncorporation)) {
        return "Enter a valid year of incorporation (>=1800).";
      }
      if (!/^\S+@\S+\.\S+$/.test(form.businessEmail)) {
        return "Please enter a valid business email address.";
      }
    }
    return null;
  };

  const handleNext = async () => {
    setError("");
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (step === 1) {
      try {
        setLoading(true);
        const firebaseRes = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        const token = await firebaseRes.user.getIdToken();
        await attachTokenToHeaders(token);
        setUser(firebaseRes.user);
        setStep(2); // move to next step
      } catch (err) {
        setError(err.message || "Firebase registration failed");
      } finally {
        setLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setError("");
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missingFiles = ["businessLicense", "governmentCompanyId", "proofOfAddress", "authorizedRepresentativeId"].filter(f => !files[f]);
    if (missingFiles.length > 0) {
      setError("Please upload all required documents.");
      setToastType("error");
      setShowToast(true);
      return;
    }
    setLoading(true);
    const data = new FormData();
    const user = auth.currentUser;
    const firebaseUid = user ? user.uid : "";
    Object.entries(form).forEach(([key, value]) => {
      if (key === "firebaseUid") {
        data.append("firebaseUid", firebaseUid);
      } else if (value === undefined || value === null) {
        data.append(key, "");
      } else {
        data.append(key, value);
      }
    });
    Object.entries(files).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await axios.post("/api/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("Registration successful! Please wait for verification.");
      setToastType("success");
      setShowToast(true);
      setVerified(true);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const token = await res.user.getIdToken();
      await attachTokenToHeaders(token);

      await axios.post("/api/auth/register", {
        firebaseUid: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
      });

      setUser(res.user);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Google sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    const inputClass = "input w-full mb-4 px-4 py-2 text-base";
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <input className={inputClass} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input className={inputClass} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input className={inputClass} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <button onClick={handleNext} className="btn-primary w-full mt-2">
              Continue
            </button>
            <div className="my-4 text-center text-gray-400">OR</div>
            <button
              onClick={handleGoogleSignup}
              className="flex items-center justify-center w-full px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200"
              disabled={loading}
            >
              <FcGoogle className="text-xl mr-2" />
              Continue with Google
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <input name="companyName" placeholder="Company Name" required onChange={handleChange} className={inputClass} value={form.companyName ?? ""} />
            <input name="companyRegistrationNumber" placeholder="Registration Number" required onChange={handleChange} className={inputClass} value={form.companyRegistrationNumber ?? ""} />
            <select name="countryOfRegistration" required onChange={handleChange} className={inputClass} value={form.countryOfRegistration ?? ""}>
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
            <select name="businessType" required onChange={handleChange} className={inputClass} value={form.businessType ?? ""}>
              <option value="">Business Type</option>
              <option value="Producer">Producer</option>
              <option value="Certifier">Certifier</option>
              <option value="Buyer">Buyer</option>
              <option value="Regulator">Regulator</option>
            </select>
            <div className="flex gap-2 mt-4">
              <button onClick={handleBack} className="btn-secondary w-1/2">Back</button>
              <button onClick={handleNext} className="btn-primary w-1/2">Next</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <input name="industrySector" placeholder="Industry Sector" required onChange={handleChange} className={inputClass} value={form.industrySector ?? ""} />
            <input name="yearOfIncorporation" type="number" placeholder="Year of Incorporation" required onChange={handleChange} className={inputClass} value={form.yearOfIncorporation ?? ""} />
            <input name="numberOfEmployees" type="number" placeholder="Number of Employees" onChange={handleChange} className={inputClass} value={form.numberOfEmployees ?? ""} />
            <input name="businessEmail" type="email" placeholder="Business Email" required onChange={handleChange} className={inputClass} value={form.businessEmail ?? ""} />
            <input name="businessPhoneNumber" placeholder="Phone Number" required onChange={handleChange} className={inputClass} value={form.businessPhoneNumber ?? ""} />
            <input name="websiteUrl" type="url" placeholder="Website (optional)" onChange={handleChange} className={inputClass} value={form.websiteUrl ?? ""} />
            <input name="linkedinProfile" type="url" placeholder="LinkedIn (optional)" onChange={handleChange} className={inputClass} value={form.linkedinProfile ?? ""} />
            <input name="taxIdentificationNumber" placeholder="Tax ID" required onChange={handleChange} className={inputClass} value={form.taxIdentificationNumber ?? ""} />
            <div className="flex gap-2 mt-4">
              <button onClick={handleBack} className="btn-secondary w-1/2">Back</button>
              <button onClick={handleNext} className="btn-primary w-1/2">Next</button>
            </div>
          </div>
        );

      case 4:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-slate-300 mb-1">Business License:</label>
            <input name="businessLicense" type="file" required onChange={handleFileChange} className={inputClass} />
            <label className="block text-sm text-slate-300 mb-1">Govt Company ID:</label>
            <input name="governmentCompanyId" type="file" required onChange={handleFileChange} className={inputClass} />
            <label className="block text-sm text-slate-300 mb-1">Proof of Address:</label>
            <input name="proofOfAddress" type="file" required onChange={handleFileChange} className={inputClass} />
            <label className="block text-sm text-slate-300 mb-1">Authorized Rep ID:</label>
            <input name="authorizedRepresentativeId" type="file" required onChange={handleFileChange} className={inputClass} />
            <div className="flex gap-2 mt-4">
              <button type="button" onClick={handleBack} className="btn-secondary w-1/2">Back</button>
              <button type="submit" className="btn-primary w-1/2">Submit</button>
            </div>
          </form>
        );
    }
  };

  // Stepper UI
  const stepLabels = ["Account", "Company", "Business", "Documents"];
  const progress = ((step - 1) / 3) * 100;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-md mx-auto mb-6">
        <div className="flex items-center justify-between mb-2">
          {stepLabels.map((label, idx) => (
            <div key={label} className={`flex-1 text-center text-sm font-semibold ${step === idx + 1 ? "text-emerald-400" : "text-slate-400"}`}>{label}</div>
          ))}
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <AnimatedCard className="max-w-md mx-auto backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-xl card-glass">
        <h2 className="text-2xl font-bold text-white mb-4">
          {step === 1 ? "Create Account" : `Step ${step} of 4`}
        </h2>
        {error && <p className="text-sm text-red-400 mb-2">{error}</p>}
        {renderStep()}
      </AnimatedCard>
      {showToast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 ${toastType === "success" ? "success-toast" : "error-toast"}`}>{message}</div>
      )}
      {loading && <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"><div className="spinner" /></div>}
    </motion.div>
  );
}
