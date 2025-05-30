import React, { FC } from "react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Download } from "lucide-react";

interface HeaderProps {
  full_name: string;
  welcome_message: string;
  role: string;
  resume: string;
  avatar: string;
}

const Header: FC<HeaderProps> = ({ full_name, welcome_message, role, resume, avatar }) => {
  return (
    <section className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4">
      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.8, type: "spring", stiffness: 100 }}>
        <Avatar className="h-16 w-16 sm:h-24 sm:w-24 flex-shrink-0">
          <AvatarImage src={avatar} alt="Profile" />
          <AvatarFallback>{full_name.charAt(0)}</AvatarFallback>
        </Avatar>
      </motion.div>
      <motion.h3 initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo">
        Hi! I&apos;m {full_name}
      </motion.h3>
      <motion.h1 initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo">
        {role}
      </motion.h1>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="max-w-2xl mx-auto font-Ovo">
        {welcome_message}
      </motion.p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          href="#contact"
          className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent"
        >
          contact me <ArrowRight className="w-4" />
        </motion.a>

        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          href={resume}
          target="_blank"
          download
          className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black"
        >
          my resume <Download className="w-4" />
        </motion.a>
      </div>
    </section>
  );
};

export default Header;
