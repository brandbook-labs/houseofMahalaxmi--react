import React, { useState } from "react";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa6";
import Quote from '../../assets/png/format-quote.png'

// Dummy testimonials
const testimonials = [
  {
    name: "Tristan Parker",
    text: `Partnering with Samiul was a game-changer. He transformed our website's user experience, making it intuitive and visually stunning. Our customers love it!`,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
  },
  {
    name: "Tristan Parker",
    text: `Working with Samiul was a turning point. His design and attention to detail elevated our brand.`,
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    stars: 5,
  },
  {
    name: "Tristan Parker",
    text: `The collaboration with Samiul helped us launch faster and more confidently.`,
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    stars: 5,
  },
];

function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 2;

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  const visibleTestimonials = testimonials
    .concat(testimonials)
    .slice(startIndex, startIndex + visibleCards);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h4 className="text-lg md:text-xl font-medium text-[#333333]">Client Voices</h4>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#2B2B2B] mt-2">Success Stories & Testimonials</h2>
        </div>
        {/* grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 */}
        <div className="grid grid-cols-1 md:flex md:items-center-safe md:justify-center-safe gap-6">
          {visibleTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white w-full h-[350px] md:w-[480px] md:h-[280px]"
            >
              {/* <FaQuoteLeft className="text-2xl text-gray-500 mb-4" /> */}
              <img src={Quote} alt="quote" />
              <h3 className="font-semibold text-xl text-[#333333] mt-6 ">
                {item.text.split(".")[0]}.
              </h3>
              <p className="text-[#333333] text-base font-normal mt-2">{item.text.split(".").slice(1).join(".")}</p>

              <div className="flex items-center space-x-1 mt-6 text-[#FFB800]">
                {[...Array(item.stars)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <div className="flex items-center mt-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <p className="text-[#333333] font-normal">{item.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={handlePrev}
            className="w-16 h-16 rounded-full border border-[#828282]
            flex items-center justify-center text-lg hover:bg-[#DEFF03] transition"
          >
            <FaArrowLeft className="text-[#333333]" />
          </button>
          <button
            onClick={handleNext}
            className="w-16 h-16 rounded-full border border-gray-400 flex items-center justify-center text-lg hover:bg-[#DEFF03] transition"
          >
            <FaArrowRight className="text-[#333333]" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
