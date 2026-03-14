import React from "react";
import { GoArrowUpRight } from "react-icons/go";

function Subscriber() {
  return (
    <section className="bg-[#F2F2F2] py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-[#333333] mb-4">
          Subscribe Now to get started
        </h2>
        <p className="text-[#828282] text-base font-normal mb-8">
          Subscribe now to start your journey with renewable energy. Access expert solutions, reduce your carbon footprint, and save on energy costs today!
        </p>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter email"
            className="w-full sm:w-auto lg:w-[20rem] px-8 py-4 rounded-full bg-[#E0E0E0] text-lg font-semibold placeholder:font-normal placeholder:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-[#DEFF03] text-[#333333] px-8 py-4 rounded-full w-full md:w-fit
            font-medium text-base flex items-center-safe justify-center-safe gap-1 transition cursor-pointer"
          >
            Subscribe <GoArrowUpRight className="ml-1 text-2xl text-black" />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Subscriber;