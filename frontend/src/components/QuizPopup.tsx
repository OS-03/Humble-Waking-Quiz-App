import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ProgressBar } from './ui/progress-bar';
import { QuizSummary } from './QuizSummary';

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

interface Question {
    question: string;
    options: string[];
}

interface Props {
    questions: Question[];
    onClose: () => void;
}
const QuizPopup = ({ questions, onClose }: Props) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [answers, setAnswers] = React.useState<Record<number, string>>({});
    const [showLeadCapture, setShowLeadCapture] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [theme, setTheme] = React.useState<'dark' | 'light' | 'os'>('os'); // State to manage theme
    const [showSummary, setShowSummary] = React.useState(false);
    
    // Always clear quiz state on mount for a fresh start
    React.useEffect(() => {
        localStorage.removeItem('quizState');
        setCurrentQuestionIndex(0);
        setAnswers({});
        setShowSummary(false);
        setShowLeadCapture(false);
    }, []);
    
    // Save quiz state to localStorage whenever it changes (optional, or remove if not needed)
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

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowLeadCapture(true); // when the lead completes the quiz then only show exit the dialog content
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSkip = () => {
        setAnswers({ ...answers, [currentQuestionIndex]: '' });
        handleNext();
    };

    const handleAnswer = (answer: string) => {
        setAnswers({ ...answers, [currentQuestionIndex]: answer });
        handleNext();
    };

    const handleGoBack = () => {
        setShowLeadCapture(false); // Return to the quiz
    };

    const getThemeClass = () => {
        switch (theme) {
            case 'dark':
                return 'text-white'; // Text color for dark theme
            case 'light':
                return 'bg-white text-gray-800'; // Transparent background for light theme
            case 'os':
                return 'bg-white text-gray-900'; // Transparent background for OS theme
            default:
                return '';
        }
    };

    const getThemeStyle = () => {
        switch (theme) {
            case 'dark':
                return { backgroundColor: 'rgba(30, 58, 138, 0.5)' }; // Bluish translucent background for dark theme
            case 'light':
            case 'os':
                return { backgroundColor: 'rgba(255, 255, 255, 0.15)' }; // Transparent background for light and OS themes
            default:
                return {};
        }
    };

      const getbgStyle = () => {
          switch (theme) {
            case 'dark':
                return 'bg-blue-900'; // Text color for dark theme
            case 'light':
                return 'bg-white'; // Transparent background for light theme
            case 'os':
                return 'bg-white'; // Transparent background for OS theme
            default:
                return '';
        }
    };

    return (
        <Dialog open onOpenChange={showLeadCapture ? onClose : undefined}>
            <DialogContent
                className={`
                    flex flex-col w-full max-w-sm sm:max-w-sm md:max-w-md
                    shadow-lg rounded-lg border border-gray-200
                    p-2 sm:p-3 backdrop-blur-md mx-2 sm:mx-auto
                    h-auto max-h-[93vh] ${getThemeClass()}
                `}
                style={{ minHeight: 300, ...getThemeStyle() }} // Apply dynamic background styles
            >
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-start">
                        Your Study Abroad Preparation
                    </DialogTitle>
                    {showLeadCapture && (
                        <button
                          onClick={onClose}
                          className="absolute top-0 right-1 text-gray-800 hover:text-gray-700 focus:outline-none"
                          aria-label="Close"
                        >
                          ✕
                        </button>
                      )}
                    <div className="absolute top-5 right-3">
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value as 'dark' | 'light' | 'os')}
                            className="p-1 border rounded"
                        >
                            <option value="os">OS Default</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                </DialogHeader>
                {!showLeadCapture ? (
                    <div className="flex flex-col flex-1 w-full">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Random Pexels"
                                className="w-full h-34 object-cover rounded mt-2 mb-2"
                                style={{ objectFit: 'cover' }} // Ensure the image covers the container
                            />
                        ) : (
                            <div className="w-full h-34 flex items-center justify-center bg-gray-100 rounded mt-2 mb-2">
                                <span className="text-gray-400 text-xs">Loading image...</span>
                            </div>
                        )}
                          <ProgressBar
                            currentStep={currentQuestionIndex + 1}
                            totalSteps={questions.length}
                        />
                        <h2 className="text-xs font-semibold mt-1 text-center">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </h2>
                        <p className={`mt-2 text-sm font-bold  p-2 rounded shadow text-center break-words ${getbgStyle()}`}>
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
                    </div>
                ) : (
                    <QuizSummary
                        questions={questions}
                        answers={answers}
                        onClose={onClose}
                        onGoBack={handleGoBack}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};


export default QuizPopup;

