import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import NavBar from './shared/Navbar';
import QuizPopup from './QuizPopup';
import { motion } from 'framer-motion';
import MiniOwlImg from '../assets/miniowl.png';
import Footer from './shared/Footer';


export default function Home() {
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [showQuizButton, setShowQuizButton] = React.useState(false);
  const [showBadge, setShowBadge] = React.useState(true); // State to manage badge visibility

  const questions = [
    { question: "What level of education do you want to pursue abroad?", options: ["Bachelor's", "Master's", "PhD", "Diploma", "Still deciding"] },
    { question: "What's your preferred field of study?", options: ["Engineering/Tech", "Business/Management", "Health & Medicine", "Humanities/Arts", "Research/Science", "Other"] },
    { question: "Do you have a preferred intake?", options: ["Fall", "Spring", "Not Decided Yet"] },
    { question: "What's your budget range (INR)?", options: ["<10 Lakhs", "10-20 Lakhs", "20+ Lakhs"] },
    { question: "What stage are you currently at in your academic journey?", options: ["12th grade", "Undergraduate", "Recently graduated", "Postgraduate", "Other"] },
    { question: "Which stream/field are you currently studying or graduated from?", options: ["Engineering/Tech", "Commerce/Management", "Science/Research", "Arts/Humanities", "Other"] },
    { question: "What is your current rate of academic performance so far?", options: ["Excellent (Above 80%)", "Good (65-80%)", "Average (50-65%)", "Below average"] },
    { question: "Are you currently enrolled in any test preparation course?", options: ["IELTS", "TOEFL", "GRE/GMAT", "French", "English", "Some or All of the Above", "Not enrolled yet", "Not needed"] },
    { question: "When are you planning to go abroad for study?", options: ["Within 6 months", "In a year", "1-2 years later", "No fixed timeline"] },
    { question: "What's your primary motivation to study abroad?", options: ["Better education quality", "Global exposure", "Job opportunities", "PR & settlement", "Peer/Family influence", "Research opportunities"] },
    { question: "How important is research to your study plans?", options: ["Very important", "Somewhat important", "Not important"] },
    { question: "What is your preferred language of instruction?", options: ["English", "French", "German", "Other"] },
    { question: "How important is cultural diversity in your destination?", options: ["Very important", "Somewhat important", "Not important"] },
    { question: "Do you prefer a Western or Asian cultural environment?", options: ["Western", "Asian", "No preference"] },
    { question: "Are you interested in countries with strong public safety?", options: ["Yes", "Somewhat", "No preference"] },
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => setShowQuizButton(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleIconClick = () => {
    setShowQuiz(true);
    setShowBadge(false); // Remove the badge on icon click
  };



  return (

    <div className="h-full w-screen bg-gradient-to-l from-gray-200 via-blue-100 to-stone-100">
      <NavBar />
      <Typography variant="h4" align="center" component="h1" sx={{ mb: 2 }}>
        Quiz App
      </Typography>
      <div className='text-justify mx-5 sm:mx-7 md:mx-27 lg:mx-39' >
        <div className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quos similique, labore corrupti commodi consectetur dignissimos. Aperiam officia est, consequatur officiis ea numquam, nulla facere ipsa dolorum nesciunt ipsum nostrum.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint hic temporibus corporis possimus excepturi asperiores rerum alias ab delectus quidem obcaecati quod, soluta officia facere? Perferendis reiciendis eius nostrum aliquid?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, neque dolores? Unde amet dignissimos fuga, cupiditate id non, quaerat ex, nam necessitatibus quia iusto est autem facere molestiae! Cum, repellat?
        </div>
        <div className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quos similique, labore corrupti commodi consectetur dignissimos. Aperiam officia est, consequatur officiis ea numquam, nulla facere ipsa dolorum nesciunt ipsum nostrum.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint hic temporibus corporis possimus excepturi asperiores rerum alias ab delectus quidem obcaecati quod, soluta officia facere? Perferendis reiciendis eius nostrum aliquid?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, neque dolores? Unde amet dignissimos fuga, cupiditate id non, quaerat ex, nam necessitatibus quia iusto est autem facere molestiae! Cum, repellat?
        </div>
        <div className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quos similique, labore corrupti commodi consectetur dignissimos. Aperiam officia est, consequatur officiis ea numquam, nulla facere ipsa dolorum nesciunt ipsum nostrum.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint hic temporibus corporis possimus excepturi asperiores rerum alias ab delectus quidem obcaecati quod, soluta officia facere? Perferendis reiciendis eius nostrum aliquid?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, neque dolores? Unde amet dignissimos fuga, cupiditate id non, quaerat ex, nam necessitatibus quia iusto est autem facere molestiae! Cum, repellat?
        </div>
        <div className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quos similique, labore corrupti commodi consectetur dignissimos. Aperiam officia est, consequatur officiis ea numquam, nulla facere ipsa dolorum nesciunt ipsum nostrum.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint hic temporibus corporis possimus excepturi asperiores rerum alias ab delectus quidem obcaecati quod, soluta officia facere? Perferendis reiciendis eius nostrum aliquid?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, neque dolores? Unde amet dignissimos fuga, cupiditate id non, quaerat ex, nam necessitatibus quia iusto est autem facere molestiae! Cum, repellat?
        </div>
        <div className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quos similique, labore corrupti commodi consectetur dignissimos. Aperiam officia est, consequatur officiis ea numquam, nulla facere ipsa dolorum nesciunt ipsum nostrum.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint hic temporibus corporis possimus excepturi asperiores rerum alias ab delectus quidem obcaecati quod, soluta officia facere? Perferendis reiciendis eius nostrum aliquid?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, neque dolores? Unde amet dignissimos fuga, cupiditate id non, quaerat ex, nam necessitatibus quia iusto est autem facere molestiae! Cum, repellat?
        </div>
      </div>
      {/*
            Show the button after a delay (e.g., 2 minutes = 120000 ms)
          */}

      {showQuizButton && !showQuiz && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-8 left-6 z-[300]"
        >
          <div className="relative">
            <button
              onClick={() => setShowQuizButton(false)}
              className="absolute bottom-0 left-0 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 shadow text-xs z-20"
              aria-label="Dismiss quiz button"
              tabIndex={0}
              type="button"
            >
              ✕
            </button>
            <div className="relative inline-block">
              {showBadge && (
                <div className="relative top-3 left-33 -translate-x-1/2 z-10 flex items-center">
                  <div className="flex bg-white border border-blue-300 rounded-full rounded-bl-none shadow px-3 py-1.5 text-sky-700 font-semibold text-[0.7rem] max-w-[180px]">
                    Still Confused?
                    <button
                      onClick={() => setShowBadge(false)}
                      className="ml-2 text-sky-800 hover:text-blue-700 text-xs font-bold rounded-full focus:outline-none"
                      aria-label="Dismiss badge"
                      tabIndex={0}
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
              <button
                onClick={handleIconClick}
                className="bg-sky-200 text-white rounded-full w-[108px] h-[108px] flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30"
                aria-label="Take the Quiz"
              >
                <div className="relative flex items-center justify-center text-center">
                  <img
                    src={MiniOwlImg}
                    alt="Book Icon"
                    className="w-[84px] h-[84px] object-contain relative z-10 rounded-full"
                  />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-900 via-sky-500 via-indigo-300 via-indigo-100 to-gray-400 opacity-75" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {showQuiz && (
        <QuizPopup
          questions={questions}
          onClose={() => setShowQuiz(false)}
        />
      )}
      <Footer />

    </div>

  );
}
