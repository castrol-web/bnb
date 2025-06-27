import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../components/Header";
import GoogleMapEmbeded from "../components/GoogleMapEmbeded";


const Contact = () => {
    return (
        <>
            <Header pageName={"CONTACT"} />
            <section className="relative py-20 px-4 md:px-10 bg-gradient-to-br overflow-hidden">
                {/* Animated SVG Background */}
                <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
                    <svg
                        viewBox="0 0 1440 320"
                        className="w-full h-full animate-pulse"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#E0F2FE"
                            fillOpacity="1"
                            d="M0,64L60,96C120,128,240,192,360,186.7C480,181,600,107,720,106.7C840,107,960,181,1080,202.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        ></path>
                    </svg>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info Cards */}
                    <div className="grid gap-8">
                        {[
                            {
                                Icon: FaPhoneAlt,
                                title: "Phone",
                                detail: "+254113368527",
                            },
                            {
                                Icon: FaEnvelope,
                                title: "Email",
                                detail: "info@bnb.com",
                            },
                            {
                                Icon: FaMapMarkerAlt,
                                title: "Location",
                                detail: "Moshi Urban",
                            },
                        ].map(({ Icon, title, detail }, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="rounded-2xl shadow-md p-6 flex items-center gap-4"
                            >
                                <div className="text-blue-600 text-3xl animate-pulse">
                                    <Icon />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold">{title}</h4>
                                    <p className="text-gray-600">{detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Message sent!");
                        }}
                        className="rounded-2xl shadow-xl p-8 space-y-6 border-2"
                    >
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                required
                                className="input input-bordered w-full mt-1 text-black"
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                required
                                className="input input-bordered w-full mt-1 text-black"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Message</label>
                            <textarea
                                rows={4}
                                required
                                className="textarea textarea-bordered w-full mt-1 text-black"
                                placeholder="Write your message here..."
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="btn btn-primary w-full text-black"
                        >
                            Send Message
                        </motion.button>
                    </motion.form>
                </div>
                <GoogleMapEmbeded />
            </section>
        </>
    );
};

export default Contact;
