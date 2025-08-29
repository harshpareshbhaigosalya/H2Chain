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

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleNext = async () => {
    setError("");
    if (step === 1) {
      if (!form.name || !form.email || !form.password) {
        setError("Please fill in all required fields");
        return;
      }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = new FormData();
      data.append("firebaseUid", auth.currentUser.uid);

      Object.entries(form).forEach(([key, value]) => {
        if (key !== "password") data.append(key, value);
      });
      Object.entries(files).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      await axios.post("/api/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate(`/onboarding/${form.businessType.toLowerCase()}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
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
    switch (step) {
      case 1:
        return (
          <>
            <input className="input" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input className="input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input className="input" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <button onClick={handleNext} className="btn-primary w-full">
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
          </>
        );

      case 2:
        return (
          <>
            <input name="companyName" placeholder="Company Name" required onChange={handleChange} className="input" />
            <input name="companyRegistrationNumber" placeholder="Registration Number" required onChange={handleChange} className="input" />
            <select name="countryOfRegistration" required onChange={handleChange} className="input">
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
            <select name="businessType" required onChange={handleChange} className="input">
              <option value="">Business Type</option>
              <option value="Producer">Producer</option>
              <option value="Certifier">Certifier</option>
              <option value="Buyer">Buyer</option>
              <option value="Regulator">Regulator</option>
            </select>
            <button onClick={handleNext} className="btn-primary w-full">
              Next
            </button>
          </>
        );

      case 3:
        return (
          <>
            <input name="industrySector" placeholder="Industry Sector" required onChange={handleChange} className="input" />
            <input name="yearOfIncorporation" type="number" placeholder="Year of Incorporation" required onChange={handleChange} className="input" />
            <input name="numberOfEmployees" type="number" placeholder="Number of Employees" onChange={handleChange} className="input" />
            <input name="businessEmail" type="email" placeholder="Business Email" required onChange={handleChange} className="input" />
            <input name="businessPhoneNumber" placeholder="Phone Number" required onChange={handleChange} className="input" />
            <input name="websiteUrl" type="url" placeholder="Website (optional)" onChange={handleChange} className="input" />
            <input name="linkedinProfile" type="url" placeholder="LinkedIn (optional)" onChange={handleChange} className="input" />
            <input name="taxIdentificationNumber" placeholder="Tax ID" required onChange={handleChange} className="input" />
            <button onClick={handleNext} className="btn-primary w-full">
              Next
            </button>
          </>
        );

      case 4:
        return (
          <form onSubmit={handleSubmit}>
            <label>Business License:</label>
            <input name="businessLicense" type="file" required onChange={handleFileChange} className="input" />
            <label>Govt Company ID:</label>
            <input name="governmentCompanyId" type="file" required onChange={handleFileChange} className="input" />
            <label>Proof of Address:</label>
            <input name="proofOfAddress" type="file" required onChange={handleFileChange} className="input" />
            <label>Authorized Rep ID:</label>
            <input name="authorizedRepresentativeId" type="file" required onChange={handleFileChange} className="input" />
            <button type="submit" className="btn-primary w-full">
              Submit
            </button>
          </form>
        );
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AnimatedCard className="max-w-md mx-auto backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-4">
          {step === 1 ? "Create Account" : `Step ${step} of 4`}
        </h2>

        {error && <p className="text-sm text-red-400 mb-2">{error}</p>}

        {renderStep()}
      </AnimatedCard>

      {loading && <Loader fullScreen />}
    </motion.div>
  );
}
