import React from 'react';
import BgImage from '../../assets/png/water-bg.png'; // Replace with your actual image
import { GoArrowUpRight } from "react-icons/go";

function SustainableEnergy() {
  return (
    <section id='Projects'
      className="relative bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="bg-black/40 w-full h-full absolute top-0 left-0 z-0"></div>

      {/* Content Box */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 md:p-10 text-white">
          <h2 className="text-2xl md:text-3xl font-medium text-[#F2F2F2] mb-4">
            Innovative Solutions for Sustainable Energy Development
          </h2>
          <p className="text-base font-normal mb-6 text-[#F2F2F2]">
            We deliver innovative solutions that advance sustainability and promote clean energy for a greener future.
          </p>
          <ul className="list-disc ml-5 space-y-2 text-[#F2F2F2] text-sm md:text-base">
            <li><strong>Expertise in Renewable Technologies:</strong> Specialized in solar, wind, and energy storage solutions.</li>
            <li><strong>Customized Solutions:</strong> Tailored energy systems to meet specific needs and maximize efficiency.</li>
            <li><strong>Sustainable Impact:</strong> Focused on reducing carbon footprints and promoting environmental stewardship.</li>
            <li><strong>Comprehensive Service:</strong> From installation to maintenance and energy audits, we offer end-to-end support.</li>
            <li><strong>Customer–Centric Approach:</strong> Committed to delivering high-quality service and fostering strong client relationships.</li>
            <li><strong>Innovation–Driven:</strong> Utilizing the latest technologies and practices to advance renewable energy adoption.</li>
          </ul>

          {/* Action Button */}
          <div className="mt-8">
            <button className="bg-lime-400 text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-lime-500 transition">
              <GoArrowUpRight className='text-2xl' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SustainableEnergy;
