import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar, FaRegStar } from 'react-icons/fa';
import engineer from "../../assets/engineer.avif"
import smile from "../../assets/smile.avif"
import woman from "../../assets/woman.jpg"


type Testimonial = {
    name: string;
    title: string;
    quote: string;
    image: string;
    rating: number; // from 1 to 5
};

export const TestimonialCarousel = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [current, setCurrent] = useState(0);

    const fetchTestimonials = async () => {
        // Replace this with your API call
        const data: Testimonial[] = [
            {
                name: "Jane Doe",
                title: "Construction Engineer",
                quote: "Best room service I enjoyed the hospitality during my stay!",
                image: engineer,
                rating: 5,
            },
            {
                name: "John Smith",
                title: "Tourist",
                quote: "I really enjoyed the daytrips,good restaurant Free and strong wifi. 10/10 service!",
                image: smile,
                rating: 4,
            },
            {
                name: "Amina Yusuf",
                title: "Student",
                quote: "Great Staff I met there,I would reccomend anyone worth the pay. So grateful!",
                image: woman,
                rating: 5,
            },
        ];
        setTestimonials(data);
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    useEffect(() => {
        const interval = setInterval(next, 8000);
        return () => clearInterval(interval);
    }, [testimonials]);

    if (!testimonials.length) return <div className="text-center py-10">Loading testimonials...</div>;

    return (
        <div className="relative w-full max-w-4xl mx-auto px-4 py-10">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">What Our Clients Say</h2>
                <p>Real stories from our happy customers</p>
            </div>

            <div className="relative overflow-hidden min-h-[260px] rounded-lg border">
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={current}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute w-full"
                    >
                        <div className="card shadow-xl p-6 flex flex-col md:flex-row items-center gap-6">
                            <img
                                src={testimonials[current].image}
                                alt={testimonials[current].name}
                                className="w-24 h-24 rounded-full object-cover ring-2 ring-[#F2910A]"
                            />
                            <div>
                                <FaQuoteLeft className="text-2xl mb-2" />
                                <p className="italic">"{testimonials[current].quote}"</p>
                                <div className="mt-2 flex text-yellow-400">
                                    {Array.from({ length: 5 }).map((_, i) =>
                                        i < testimonials[current].rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                                    )}
                                </div>
                                <h4 className="mt-4 font-bold">{testimonials[current].name}</h4>
                                <p className="text-sm">{testimonials[current].title}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <button
                    type='button'
                    title='prev'
                    onClick={prev}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3 rounded-full shadow"
                >
                    <FaChevronLeft />
                </button>
                <button
                    title='forward'
                    type='button'
                    onClick={next}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3 rounded-full shadow"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};
