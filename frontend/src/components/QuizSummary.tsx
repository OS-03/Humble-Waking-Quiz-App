import React, { useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { useFormik } from 'formik';

// --- Country Recommendation Logic ---
const countries = [
    {
        name: "USA",
        flag: "🇺🇸",
        parameters: { safety: 7, it: 10, budget: 2, pr: 6, research: 9, language: 5, culture: 7 },
        description: "USA is a top destination for IT, engineering, and business, with diverse opportunities and world-class universities.",
        resources: ["https://educationusa.state.gov/", "https://www.usa.gov/visas"]
    },
    {
        name: "Germany",
        flag: "🇩🇪",
        parameters: { safety: 8, it: 9, budget: 8, pr: 7, research: 8, language: 4, culture: 8 },
        description: "Germany offers affordable education, strong engineering/IT programs, and high safety.",
        resources: ["https://www.daad.de/en/", "https://www.study-in-germany.de/en/"]
    },
    {
        name: "Ireland",
        flag: "🇮🇪",
        parameters: { safety: 8, it: 8, budget: 5, pr: 8, research: 7, language: 8, culture: 7 },
        description: "Ireland is a tech hub with friendly visa policies and good post-study work options.",
        resources: ["https://www.educationinireland.com/", "https://www.citizensinformation.ie/en/"]
    },
    {
        name: "Sweden",
        flag: "🇸🇪",
        parameters: { safety: 9, it: 7, budget: 4, pr: 7, research: 8, language: 7, culture: 8 },
        description: "Sweden is known for innovation, safety, and high quality of life.",
        resources: ["https://studyinsweden.se/", "https://sweden.se/work-business"]
    },
    {
        name: "Canada",
        flag: "🇨🇦",
        parameters: { safety: 9, it: 8, budget: 6, pr: 10, research: 8, language: 8, culture: 8 },
        description: "Canada is safe, multicultural, and offers excellent PR opportunities.",
        resources: ["https://www.educanada.ca/", "https://www.canada.ca/en/services/immigration-citizenship.html"]
    },
    {
        name: "Australia",
        flag: "🇦🇺",
        parameters: { safety: 8, it: 8, budget: 5, pr: 9, research: 7, language: 8, culture: 8 },
        description: "Australia is popular for its high quality of life, great PR options, and strong universities.",
        resources: ["https://www.studyinaustralia.gov.au/", "https://immi.homeaffairs.gov.au/"]
    },
    {
        name: "United Kingdom",
        flag: "🇬🇧",
        parameters: { safety: 8, it: 7, budget: 3, pr: 6, research: 9, language: 10, culture: 9 },
        description: "The UK offers world-renowned universities and a vibrant student life.",
        resources: ["https://study-uk.britishcouncil.org/", "https://www.gov.uk/student-visa"]
    },
    {
        name: "New Zealand",
        flag: "🇳🇿",
        parameters: { safety: 9, it: 7, budget: 5, pr: 8, research: 6, language: 8, culture: 7 },
        description: "New Zealand is known for its safety, friendly people, and good PR prospects.",
        resources: ["https://www.studywithnewzealand.govt.nz/", "https://www.immigration.govt.nz/"]
    },
    {
        name: "Netherlands",
        flag: "🇳🇱",
        parameters: { safety: 8, it: 8, budget: 4, pr: 6, research: 8, language: 7, culture: 8 },
        description: "The Netherlands offers innovative programs and a welcoming international environment.",
        resources: ["https://www.studyinholland.nl/", "https://ind.nl/en"]
    },
    {
        name: "France",
        flag: "🇫🇷",
        parameters: { safety: 7, it: 7, budget: 6, pr: 5, research: 8, language: 4, culture: 9 },
        description: "France is affordable for students and offers a rich cultural experience.",
        resources: ["https://www.campusfrance.org/en", "https://www.service-public.fr/particuliers/vosdroits/N19806"]
    },
    {
        name: "Singapore",
        flag: "🇸🇬",
        parameters: { safety: 10, it: 9, budget: 3, pr: 4, research: 7, language: 8, culture: 7 },
        description: "Singapore is a global education hub with top universities and excellent safety.",
        resources: ["https://www.studyinsingapore.org/", "https://www.mom.gov.sg/passes-and-permits/student-pass"]
    },
    {
        name: "Finland",
        flag: "🇫🇮",
        parameters: { safety: 10, it: 7, budget: 6, pr: 6, research: 7, language: 7, culture: 8 },
        description: "Finland is known for its innovative education system and high safety.",
        resources: ["https://www.studyinfinland.fi/", "https://migri.fi/en/studying-in-finland"]
    },
    {
        name: "Norway",
        flag: "🇳🇴",
        parameters: { safety: 10, it: 6, budget: 7, pr: 5, research: 7, language: 6, culture: 7 },
        description: "Norway offers free education for many programs and a high quality of life.",
        resources: ["https://www.studyinnorway.no/", "https://www.udi.no/en/want-to-apply/studies/"]
    },
    {
        name: "Denmark",
        flag: "🇩🇰",
        parameters: { safety: 9, it: 7, budget: 5, pr: 6, research: 7, language: 7, culture: 8 },
        description: "Denmark is innovative, safe, and offers a great student experience.",
        resources: ["https://studyindenmark.dk/", "https://www.nyidanmark.dk/en-GB"]
    },
    {
        name: "Switzerland",
        flag: "🇨🇭",
        parameters: { safety: 10, it: 6, budget: 2, pr: 4, research: 10, language: 5, culture: 8 },
        description: "Switzerland is famous for its research and high living standards.",
        resources: ["https://www.swissuniversities.ch/en/", "https://www.sem.admin.ch/sem/en/home.html"]
    },
    {
        name: "Italy",
        flag: "🇮🇹",
        parameters: { safety: 7, it: 6, budget: 7, pr: 5, research: 7, language: 5, culture: 9 },
        description: "Italy offers affordable tuition and a rich cultural heritage.",
        resources: ["https://studyinitaly.esteri.it/en/home_borse", "https://vistoperitalia.esteri.it/home/en"]
    },
    {
        name: "Spain",
        flag: "🇪🇸",
        parameters: { safety: 7, it: 6, budget: 7, pr: 5, research: 7, language: 5, culture: 9 },
        description: "Spain is affordable, lively, and offers many English-taught programs.",
        resources: ["https://www.studyinspain.info/", "https://www.interior.gob.es/opencms/en/servicios-al-ciudadano/tramites-y-gestiones/extranjeria/"]
    },
    {
        name: "Japan",
        flag: "🇯🇵",
        parameters: { safety: 10, it: 8, budget: 4, pr: 4, research: 8, language: 3, culture: 8 },
        description: "Japan is safe, technologically advanced, and offers unique cultural experiences.",
        resources: ["https://www.studyinjapan.go.jp/en/", "https://www.moj.go.jp/isa/applications/procedures/16-3.html"]
    },
    {
        name: "South Korea",
        flag: "🇰🇷",
        parameters: { safety: 9, it: 8, budget: 5, pr: 4, research: 7, language: 4, culture: 8 },
        description: "South Korea is a tech leader with affordable tuition and vibrant student life.",
        resources: ["https://www.studyinkorea.go.kr/", "https://www.hikorea.go.kr/"]
    },
    {
        name: "UAE",
        flag: "🇦🇪",
        parameters: { safety: 8, it: 7, budget: 4, pr: 5, research: 6, language: 7, culture: 7 },
        description: "UAE offers modern campuses, tax-free jobs, and a multicultural environment.",
        resources: ["https://www.studyinuae.com/", "https://u.ae/en/information-and-services/education/higher-education"]
    },
    {
        name: "Malaysia",
        flag: "🇲🇾",
        parameters: { safety: 8, it: 7, budget: 8, pr: 5, research: 6, language: 7, culture: 7 },
        description: "Malaysia is affordable, safe, and a growing education hub in Asia.",
        resources: ["https://www.studymalaysia.com/", "https://educationmalaysia.gov.my/"]
    },
];

type ProfileKey = 'safety' | 'it' | 'budget' | 'pr' | 'research' | 'language' | 'culture';
type UserProfile = Record<ProfileKey, number>;

type Question = {
    question: string;
};

type FormValues = {
    name: string;
    email: string;
    whatsapp: string;
};

// Map quiz answers to user profile parameters
function buildUserProfile(questions: any[], answers: Record<number, string | null>): UserProfile {
    let profile: UserProfile = { safety: 5, it: 5, budget: 5, pr: 5, research: 5, language: 5, culture: 5 };
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i].question.toLowerCase();
        const a = (answers[i] || '').toLowerCase();
        if (q.includes("field") && a.includes("tech")) profile.it += 2;
        if (q.includes("field") && a.includes("research")) profile.research += 2;
        if (q.includes("field") && a.includes("business")) profile.culture += 1;
        if (q.includes("budget")) {
            if (a.includes("10+")) profile.budget += 2;
            else if (a.includes("<10")) profile.budget += 3;
            else if (a.includes("20+")) profile.budget += 1;
        }
        if (q.includes("motivation") && a.includes("pr")) profile.pr += 3;
        if (q.includes("motivation") && a.includes("job")) profile.it += 1;
        if (q.includes("performance") && a.includes("excellent")) profile.safety += 1;
        if (q.includes("preparation") && a.includes("ielts")) profile.language += 2;
        if (q.includes("preparation") && a.includes("english")) profile.language += 2;
        if (q.includes("preparation") && a.includes("french")) profile.language += 1;
        if (q.includes("culture") && a.includes("diverse")) profile.culture += 2;
        if (q.includes("culture") && a.includes("western")) profile.culture += 1;
        if (q.includes("research") && a.includes("yes")) profile.research += 2;
        // ...add more mappings as needed
    }
    // Clamp values between 1 and 10
    Object.keys(profile).forEach((key) => {
        // @ts-ignore
        profile[key] = Math.max(1, Math.min(10, profile[key]));
    });
    return profile;
}

