import * as React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import { Button } from './ui/button';
import { ProgressBar } from './ui/progress-bar';
import { QuizSummary } from './QuizSummary';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const PEXELS_API_KEY = 'SaSmcXK6iEYSeeoObuHt5dPv28U2MPB3YfMhOAxPtMpL0QIZt7aySjn9';
const PEXELS_BASE_URL = 'https://api.pexels.com/v1';

const getRandomPexelsImage = async (query: string = 'university study Abroad') => {
    try {
        const response = await fetch(`${PEXELS_BASE_URL}/search?query=${query}&per_page=39`, {
            headers: {
                Authorization: PEXELS_API_KEY,
            },
        });
        const data = await response.json();
        const photos = data.photos || [];
        if (photos.length > 0) {
            const randomIndex = Math.floor(Math.random() * photos.length);
            return photos[randomIndex]?.src?.original || null;
        }
        return null;
    } catch (error) {
        console.error('Error fetching random Pexels image:', error);
        return null;
    }
};
function SummaryChart({
    questions,
    answers,
}: {
    questions: { question: string; options: string[] }[];
    answers: Record<number, string>;
}) {
    // Count how many questions were answered and skipped
    const total = questions.length;
    const answered = Object.values(answers).filter((a) => a && a.trim() !== '').length;
    const skipped = Object.values(answers).filter((a) => a === '').length;

    // Show a simple bar and counts
    return (
        <div className="flex flex-col items-center">
            {/* Progress bar: blue for answered, yellow for skipped */}
            <div className="flex w-full max-w-xs h-6 rounded overflow-hidden border border-gray-300">
                <div
                    className="bg-blue-500"
                    style={{ width: `${(answered / total) * 100}%` }}
                    title={`Answered: ${answered}`}
                />
                <div
                    className="bg-yellow-400"
                    style={{ width: `${(skipped / total) * 100}%` }}
                    title={`Skipped: ${skipped}`}
                />
            </div>
            {/* Show numbers below the bar */}
            <div className="flex justify-between w-full max-w-xs mt-2 text-xs">
                <span className="text-blue-600">Answered: {answered}</span>
                <span className="text-yellow-600">Skipped: {skipped}</span>
            </div>
        </div>
    );
}

const questions = [
    { question: "What level of education do you want to pursue abroad?", options: ["Bachelor's", "Master's", "PhD", "Diploma", "Still deciding"] },
    { question: "What's your preferred field of study?", options: ["Engineering/Tech", "Business/Management", "Health & Medicine", "Humanities/Arts", "Other"] },
    { question: "Do you have a preferred intake?", options: ["Fall", "Spring", "Not Decided Yet"] },
    { question: "What's your budget range (INR)?", options: ["<10 Lakhs", "10-20 Lakhs", "20+ Lakhs"] },
    { question: "What stage are you currently at in your academic journey?", options: ["12th grade", "Undergraduate", "Recently graduated", "Postgraduate", "Other"] },
    { question: "Which stream/field are you currently studying or graduated from?", options: ["Engineering/Tech", "Commerce/Management", "Science", "Arts/Humanities", "Other"] },
    { question: "What is currrent rate of academic performance so far?", options: ["Excellent (Above 80%)", "Good (65-80%)", "Average (50-65%)", "Below average"] },
    { question: "Are you currently enrolled in any test preparation course?", options: ["IELTS", "TOEFL", "GRE/GMAT", "Some or All of the Above", "Not enrolled yet", "Not needed"] },
    { question: "When are you planning to go abroad for study?", options: ["Within 6 months", "In a year", "1-2 years later", "No fixed timeline"] },
    { question: "What's your primary motivation to study abroad?", options: ["Better education quality", "Global exposure", "Job opportunities", "PR & settlement", "Peer/Family influence"] },
];

function StartQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [answers, setAnswers] = React.useState<Record<number, string>>({});
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [showSummary, setShowSummary] = React.useState(false);

    // Restore quiz state from localStorage on component mount
    React.useEffect(() => {
        const savedState = localStorage.getItem('quizState');
        if (savedState) {
            const { currentQuestionIndex, answers, showSummary } = JSON.parse(savedState);
            setCurrentQuestionIndex(currentQuestionIndex);
            setAnswers(answers);
            setShowSummary(showSummary);
        }
    }, []);

    // Save quiz state to localStorage whenever it changes
    React.useEffect(() => {
        const quizState = { currentQuestionIndex, answers, showSummary };
        localStorage.setItem('quizState', JSON.stringify(quizState));
    }, [currentQuestionIndex, answers, showSummary]);

    React.useEffect(() => {
        const fetchImage = async () => {
            const query = `university study Abroad`;
            const randomImage = await getRandomPexelsImage(query);
            setImageUrl(randomImage);
        };
        fetchImage();
    }, [currentQuestionIndex]);

    const handleAnswer = (answer: string) => {
        setAnswers({ ...answers, [currentQuestionIndex]: answer });
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowSummary(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setShowSummary(false);
        localStorage.removeItem('quizState'); // Clear quiz state from localStorage
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSkip = () => {
        setAnswers({ ...answers, [currentQuestionIndex]: '' });
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowSummary(true);
        }
    };

    const questionVariants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
    };

    if (showSummary) {
        return (
            <div className="flex flex-col h-full bg-gradient-to-l from-gray-200 via-blue-100 to-stone-100 items-center justify-center">
                <Navbar />
                <motion.div
                    className="mb-7 w-[90vw] flex items-center justify-center bg-white text-gray-900 bg-gradient-to-l from-gray-200 via-blue-100 to-stone-100"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={questionVariants}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-white bg-opacity-95 rounded-xl shadow-lg p-8 max-w-2xl w-full border-2 border-blue-400">
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2 text-center">Your Answer Overview</h3>
                            <SummaryChart questions={questions} answers={answers} />
                        </div>
                        <QuizSummary
                            questions={questions}
                            answers={answers}
                            country={"your chosen country"}
                            onClose={handleRestart}
                            onGoBack={() => setShowSummary(false)}
                        />
                        <div className="flex justify-center gap-4 mt-6">
                            <Button onClick={handleRestart} className="bg-blue-600 text-white px-4 py-2 rounded">
                                Restart Quiz
                            </Button>
                        </div>
                    </div>
                </motion.div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="h-screen align-center items-center w-screen flex items-center justify-center bg-white text-gray-900 bg-gradient-to-l from-gray-200 via-blue-100 to-stone-100">
            <motion.div
                className="h-max-[97vh] bg-white bg-opacity-90 rounded-xl shadow-lg p-8 max-w-2xl w-full text-center border border-gray-300"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={questionVariants}
                transition={{ duration: 0.5 }}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Random Pexels"
                        className="w-full h-[33vh] object-cover rounded mt-2 mb-2"
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div className="w-full h-34 flex items-center justify-center bg-gray-100 rounded mt-2 mb-2">
                        <span className="text-gray-400 text-xs">Loading image...</span>
                    </div>
                )}
                <ProgressBar currentStep={currentQuestionIndex + 1} totalSteps={questions.length} />
                <h2 className="text-xs font-semibold mt-1 text-center">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <p className="mt-2 text-sm font-bold p-2 rounded shadow text-center break-words">
                    {questions[currentQuestionIndex].question}
                </p>
                <div className="mt-2 space-y-1 flex flex-col">
                    {questions[currentQuestionIndex].options.map((option, index) => {
                        const isSelected = answers[currentQuestionIndex] === option;
                        return (
                            <Button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className={`w-full text-xs font-medium transition-all whitespace-normal break-words py-1 ${
                                    isSelected
                                        ? 'bg-blue-700 text-white border-2 border-blue-900'
                                        : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-100'
                                }`}
                                style={{ wordBreak: 'break-word' }}
                            >
                                {option}
                            </Button>
                        );
                    })}
                </div>
                <div className="flex flex-row gap-2 mt-2">
                    <Button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1 text-xs py-1"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={handleSkip}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1 text-xs py-1"
                    >
                        Skip
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

export default StartQuiz;
