import React, { FC } from "react";
import { motion } from "motion/react";
import { Service } from "@/interfaces/templates";
interface ServicesProps {
  services: Service[];
}

const Services: FC<ServicesProps> = ({ services }) => {
  if (services?.length === 0) return null;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="services"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        What I offer
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        My Services
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-auto gap-6 my-10"
      >
        {services.map((service, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={index}
            className="border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white"
          >
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">{service.title}</h3>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
              {service.description}
            </p>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">€{service.price}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Services;
