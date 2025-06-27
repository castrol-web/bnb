import { motion } from "framer-motion";
import { RiStarSLine } from "react-icons/ri";
import { FaRegStarHalf } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import room from "../assets/room.jpeg";

const Rooms = () => {
  const index = 2
  return (
    <div className="mt-28">
      <Header pageName="Our Rooms" />
      <div className={`flex flex-col-reverse ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center justify-between gap-10 mt-10 px-4 lg:px-20`}>
        {/* Rotated Label */}
        <motion.div
          className="hidden lg:flex w-16 h-[150px] items-center justify-center border-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="transform -rotate-90 text-xs text-gray-600 tracking-wide">
            CLASSIC ROOM <span className="ml-4 font-semibold">01</span>
          </p>
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full lg:w-5/12"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center text-sm gap-2 mb-2">
            <RiStarSLine className="text-yellow-500" />
            <RiStarSLine className="text-yellow-500" />
            <RiStarSLine className="text-yellow-500" />
            <FaRegStarHalf className="text-yellow-500" />
            <p className="text-gray-600">3 reviews</p>
          </div>

          <h2 className="text-3xl font-bold mb-2">Simple with Classic Room</h2>

          <p className="text-gray-600 mb-2">
            Starting from <span className="text-red-600 text-2xl font-semibold">$39/</span>night
          </p>

          <p className="text-gray-500 text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt porta mauris, a semper eros ornare eget. Suspendisse in nulla ut urna hendrerit bibendum ut in magna.
          </p>

          <div className="text-sm text-gray-600 space-y-1 mb-4">
            <p>Status: <span className="text-green-600 font-medium">Available</span></p>
            <p>Deposit: <span className="text-gray-700">Not required</span></p>
            <p>Beds: <span className="text-gray-700">01</span></p>
          </div>

          <Link
            to="/room-details"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View Details <IoMdArrowDropright className="ml-1" />
          </Link>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full lg:w-5/12"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <figure className="rounded-xl shadow-lg overflow-hidden">
            <img
              src={room}
              alt="room picture"
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </figure>
        </motion.div>
      </div>
    </div>
  );
};

export default Rooms;