// Find closest country using sum of weighted absolute differences
function recommendCountry(userProfile: UserProfile) {
    // You can adjust weights for each parameter if needed
    const weights: Record<ProfileKey, number> = {
        safety: 1,
        it: 1,
        budget: 1,
        pr: 1,
        research: 1,
        language: 1,
        culture: 1,
    };
    let best = countries[0];
    let bestScore = Number.MAX_SAFE_INTEGER;
    for (const country of countries) {
        let score = 0;
        (Object.keys(userProfile) as ProfileKey[]).forEach((key) => {
            score += weights[key] * Math.abs(userProfile[key] - (country.parameters[key] ?? 5));
        });
        if (score < bestScore) {
            best = country;
            bestScore = score;
        }
    }
    return best;
}

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
    onClose: () => void;
    onGoBack: () => void;
}> = ({ questions, answers, onGoBack }) => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [bookingDate, setBookingDate] = React.useState<string>('');
    const [bookingTime, setBookingTime] = React.useState<string>('');
    const dateInputRef = useRef<HTMLInputElement>(null);
    const timeInputRef = useRef<HTMLInputElement>(null);

    // Hide weekends in the native date picker (visually) by disabling them after selection
    useEffect(() => {
        if (!bookingDate) return;
        const day = new Date(bookingDate).getDay();
        if (day === 0 || day === 6) {
            setBookingDate('');
            if (dateInputRef.current) {
                dateInputRef.current.value = '';
            }
            alert('Weekends are not available for booking. Please select a weekday.');
        }
    }, [bookingDate]);

    // Alert for invalid time selection (outside 09:00-17:00)
    useEffect(() => {
        if (!bookingTime) return;
        const [hour, minute] = bookingTime.split(':').map(Number);
        if (
            hour < 9 ||
            (hour === 17 && minute > 0) ||
            hour > 17
        ) {
            setBookingTime('');
            if (timeInputRef.current) {
                timeInputRef.current.value = '';
            }
            alert('Please select a time between 09:00 and 17:00.');
        }
    }, [bookingTime]);

    // --- Recommendation logic ---
    const userProfile = buildUserProfile(questions, answers);
    const recommended = recommendCountry(userProfile);

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

    // Add booking info to WhatsApp/email message if provided
    const getBookingInfo = () => {
        if (bookingDate && bookingTime) {
            return `%0ABooking Date: ${bookingDate}%0ABooking Time: ${bookingTime}`;
        }
        return '';
    };

    // Builds a WhatsApp message summarizing the quiz
    const getWhatsAppMessage = () => {
        let msg = `Study Abroad Application:%0A`;
        questions.forEach((q, i) => {
            msg += `Q${i + 1}: ${q.question}%0A`;
            msg += `A: ${answers[i] ? answers[i] : 'Skipped'}%0A%0A`;
        });
        msg += `Name: ${formik.values.name}%0AEmail: ${formik.values.email}%0AWhatsApp: ${formik.values.whatsapp}`;
        msg += getBookingInfo();
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
        // Instead of onClose(), redirect to home after WhatsApp submission
        window.location.href = '/';
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
        window.location.href = '/';
    };

    const handleCallSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const tel = `tel:${firmPhone}`;
        window.open(tel, '_self');
        window.location.href = '/';
    };

    return (
        <div className="h-[75vh] overflow-y-auto bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                {`We recommend: ${recommended.name}`}
                <span className="text-2xl">{recommended.flag}</span>
            </h2>
            <p className="mb-2 text-sm text-gray-700">{recommended.description}</p>
            <div className="mb-3">
                <strong>Why this country?</strong>
                <ul className="list-disc ml-5 text-blue-900 text-sm">
                    <li>Safety: {recommended.parameters.safety} (Your profile: {userProfile.safety})</li>
                    <li>IT/Tech Opportunities: {recommended.parameters.it} (Your profile: {userProfile.it})</li>
                    <li>Budget-friendliness: {recommended.parameters.budget} (Your profile: {userProfile.budget})</li>
                    <li>PR/Settlement: {recommended.parameters.pr} (Your profile: {userProfile.pr})</li>
                    <li>Research: {recommended.parameters.research} (Your profile: {userProfile.research})</li>
                    <li>Language: {recommended.parameters.language} (Your profile: {userProfile.language})</li>
                    <li>Culture: {recommended.parameters.culture} (Your profile: {userProfile.culture})</li>
                </ul>
            </div>
            {recommended.resources && (
                <div className="mb-3">
                    <strong>Next Steps / Resources:</strong>
                    <ul className="list-disc ml-5 text-blue-700 text-sm">
                        {recommended.resources.map((url, idx) => (
                            <li key={idx}>
                                <a href={url} target="_blank" rel="noopener noreferrer" className="underline">{url}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
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
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-blue-900 mb-1" htmlFor="booking-date">
                            Schedule Booking Date
                        </label>
                        <input
                            id="booking-date"
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={bookingDate}
                            ref={dateInputRef}
                            onChange={e => setBookingDate(e.target.value)}
                            className="w-full p-2 border rounded text-blue-900"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-blue-900 mb-1" htmlFor="booking-time">
                            Time (9:00 to 17:00)
                        </label>
                        <input
                            id="booking-time"
                            type="time"
                            min="09:00"
                            max="17:00"
                            value={bookingTime}
                            ref={timeInputRef}
                            onChange={e => setBookingTime(e.target.value)}
                            className="w-full p-2 border rounded text-blue-900"
                        />
                    </div>
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