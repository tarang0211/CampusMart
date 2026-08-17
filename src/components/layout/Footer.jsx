import React from "react";
import {
  Heart,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
} from "lucide-react";

import tarangPhoto from "../../tarang.jpeg";

export const Footer = () => {
  return (
    <footer
      className="
        mt-16
        border-t border-[#e5e2da]
        bg-[#f7f6f2]
        text-[#171717]
        dark:border-[#27312d]
        dark:bg-[#111614]
        dark:text-white
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT - BITMART */}
          <div>

            <div className="flex items-center gap-2 mb-4">

              <div
                className="
                  w-9 h-9 rounded-xl
                  bg-[#176b5b]/10
                  border border-[#176b5b]/20
                  flex items-center justify-center
                  dark:bg-emerald-500/15
                  dark:border-emerald-500/20
                "
              >
                <span className="text-[#176b5b] dark:text-emerald-400 font-extrabold text-lg">
                  B
                </span>
              </div>

              <span className="text-xl font-extrabold tracking-tight">
                Bit<span className="text-[#176b5b] dark:text-emerald-400">Mart</span>
              </span>

            </div>

            <p
              className="
                text-sm leading-6 max-w-md
                text-[#6b6963]
                dark:text-slate-400
              "
            >
              A student-to-student marketplace built exclusively for
              the BIT Mesra campus community. Buy, sell and discover
              useful items within your campus.
            </p>

            <div
              className="
                flex items-center gap-2 mt-5 text-xs
                text-[#77746d]
                dark:text-slate-500
              "
            >
              Made with

              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />

              for BIT Mesra students
            </div>

          </div>


          {/* RIGHT - DEVELOPER */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:justify-end gap-5">

            {/* PHOTO */}
            <div className="relative shrink-0">

              <div
                className="
                  w-24 h-24 rounded-2xl overflow-hidden
                  border border-[#d6d3cb]
                  shadow-xl
                  dark:border-slate-700
                "
              >
                <img
                  src={tarangPhoto}
                  alt="Tarang Kumar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="
                  absolute -bottom-2 -right-2
                  bg-[#176b5b]
                  text-white
                  text-[10px] font-extrabold
                  px-2 py-1 rounded-full
                  border-2 border-[#f7f6f2]
                  dark:bg-emerald-500
                  dark:text-[#07100d]
                  dark:border-[#111614]
                "
              >
                Developer
              </div>

            </div>


            {/* INFO */}
            <div className="text-center sm:text-left">

              <p
                className="
                  text-xs uppercase tracking-[0.2em]
                  text-[#176b5b]
                  dark:text-emerald-400
                  font-bold mb-1
                "
              >
                About the Developer
              </p>

              <h3 className="text-xl font-extrabold text-[#171717] dark:text-white">
                Tarang Kumar
              </h3>

              <p className="text-sm text-[#6b6963] dark:text-slate-400 mt-1">
                B.Tech AI & ML · BIT Mesra
              </p>


              {/* SOCIAL LINKS */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-5">

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/tarang0211/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="
                    w-9 h-9 rounded-xl
                    border border-[#d6d3cb]
                    bg-white
                    flex items-center justify-center
                    text-[#77746d]
                    hover:text-[#176b5b]
                    hover:border-[#176b5b]/50
                    hover:bg-[#176b5b]/5
                    transition-all
                    dark:border-slate-700
                    dark:bg-slate-900/60
                    dark:text-slate-400
                    dark:hover:text-white
                    dark:hover:border-emerald-500/50
                    dark:hover:bg-emerald-500/10
                  "
                >
                  <Linkedin className="w-4 h-4" />
                </a>


                {/* Instagram */}
                <a
                  href="https://www.instagram.com/tarang1230/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="
                    w-9 h-9 rounded-xl
                    border border-[#d6d3cb]
                    bg-white
                    flex items-center justify-center
                    text-[#77746d]
                    hover:text-[#176b5b]
                    hover:border-[#176b5b]/50
                    hover:bg-[#176b5b]/5
                    transition-all
                    dark:border-slate-700
                    dark:bg-slate-900/60
                    dark:text-slate-400
                    dark:hover:text-white
                    dark:hover:border-emerald-500/50
                    dark:hover:bg-emerald-500/10
                  "
                >
                  <Instagram className="w-4 h-4" />
                </a>


                {/* Email */}
                <a
                  href="mailto:tarangkumar0211@gmail.com"
                  aria-label="Email"
                  className="
                    w-9 h-9 rounded-xl
                    border border-[#d6d3cb]
                    bg-white
                    flex items-center justify-center
                    text-[#77746d]
                    hover:text-[#176b5b]
                    hover:border-[#176b5b]/50
                    hover:bg-[#176b5b]/5
                    transition-all
                    dark:border-slate-700
                    dark:bg-slate-900/60
                    dark:text-slate-400
                    dark:hover:text-white
                    dark:hover:border-emerald-500/50
                    dark:hover:bg-emerald-500/10
                  "
                >
                  <Mail className="w-4 h-4" />
                </a>

              </div>

            </div>

          </div>

        </div>


        {/* BOTTOM */}
        <div
          className="
            mt-10 pt-6
            border-t border-[#e5e2da]
            flex flex-col sm:flex-row
            items-center justify-between
            gap-3
            dark:border-slate-800/70
          "
        >

          <p className="text-xs text-[#77746d] dark:text-slate-500">
            © {new Date().getFullYear()} BitMart. Built for BIT Mesra.
          </p>


          <a
            href="https://www.linkedin.com/in/tarang0211/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1.5
              text-xs
              text-[#77746d]
              hover:text-[#176b5b]
              transition-colors
              dark:text-slate-500
              dark:hover:text-emerald-400
            "
          >
            <span>Designed & developed by</span>

            <span className="font-semibold text-[#363431] dark:text-slate-300">
              Tarang Kumar
            </span>

            <ExternalLink className="w-3 h-3" />
          </a>

        </div>

      </div>
    </footer>
  );
};