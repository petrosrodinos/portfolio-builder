import React, { FC } from "react";
import { motion } from "motion/react";
import { Education } from "@/interfaces/templates";
import Link from "next/link";
import { LinkIcon, Building2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: FC<EducationSectionProps> = ({ education }) => {
  if (education?.length === 0) return null;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        My Education
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        My Latest Education
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-auto gap-6 my-10"
      >
        {education.map((education, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={index}
            className="border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white"
          >
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">{education.title}</h3>

            <div className="flex flex-col gap-2 mb-4">
              {education.institution && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/80">
                  <Building2 className="h-4 w-4" />
                  <span>{education.institution}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/80">
                <Calendar className="h-4 w-4" />
                <span>
                  {education.start} - {education?.finish || "Present"}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
              {education.description}
            </p>
            {education.link && (
              <Link
                href={education.link}
                target="_blank"
                className={cn(
                  "inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mt-1"
                )}
              >
                <LinkIcon className="h-4 w-4" />
                <span>View</span>
              </Link>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default EducationSection;
