import React, { FC } from "react";
import { motion } from "motion/react";
import { Project } from "@/interfaces/templates";
import Link from "next/link";
import { LinkIcon, Building2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
interface WorkProps {
  projects: Project[];
}

const Work: FC<WorkProps> = ({ projects }) => {
  if (projects?.length === 0) return null;
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
        My Projects
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        My latest work
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-auto gap-6 my-10"
      >
        {projects.map((project, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={index}
            className="border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white"
          >
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">{project.title}</h3>

            <div className="flex flex-col gap-2 mb-4">
              {project.company && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/80">
                  <Building2 className="h-4 w-4" />
                  <span>{project.company}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/80">
                <Calendar className="h-4 w-4" />
                <span>
                  {project.start} - {project.finish || "Present"}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
              {project.description}
            </p>
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                className={cn(
                  "inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mt-4"
                )}
              >
                <LinkIcon className="h-4 w-4" />
                <span>View Project</span>
              </Link>
            )}
          </motion.div>
        ))}
      </motion.div>
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-auto my-10 gap-5 dark:text-black"
      >
        {workData.map((project, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            key={index}
            className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
            style={{ backgroundImage: `url(${project.bgImage})` }}
          >
            <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
              <div>
                <h2 className="font-semibold">{project.title}</h2>
                <p className="text-sm text-gray-700">{project.description}</p>
              </div>
              <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                <Image src={assets.send_icon} alt="send icon" className="w-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div> */}
    </motion.section>
  );
};

export default Work;
