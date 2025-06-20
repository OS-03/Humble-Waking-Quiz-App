import React from 'react';
import { Button } from './ui/button';
import { useFormik } from 'formik';

type Question = {
    question: string;
    // Add other properties if needed
};

type FormValues = {
    name: string;
    email: string;
    whatsapp: string;
};

function validate(values: FormValues) {
    const errors: Partial<FormValues> = {};
    if (!values.name) {
        errors.name = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    // WhatsApp is optional, but you can add validation if needed
    return errors;
}

// for summary and WhatsApp submission
export const QuizSummary: React.FC<{
    questions: Question[];
    answers: Record<number, string | null>;
    country: string | null;
    onClose: () => void;
    onGoBack: () => void;
}> = ({ questions, answers, country, onClose, onGoBack }) => {
    const [showDropdown, setShowDropdown] = React.useState(false);

    const firmWhatsApp = '9321815216';
    const firmEmail = 'info@admitabroadfirm.com';
    const firmPhone = '+91-9321815216';

    const formik = useFormik<FormValues>({
        initialValues: { name: '', email: '', whatsapp: '' },
        validate,
        onSubmit: () => {},
        validateOnBlur: true,
        validateOnChange: true,
    });

    // Builds a WhatsApp message summarizing the quiz
    const getWhatsAppMessage = () => {
        let msg = `Study Abroad Application:%0A`;
        questions.forEach((q, i) => {
            msg += `Q${i + 1}: ${q.question}%0A`;
            msg += `A: ${answers[i] ? answers[i] : 'Skipped'}%0A%0A`;
        });
        msg += `Name: ${formik.values.name}%0AEmail: ${formik.values.email}%0AWhatsApp: ${formik.values.whatsapp}`;
        return msg;
    };

    const handleWhatsAppSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!formik.isValid || !formik.dirty) {
            formik.handleSubmit();
            return;
        }
        const url = `https://wa.me/${firmWhatsApp}?text=${getWhatsAppMessage()}`;
        window.open(url, '_blank');
        onClose();
    };

    const handleEmailSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!formik.isValid || !formik.dirty) {
            formik.handleSubmit();
            return;
        }
        const subject = 'Study Abroad Application';
        const body = getWhatsAppMessage().replace(/%0A/g, '\n');
        const mailto = `mailto:${firmEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailto, '_blank');
        onClose();
    };

    const handleCallSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const tel = `tel:${firmPhone}`;
        window.open(tel, '_self');
        onClose();
    };

    return (
        <div className="h-[75vh] overflow-y-auto bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
                {`You're a great match for studying in ${country} for Fall 2025!`}
            </h2>
            <p className="mb-4 text-sm text-gray-700">
                Here are your responses:
            </p>
            <div className="bg-white rounded shadow p-4 mb-4 max-h-[50%] overflow-y-auto">
                {questions.map((q, i) => (
                    <div key={i} className="mb-3">
                        <div className="font-semibold text-blue-800">{`Q${i + 1}: ${q.question}`}</div>
                        <div className="ml-2 text-blue-900">
                            {answers[i] ? (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{answers[i]}</span>
                            ) : (
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Skipped</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-sm text-zinc-700 mb-2">
                Want a free consultation based on your answers? Enter your details and choose a submission method!
            </p>
            <form className="mt-2 space-y-2" onSubmit={formik.handleSubmit} noValidate>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border rounded text-blue-900 placeholder:text-blue-900 placeholder:font-semibold"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-red-600 text-xs mt-1">{formik.errors.name}</div>
                    )}
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border rounded text-blue-900 placeholder:text-blue-900 placeholder:font-semibold"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-600 text-xs mt-1">{formik.errors.email}</div>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        name="whatsapp"
                        placeholder="WhatsApp Number (optional)"
                        value={formik.values.whatsapp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border rounded text-blue-900 placeholder:text-blue-900 placeholder:font-semibold"
                    />
                </div>
                <p className="text-sm text-blue-900">
                    Please note: Your responses will be shared with our team &amp; used for consultation purposes.
                </p>
                <div className="relative">
                    <Button
                        type="button"
                        className="w-full bg-blue-500 text-white hover:bg-blue-400"
                        onClick={() => setShowDropdown(!showDropdown)}
                        disabled={!formik.isValid || !formik.dirty}
                    >
                        Choose Submission Method
                    </Button>
                    {showDropdown && (
                        <div className="absolute w-full bg-white border rounded shadow mt-2 z-10">
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-300 text-blue-900 rounded"
                                onClick={handleWhatsAppSubmit}
                                disabled={!formik.isValid || !formik.dirty}
                            >
                                Submit via WhatsApp
                            </button>
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-300 text-blue-900 rounded"
                                onClick={handleEmailSubmit}
                                disabled={!formik.isValid || !formik.dirty}
                            >
                                Submit via Email
                            </button>
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-300 text-blue-900 rounded"
                                onClick={handleCallSubmit}
                            >
                                Submit via Call
                            </button>
                        </div>
                    )}
                </div>
            </form>
            <Button
                type="button"
                className="mt-4 w-full bg-gray-300 text-gray-700 hover:bg-gray-400"
                onClick={onGoBack}
            >
                Go Back to Edit
            </Button>
        </div>
    );
};