import { useState } from "react";
import { FaComments } from "react-icons/fa";

const ChatWidget = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <button
                type="button"
                title="chat agent"
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition z-50"
            >
                <FaComments size={24} />
            </button>

            {/* Chat Panel */}
            {open && (
                <div className="fixed bottom-20 left-6 w-80 bg-white border rounded-xl shadow-xl p-4 z-50">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-blue-600">Chat with us</h4>
                        <button onClick={() => setOpen(false)} className="text-sm text-gray-500">
                            ✕
                        </button>
                    </div>
                    <div className="h-64 overflow-y-auto text-sm text-gray-700">
                        <p>Hello! How can we help you today?</p>
                        {/* You can add actual chat messages here */}
                    </div>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="input input-bordered w-full mt-2"
                    />
                </div>
            )}
        </>
    );
};

export default ChatWidget;
