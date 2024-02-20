import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <main>
      <div
        className="hero min-h-screen mb-20"
        style={{ backgroundImage: "url(pharmacie.jpg)" }}
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
