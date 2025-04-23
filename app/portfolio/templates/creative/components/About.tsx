import React, { FC } from "react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Education, Experience, Skill, Project, Service, Language } from "@/interfaces/templates";
import { GraduationCap, Code, Briefcase } from "lucide-react";
import { SkillOptions } from "@/constants/dropdowns/skills";
import { LanguagesOptions } from "@/constants/dropdowns/languages";

interface AboutProps {
  avatar: string;
  bio: string;
  full_name: string;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  skills: Skill[];
  services: Service[];
  languages: Language[];
}

const About: FC<AboutProps> = ({
  avatar,
  bio,
  full_name,
  experiences,
  projects,
  education,
  skills,
  services,
  languages,
}) => {
  return (
    <motion.section
      id="about"
      className="w-full px-[12%] py-10 scroll-mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        Introduction
      </motion.h4>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        About me
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex w-full flex-col lg:flex-row items-center gap-20 my-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-64 sm:w-80 rounded-3xl max-w-none"
        >
          <Avatar className="h-16 w-16 sm:h-24 sm:w-24 flex-shrink-0">
            <AvatarImage src={avatar} alt="Profile" />
            <AvatarFallback>{full_name.charAt(0)}</AvatarFallback>
          </Avatar>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex-1"
        >
          <p className="mb-10 max-w-2xl font-Ovo">{bio}</p>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
          >
            {services?.length > 0 && (
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50"
              >
                <Code className="w-7 mt-3" />
                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">Services</h3>
                <p className="text-gray-600 text-sm dark:text-white/80">
                  {services.map((service) => service.title).join(", ")}
                </p>
              </motion.li>
            )}
            {education?.length > 0 && (
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50"
              >
                <GraduationCap className="w-7 mt-3" />
                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">Education</h3>
                <p className="text-gray-600 text-sm dark:text-white/80">
                  {education?.map((education) => education.title).join(", ")}
                </p>
              </motion.li>
            )}
            {projects?.length > 0 && (
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50"
              >
                <Code className="w-7 mt-3" />
                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">Projects</h3>
                <p className="text-gray-600 text-sm dark:text-white/80">
                  {projects.map((project) => project.title).join(", ")}
                </p>
              </motion.li>
            )}
            {experiences?.length > 0 && (
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50"
              >
                <Briefcase className="w-7 mt-3" />
                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">Experience</h3>
                <p className="text-gray-600 text-sm dark:text-white/80">
                  {experiences?.map((experience) => experience.title).join(", ")}
                </p>
              </motion.li>
            )}
          </motion.ul>

          {skills?.length > 0 && (
            <>
              <motion.h4
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="my-6 text-gray-700 font-Ovo dark:text-white/80"
              >
                Skills I have
              </motion.h4>

              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="flex items-center gap-3 sm:gap-5"
              >
                {skills?.map((skill, index) => {
                  const skillOption = SkillOptions.find((option) => option.value === skill.title);
                  return (
                    <motion.li
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg dark:shadow-gray-900 transition-all duration-300 cursor-pointer group"
                      key={index}
                    >
                      {skillOption?.label} • {skill?.level}
                    </motion.li>
                  );
                })}
              </motion.ul>
            </>
          )}

          {languages?.length > 0 && (
            <>
              <motion.h4
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="my-6 text-gray-700 font-Ovo dark:text-white/80"
              >
                Languages I speak
              </motion.h4>
              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="flex items-center gap-3 sm:gap-5"
              >
                {languages?.map((language, index) => {
                  const languageOption = LanguagesOptions.find(
                    (option) => option.value === language.title
                  );
                  if (!languageOption) {
                    return null;
                  }
                  return (
                    <motion.li
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg dark:shadow-gray-900 transition-all duration-300 cursor-pointer group"
                      key={index}
                    >
                      {languageOption?.label} • {language?.level}
                    </motion.li>
                  );
                })}
              </motion.ul>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;
