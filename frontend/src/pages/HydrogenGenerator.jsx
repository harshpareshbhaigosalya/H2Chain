import React, { useState } from "react";
import AnimatedCard from "../components/AnimatedCard";
import API, { attachTokenToHeaders } from "../api";
import { auth } from "../firebase";

export default function HydrogenGenerator() {
  const [amount, setAmount] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [certificate, setCertificate] = useState(null);
  const [certificateType, setCertificateType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleDocumentUpload(e) {
    setDocuments([...documents, ...e.target.files]);
  }

  function handleCertificateUpload(e) {
    setCertificate(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = await auth.currentUser.getIdToken();
      await attachTokenToHeaders(token);
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("certificateType", certificateType);
      documents.forEach((doc, idx) => formData.append(`documents`, doc));
      if (certificate) formData.append("certificate", certificate);
      await API.post("/api/hydrogen/generate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Submitted for verification!");
      setAmount(0);
      setDocuments([]);
      setCertificate(null);
      setCertificateType("");
    } catch (err) {
      alert("Submission failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <AnimatedCard>
        <h2 className="text-2xl font-bold mb-4">Hydrogen Generation Submission</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Amount Generated (kg)</label>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Certificate Type</label>
            <select
              value={certificateType}
              onChange={e => setCertificateType(e.target.value)}
              className="input w-full"
              required
            >
              <option value="">Select certificate type</option>
              <option value="EACs">Energy Attribute Certificates (EACs)</option>
              <option value="Guarantees of Origin">Guarantees of Origin</option>
              <option value="RECs">RECs</option>
              <option value="Direct PPA">Direct PPA</option>
              <option value="Supplier Green Contract">Supplier Green Contract (Power Purchase Agreement)</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Upload Documents</label>
            <input
              type="file"
              multiple
              onChange={handleDocumentUpload}
              className="input w-full"
              required
            />
            <div className="mt-2 text-sm text-gray-600">
              {documents.length > 0 && `${documents.length} document(s) selected.`}
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Upload Certificate</label>
            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={handleCertificateUpload}
              className="input w-full"
              required
            />
            <div className="mt-2 text-sm text-gray-600">
              {certificate && `Certificate: ${certificate.name}`}
            </div>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit for Verification"}
          </button>
        </form>
      </AnimatedCard>
    </div>
  );
}
