import React from 'react';
import { GoArrowUpRight } from "react-icons/go";
import Energy from '../../assets/png/energy.png';

const blogs = [
  {
    icon: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Solar Energy Solutions',
    description:
      'Harness the power of the sun with our comprehensive solar panel installations and maintenance blogs. From residential rooftops to commercial solar farms, we provide customized solutions that maximize efficiency and savings.',
  },
  {
    icon: 'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Wind Energy Systems',
    description:
      'Tap into the wind’s potential with our innovative wind turbine installations. Our team designs and implements systems tailored to your location, helping you generate clean, renewable energy and reduce reliance on conventional sources.',
  },
  {
    icon: 'https://plus.unsplash.com/premium_photo-1682148205811-e8a8ce759f4b?q=80&w=1306&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Energy Storage Solutions',
    description:
      'Enhance your energy independence with our advanced energy storage systems. We offer cutting-edge battery storage solutions that ensure you have a reliable power supply, even when renewable sources are intermittent.',
  },
  {
    icon: Energy,
    title: 'Consultation and Energy Audits',
    description:
      'Optimize your energy use with our expert consultation and energy audit blogs. We assess your current energy consumption, identify opportunities for improvement, and recommend strategies to enhance efficiency and sustainability.',
  },
];

function Card() {
  return (
    <section id='Industries' className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-medium text-[#333333]">Blog & News</h2>
        {/* <button 
          className="bg-[#DEFF03] text-[#333333] px-8 py-4 rounded-full 
          font-medium text-base flex items-center gap-1 transition cursor-pointer"
        >
          View More <GoArrowUpRight className='text-2xl' />
        </button> */}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.slice(0, 3).map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="h-[250px] w-full mb-4">
                <img src={blog.icon} alt={blog.title} className='rounded-lg w-full h-full' />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#4F4F4F]">{blog.title}</h3>
            <p className="text-base font-normal text-[#828282]">{blog.description.slice(0, 90)}...</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Card;