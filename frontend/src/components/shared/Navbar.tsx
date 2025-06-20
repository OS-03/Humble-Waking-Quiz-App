import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from '@mui/material/Fade';
import logo from '../../assets/hm-logo.png';
import { motion } from 'framer-motion';
import Container from '@mui/material/Container';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}
function ScrollTop(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 30, right: 17 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const Navbar = (props: Props) => {
  return (
    <Container maxWidth="lg" className='sticky top-0 ml-5 mr-5'>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-5 z-10 backdrop-filter backdrop-blur-sm shadow-md rounded-2xl border border-gray-300 h-17 md:h-21 "
      >
        <div className="flex items-center justify-between mx-auto max-w-7xl px-3 md:px-5 rounded-2xl h-17 md:h-21">
          <a href="/">
            <div className="flex gap-3 md:gap-5 items-center">
                <div className="relative flex items-center justify-center text-center">
                <img
                  src={logo}
                  alt="Book Icon"
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-15 md:h-15 lg:w-19 lg:h-19 object-contain relative z-5 rounded-full opacity-75 border border-gray-100"
                />
                <span
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-900 via-sky-500 via-indigo-300 via-indigo-100 to-gray-400 opacity-75"
                />
                </div>
              <span className="mt-1 dark:hover:bg-slate-100 focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms] text-2xl md:text-4xl  bg-gradient-to-br from-blue-900 via-sky-500 via-indigo-300 via-indigo-100 to-gray-400 bg-clip-text text-transparent font-script drop-shadow-lg">
                HumbleWalking
              </span>
            </div>
          </a>
            <div className="flex items-center gap-2 md:gap-4 h-16 md:h-24">
            {/* Hamburger menu button - visible only on mobile */}
            <button
              className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => {
              const menu = document.getElementById("mobile-menu");
              if (menu) menu.classList.toggle("hidden");
              }}
              aria-label="Open menu"
            >
              <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
              </svg>
            </button>
            {/* Menu - responsive: hidden on mobile unless toggled, always visible on md+ screen */}
            <div
              id="mobile-menu"
              className="hidden md:flex flex-col md:flex-row font-medium gap-5 md:gap-5 absolute md:static top-17 md:top-auto right-0 md:right-auto w-full md:w-auto shadow-lg md:shadow-none justify-end text-right md:text-left p-3 md:p-0 lg:p-0 transition-all duration-200 md:duration-0 backdrop-filter backdrop-blur-sm bg-white/97 dark:bg-gray-900/60 rounded-2xl border border-gray-300 md:bg-transparent md:dark:bg-transparent md:border-none"
            >
              <div className="rounded-xl flex flex-col md:flex-row gap-2 md:gap-5">
              <a
                href="/quiz"
                className="p-2 rounded-xl text-sky-500 hover:bg-gray-200 hover:underline"
              >
                Take-Quiz
              </a>
              <a
                href="/quiz"
                className="p-2 rounded-xl text-sky-500 hover:underline hover:bg-gray-200"
              >
                Take-Quiz
              </a>
              <a
                href="/quiz"
                className="p-2 rounded-xl text-sky-500 hover:underline hover:bg-gray-200"
              >
                Take-Quiz
              </a>
              <a
                href="/quiz"
                className="p-2 rounded-xl text-sky-500 hover:underline hover:bg-gray-200"
              >
                Take-Quiz
              </a>
              </div>
            </div>
            </div>
        </div>
      </motion.nav>
      <Toolbar id="back-to-top-anchor" />
      <div style={{ position: 'relative', zIndex: 1000 }}>
        <ScrollTop {...props}>
          <Fade in={useScrollTrigger({ threshold: 100 })}>
            <Fab size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </Fade>
        </ScrollTop>
      </div>
  </Container>
  );
};

export default Navbar;
