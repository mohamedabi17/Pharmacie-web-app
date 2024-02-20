import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <main>
      <div
        className="hero min-h-screen mb-20"
        style={{ backgroundImage: "url(pharmacy.jpg)" }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Our Pharmacy</h1>
            <p className="mb-5">A Trusted Source for All Your Medication Needs.</p>
            <p className="">
              Our pharmacy is dedicated to providing quality, affordable medications and
              healthcare products to our community. With a commitment to excellence and
              customer service, we strive to make your pharmacy experience as seamless
              and convenient as possible.
            </p>
            <p className="">
              Whether you need prescription medications, over-the-counter products,
              or professional health advice, our team of pharmacists and healthcare
              professionals is here to help. We offer a wide range of services,
              including medication dispensing, medication counseling, and health
              screenings.
            </p>
            <p className="">
              At our pharmacy, we believe in fostering a healthy community by
              providing accessible, reliable healthcare services. We look forward
              to serving you and your family for all your healthcare needs.
            </p>
            <button className="btn btn-primary">
              <Link href="/login">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
