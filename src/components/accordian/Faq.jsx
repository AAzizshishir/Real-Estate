import React from "react";
import { Link } from "react-router";

const Faq = () => {
  return (
    <section className="mb-16 space-y-2">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
        Frequently Asked Questions
      </h2>
      <div className="collapse collapse-arrow bg-gray-100 border border-gray-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold text-gray-700">
          How do I schedule a property visit
        </div>
        <div className="collapse-content text-sm text-gray-600">
          You can schedule a visit directly from the property page by clicking
          the “Book a Tour” button. Just choose your preferred date and time,
          and our team will confirm your appointment within 24 hours. Prefer a
          call? Reach us anytime via the contact form or WhatsApp.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-100 border border-gray-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-gray-700">
          Is financing or installment payment available
        </div>
        <div className="collapse-content text-sm text-gray-600">
          Yes! We partner with trusted banks and financial institutions to offer
          flexible mortgage and installment plans. Each listing includes
          financing options—just look for the “Financing Available” badge or
          contact us for personalized guidance.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-100 border border-gray-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-gray-700">
          Are the properties verified and legally approved
        </div>
        <div className="collapse-content text-sm text-gray-600">
          Absolutely. Every property listed on our platform is thoroughly vetted
          for legal clearance, ownership authenticity, and regulatory
          compliance. We work closely with developers and legal experts to
          ensure a safe and transparent buying experience.
        </div>
      </div>
    </section>
  );
};

export default Faq;
