import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { useNavigate } from 'react-router-dom';


function Quiz() {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        localStorage.removeItem('quizState'); // Clear quiz state before starting
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top before navigating
        navigate('/startquiz');
    };

    return (
        <div className="h-full w-screen bg-gradient-to-l from-gray-200 via-blue-100 to-stone-100">
            <Navbar />
            <section className="flex flex-col items-center justify-center min-h-[80vh] px-4">
                <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 max-w-xl w-full text-center border border-gray-300 text-justify">
                    <h1 className="text-4xl font-bold mb-4 text-blue-900 cursor-pointer hover:text-sky-700">Welcome to the Quiz!</h1>
                    <h2 className='text-xl font-bold text-blue-700 cursor-pointer hover:underline'>Instructions:</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Test your knowledge by answering the questions below. Read each question carefully and select the best answer. Your results will be shown at the end.
                    </p>
                    <ul className="text-left text-gray-500 mb-7 list-disc list-inside">
                        <li>For Each Question You can choose only One Answer.</li>
                        <li>Click "Next" to move to the next question and "Previous" to move back to prior question.</li>
                        <li>Once you Submit the Question you cannot edit it again.</li>
                        <li>Your score will be displayed after you finish the quiz.</li>
                        <li>Good luck and hope you find you dream country for admit!</li>
                    </ul>
                    <div className="flex mt-6 justify-center">
                        <button
                            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-sky-700 hover:underline transition cursor-pointer"
                            onClick={handleStartQuiz}
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Quiz;