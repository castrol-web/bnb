import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import room from "../assets/room.jpeg"; // Replace with your actual image path

const amenities = [
    ["Room 72m²", "Double Beds", "Free Beach", "Fridge/Bar", "Microwave", "Smart TV", "Sauna", "Room Service"],
    ["AC", "Booking", "Concrete Flooring", "Storage", "Outdoor Kitchen", "Towels", "Tennis Courts", "Trees & Landscaping"],
    ["Balcony", "Cable TV", "Family Room", "Shower", "Breakfast", "Ironing", "Soundproof", "Dryer"],
];

const reviews = [
    {
        name: "Daniel Vannuth",
        date: "Jan 5th, 2025",
        rating: 5,
        text: "Comment example here. Nulla facilisi, vehicula sit amet libero, sed porttitor velit.",
    },
    {
        name: "Jennifer Lopez",
        date: "Jan 6th, 2025",
        rating: 4,
        text: "Comment example here. Nulla facilisi, vehicula sit amet libero, sed porttitor velit.",
    },
];

const RoomDetails = () => {
    return (
        <div className="px-4 md:px-20 py-10 space-y-16 bg-base-100 text-base-content mt-28">
            {/* Carousel + Pricing */}
            <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* DaisyUI Carousel */}
                <div className="carousel w-full shadow-lg">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img src={room} className="w-full object-cover max-h-[500px]" alt="Room 1" />
                        <a href="#slide3" className="btn btn-circle btn-sm absolute left-4 top-1/2 transform -translate-y-1/2">❮</a>
                        <a href="#slide2" className="btn btn-circle btn-sm absolute right-4 top-1/2 transform -translate-y-1/2">❯</a>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img src="https://source.unsplash.com/800x500/?hotel,room" className="w-full object-cover max-h-[500px]" alt="Room 2" />
                        <a href="#slide1" className="btn btn-circle btn-sm absolute left-4 top-1/2 transform -translate-y-1/2">❮</a>
                        <a href="#slide3" className="btn btn-circle btn-sm absolute right-4 top-1/2 transform -translate-y-1/2">❯</a>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img src="https://source.unsplash.com/800x500/?bedroom,luxury" className="w-full object-cover max-h-[500px]" alt="Room 3" />
                        <a href="#slide2" className="btn btn-circle btn-sm absolute left-4 top-1/2 transform -translate-y-1/2">❮</a>
                        <a href="#slide1" className="btn btn-circle btn-sm absolute right-4 top-1/2 transform -translate-y-1/2">❯</a>
                    </div>
                </div>

                {/* Pricing */}
                <div className="text-center mt-4">
                    <p className="text-sm uppercase tracking-widest text-gray-400">Start from</p>
                    <p className="text-2xl font-bold text-red-600 inline-block">$39</p>
                    <span className="text-gray-500"> / night</span>
                    <p className="text-gray-500">Passenger: <span className="font-semibold">02</span></p>
                </div>
            </motion.div>


            {/* Description */}
            <section className="text-center space-y-4 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold">Description</h2>
                <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Maecenas finibus, sem et fringilla
                    sodales, sem mauris dignissim lacus, non pretium leo metus ac justo. In sed tellus at nunc gravida tincidunt.
                    <br />
                    <br />
                    Mauris nec tellus vel nisl placerat hendrerit sed id purus. Nam imperdiet velit nec sem volutpat cursus.
                </p>
            </section>

            {/* Amenities */}
            <section className="text-center">
                <h2 className="text-3xl font-bold mb-6">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
                    {amenities.map((column, colIndex) => (
                        <ul key={colIndex} className="space-y-2">
                            {column.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                    <FaCheckCircle className="text-green-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </section>

            {/* Reviews */}
            <section className="text-center max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Reviews</h2>
                <div className="space-y-6">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-base-200 rounded-lg p-4 flex gap-4 items-start">
                            <div className="avatar">
                                <div className="w-12 h-12 rounded-full">
                                    <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt={review.name} />
                                </div>
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold">{review.name} <span className="text-sm text-gray-400 ml-2">{review.date}</span></h4>
                                <div className="flex items-center text-yellow-500 mb-1">
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <AiFillStar key={i} />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600">{review.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Book Now Button */}
            <div className="text-center">
                <button type="button" className="btn btn-success px-8 rounded-full text-white font-bold">
                    BOOK NOW
                </button>
            </div>
        </div>
    );
};

export default RoomDetails;
