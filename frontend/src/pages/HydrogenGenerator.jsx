import React, { useState } from "react";
import AnimatedCard from "../components/AnimatedCard";
import API, { attachTokenToHeaders } from "../api";
import { auth } from "../firebase";

const steps = [
  "Hydrogen Details",
  "Upload Documents",
  "Upload Certificate",
  "Terms & Conditions",
  "Review & Submit"
];

export default function HydrogenGenerator() {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(0);
  const [certificateType, setCertificateType] = useState("");
  const [ppa, setPpa] = useState(null);
  const [eac, setEac] = useState(null);
  const [generationLogs, setGenerationLogs] = useState(null);
  const [auditorReport, setAuditorReport] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleFile(setter) {
    return e => setter(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const token = await auth.currentUser.getIdToken();
      await attachTokenToHeaders(token);
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("certificateType", certificateType);
      formData.append("ppa", ppa);
      if (eac) formData.append("eac", eac);
      formData.append("generationLogs", generationLogs);
      formData.append("auditorReport", auditorReport);
      formData.append("certificate", certificate);
      await API.post("/api/hydrogen/generate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Submitted for verification!");
      setStep(0);
      setAmount(0);
      setCertificateType("");
      setPpa(null);
      setEac(null);
      setGenerationLogs(null);
      setAuditorReport(null);
      setCertificate(null);
      setTermsAccepted(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <AnimatedCard>
        <div className="mb-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">H₂</span>
          </div>
          <h2 className="text-2xl font-bold text-emerald-400">Hydrogen Generation Submission</h2>
        </div>
        <div className="flex gap-2 mb-8 justify-center">
          {steps.map((s, idx) => (
            <div key={s} className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${step === idx ? "bg-emerald-500 text-white shadow-lg" : "bg-slate-800 text-emerald-300"}`}>{s}</div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 0 && (
            <>
              <div>
                <label className="block font-semibold mb-1">Amount Generated (kg)</label>
                <input type="number" min={0} value={amount} onChange={e => setAmount(Number(e.target.value))} className="input w-full" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Certificate Type</label>
                <select value={certificateType} onChange={e => setCertificateType(e.target.value)} className="input w-full" required>
                  <option value="">Select certificate type</option>
                  <option value="EACs">Energy Attribute Certificates (EACs)</option>
                  <option value="Guarantees of Origin">Guarantees of Origin</option>
                  <option value="RECs">RECs</option>
                  <option value="Direct PPA">Direct PPA</option>
                  <option value="Supplier Green Contract">Supplier Green Contract (Power Purchase Agreement)</option>
                </select>
              </div>
              <button type="button" className="btn-primary w-full mt-4" onClick={() => setStep(1)}>Next</button>
            </>
          )}
          {step === 1 && (
            <>
              <div>
                <label className="block font-semibold mb-1">Upload PPA (Power Purchase Agreement) <span className="text-red-400">*</span></label>
                <input type="file" accept="application/pdf,image/*" onChange={handleFile(setPpa)} className="input w-full" required />
                {ppa && <div className="mt-2 text-sm text-emerald-400">{ppa.name}</div>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Upload EACs (Energy Attribute Certificates) <span className="text-slate-400">(optional)</span></label>
                <input type="file" accept="application/pdf,image/*" onChange={handleFile(setEac)} className="input w-full" />
                {eac && <div className="mt-2 text-sm text-emerald-400">{eac.name}</div>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Upload On-site Renewable Generation Logs <span className="text-red-400">*</span></label>
                <input type="file" accept="application/pdf,image/*" onChange={handleFile(setGenerationLogs)} className="input w-full" required />
                {generationLogs && <div className="mt-2 text-sm text-emerald-400">{generationLogs.name}</div>}
              </div>
              <div>
                <label className="block font-semibold mb-1">Upload Third-party Auditor Report <span className="text-red-400">*</span></label>
                <input type="file" accept="application/pdf,image/*" onChange={handleFile(setAuditorReport)} className="input w-full" required />
                {auditorReport && <div className="mt-2 text-sm text-emerald-400">{auditorReport.name}</div>}
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" className="btn-secondary w-full" onClick={() => setStep(0)}>Back</button>
                <button type="button" className="btn-primary w-full" onClick={() => setStep(2)}>Next</button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <label className="block font-semibold mb-1">Upload Certificate <span className="text-red-400">*</span></label>
                <input type="file" accept="application/pdf,image/*" onChange={handleFile(setCertificate)} className="input w-full" required />
                {certificate && <div className="mt-2 text-sm text-emerald-400">{certificate.name}</div>}
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" className="btn-secondary w-full" onClick={() => setStep(1)}>Back</button>
                <button type="button" className="btn-primary w-full" onClick={() => setStep(3)}>Next</button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="bg-slate-800 p-4 rounded-xl mb-4">
                <h4 className="font-bold text-emerald-400 mb-2">Terms & Conditions</h4>
                <ul className="list-disc ml-6 text-slate-300 text-sm">
                  <li>Trust: Transparent, auditable proof ensures credits are legitimate.</li>
                  <li>Compliance: Meets global certification standards (GO, REC, I-REC).</li>
                  <li>Market Integrity: Prevents greenwashing by linking physical evidence to digital assets.</li>
                  <li>Investment Growth: Attracts climate-focused investors and government incentives.</li>
                  <li>Privacy: All data is handled securely and in accordance with our privacy policy.</li>
                </ul>
                <div className="mt-4 flex items-center">
                  <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="mr-2" />
                  <span className="text-slate-200 text-sm">I accept all terms and conditions.</span>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" className="btn-secondary w-full" onClick={() => setStep(2)}>Back</button>
                <button type="button" className="btn-primary w-full" disabled={!termsAccepted} onClick={() => setStep(4)}>Next</button>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div className="bg-slate-900 p-4 rounded-xl mb-4">
                <h4 className="font-bold text-emerald-400 mb-2">Review Submission</h4>
                <div className="text-slate-200 text-sm mb-2">Amount: <span className="font-semibold">{amount} kg</span></div>
                <div className="text-slate-200 text-sm mb-2">Certificate Type: <span className="font-semibold">{certificateType}</span></div>
                <div className="text-slate-200 text-sm mb-2">PPA: <span className="font-semibold">{ppa?.name || "Not uploaded"}</span></div>
                <div className="text-slate-200 text-sm mb-2">EACs: <span className="font-semibold">{eac?.name || "Not uploaded"}</span></div>
                <div className="text-slate-200 text-sm mb-2">Generation Logs: <span className="font-semibold">{generationLogs?.name || "Not uploaded"}</span></div>
                <div className="text-slate-200 text-sm mb-2">Auditor Report: <span className="font-semibold">{auditorReport?.name || "Not uploaded"}</span></div>
                <div className="text-slate-200 text-sm mb-2">Certificate: <span className="font-semibold">{certificate?.name || "Not uploaded"}</span></div>
              </div>
              {error && <div className="text-red-400 mb-2">{error}</div>}
              <div className="flex gap-4 mt-6">
                <button type="button" className="btn-secondary w-full" onClick={() => setStep(3)}>Back</button>
                <button type="submit" className="btn-primary w-full" disabled={submitting || !termsAccepted}>
                  {submitting ? "Submitting..." : "Submit for Verification"}
                </button>
              </div>
            </>
          )}
        </form>
      </AnimatedCard>
    </div>
  );
}
