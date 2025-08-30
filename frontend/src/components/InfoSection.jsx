import React from "react";

export default function InfoSection({ user }) {
  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-white">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="font-semibold">Name:</div>
          <div>{user?.name}</div>
        </div>
        <div>
          <div className="font-semibold">Email:</div>
          <div>{user?.email}</div>
        </div>
        <div>
          <div className="font-semibold">Company Name:</div>
          <div>{user?.companyName}</div>
        </div>
        <div>
          <div className="font-semibold">Company Registration Number:</div>
          <div>{user?.companyRegistrationNumber}</div>
        </div>
        <div>
          <div className="font-semibold">Country of Registration:</div>
          <div>{user?.countryOfRegistration}</div>
        </div>
        <div>
          <div className="font-semibold">Business Type:</div>
          <div>{user?.businessType}</div>
        </div>
        <div>
          <div className="font-semibold">Industry Sector:</div>
          <div>{user?.industrySector}</div>
        </div>
        <div>
          <div className="font-semibold">Year of Incorporation:</div>
          <div>{user?.yearOfIncorporation}</div>
        </div>
        <div>
          <div className="font-semibold">Business Email:</div>
          <div>{user?.businessEmail}</div>
        </div>
        <div>
          <div className="font-semibold">Business Phone Number:</div>
          <div>{user?.businessPhoneNumber}</div>
        </div>
        <div>
          <div className="font-semibold">Website URL:</div>
          <div>{user?.websiteUrl}</div>
        </div>
        <div>
          <div className="font-semibold">LinkedIn Profile:</div>
          <div>{user?.linkedinProfile}</div>
        </div>
        <div>
          <div className="font-semibold">Tax Identification Number:</div>
          <div>{user?.taxIdentificationNumber}</div>
        </div>
      </div>
    </div>
  );
}
