import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = import.meta.env.VITE_SERVER_URL;

interface Room {
    _id?: string;
    title: string;
    roomNumber: string;
    description: string;
    price: number;
    maxPeople: number;
    numberOfBeds: number;
    roomType: string;
    status: string;
    amenities: string[];
    frontViewPicture: string;
    pictures: string[];
}

const defaultValues = {
    title: '',
    roomNumber: '',
    description: '',
    price: 0,
    maxPeople: 1,
    numberOfBeds: 1,
    roomType: 'Classic',
    status: 'available',
    amenities: [],
    frontViewPicture: '',
    pictures: [],
};

const RoomManager: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loadingRooms, setRoomsLoading] = useState(false);
    const [frontImage, setFrontImage] = useState<File | null>(null);
    const [roomImages, setRoomImages] = useState<File[]>([]);
    const [existingPictures, setExistingPictures] = useState<string[]>([]);
    const [existingFrontImage, setExistingFrontImage] = useState<string | null>(null);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [controller, setController] = useState<AbortController | null>(null);

    const { register, handleSubmit, reset } = useForm<Room>({ defaultValues });

    const fetchRooms = async () => {
        setRoomsLoading(true);
        try {
            const response = await axios.get(`${url}/api/user/rooms`);
            if (response.status === 200) {
                setRooms(response.data);
            }
        } catch (error: any) {
            const msg = error?.response?.data?.message;
            if (error.response?.status === 404 && msg) {
                toast.error(msg);
            } else {
                toast.error("An error occurred during fetching rooms.");
            }
        } finally {
            setRoomsLoading(false);
        }
    };
    const extractKeyFromUrl = (url: string): string => {
        try {
            const parts = url.split('/');
            const keyWithParams = parts[parts.length - 1];
            return keyWithParams.split('?')[0]; // Remove any query string
        } catch {
            return url; // fallback if malformed
        }
    };

    const onSubmit = async (data: any) => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);

        try {
            if (!frontImage && !existingFrontImage) {
                toast.error("Front view image is required.");
                setLoading(false);
                return;
            }

            if (roomImages.length === 0 && existingPictures.length === 0) {
                toast.error("At least one slideshow image is required.");
                setLoading(false);
                return;
            }

            //Convert signed URLs to S3 keys before sending
            const pictureKeys = existingPictures.map(extractKeyFromUrl);
            const frontImageKey = existingFrontImage ? extractKeyFromUrl(existingFrontImage) : null;

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('roomNumber', data.roomNumber);
            formData.append('description', data.description);
            formData.append('price', data.price.toString());
            formData.append('maxPeople', data.maxPeople.toString());
            formData.append('numberOfBeds', data.numberOfBeds.toString());
            formData.append('roomType', data.roomType);
            formData.append('status', data.status);
            formData.append('amenities', JSON.stringify(selectedAmenities));
            formData.append('imagesToKeep', JSON.stringify(pictureKeys));
            if (frontImageKey && !frontImage) {
                formData.append('keepFrontView', 'true');
            }

            if (frontImage) formData.append('frontViewPicture', frontImage);
            roomImages.forEach((file) => formData.append('pictures', file));

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
                signal: abortController.signal,
            };

            if (editingRoom?._id) {
                const response = await axios.put(`${url}/api/admin/room/${editingRoom._id}`, formData, config);
                if (response.status === 200) toast.success('Room updated successfully');
            } else {
                const response = await axios.post(`${url}/api/admin/create-room`, formData, config);
                if (response.status === 201) toast.success('Room created successfully');
            }

            fetchRooms();
            reset(defaultValues);
            setFrontImage(null);
            setRoomImages([]);
            setExistingPictures([]);
            setExistingFrontImage(null);
            setSelectedAmenities([]);
            setEditingRoom(null);
            setShowModal(false);

        } catch (error: any) {
            if (axios.isCancel(error)) {
                toast.info('Room creation was cancelled.');
            } else {
                toast.error(error?.response?.data?.message || 'Operation failed');
            }
        } finally {
            setLoading(false);
            setController(null);
        }
    };



    const handleEdit = (room: Room) => {
        setEditingRoom(room);
        reset(room);
        setExistingFrontImage(room.frontViewPicture); // key, not URL
        setExistingPictures(room.pictures);           // keys, not URLs
        setSelectedAmenities(room.amenities);
        setShowModal(true);
    };


    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`${url}/api/admin/room/${id}`);
            if (response.status === 200) {
                fetchRooms();
                
                toast.success('Room deleted successfully');
            }
        } catch (error) {
            toast.error('Failed to delete room');
        }
    };

    const handleCancel = () => {
        if (loading && controller) {
            controller.abort();
            return;
        }

        reset(defaultValues);
        setFrontImage(null);
        setRoomImages([]);
        setExistingPictures([]);
        setExistingFrontImage(null);
        setSelectedAmenities([]);
        setEditingRoom(null);
        setShowModal(false);
    };

    const handleRemoveExistingImage = (imgUrl: string) => {
        setExistingPictures((prev) => prev.filter((img) => img !== imgUrl));
    };

    const handleRemoveFrontImage = () => {
        setExistingFrontImage(null);
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="p-4 sm:p-6 text-white mt-32">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Room Management</h1>
            <button className="btn btn-primary flex items-center gap-2 mb-4" onClick={() => {
                setEditingRoom(null);
                reset(defaultValues);
                setShowModal(true);
            }}>
                <AiOutlinePlus /> Add Room
            </button>

            {loadingRooms ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : rooms.length === 0 ? (
                <div className="text-center text-gray-400 py-10 text-lg">No rooms available.</div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-base-300 shadow-sm bg-white text-black">
                    <table className="table w-full text-sm sm:text-base">
                        <thead className="bg-base-200">
                            <tr>
                                <th className="text-left px-4 py-2">Title</th>
                                <th className="text-left px-4 py-2">Room #</th>
                                <th className="text-left px-4 py-2">Price</th>
                                <th className="text-left px-4 py-2">Max People</th>
                                <th className="text-left px-4 py-2">Status</th>
                                <th className="text-center px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={room._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2">{room.title}</td>
                                    <td className="px-4 py-2">{room.roomNumber}</td>
                                    <td className="px-4 py-2">${room.price}</td>
                                    <td className="px-4 py-2">{room.maxPeople}</td>
                                    <td className="px-4 py-2">
                                        <span className={`${room.status === 'available' ? 'text-green-600' : room.status === 'booked' ? 'text-orange-400' : 'text-red-600'}`}>{room.status}</span>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button className="btn btn-sm btn-outline" onClick={() => handleEdit(room)}><AiOutlineEdit /></button>
                                            <button disabled={loading} className="btn btn-sm btn-error text-white" onClick={() => handleDelete(room._id!)}>{!loading ? <AiOutlineDelete /> : "deleting.."}</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <AnimatePresence>
                    <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto p-6 shadow-xl" initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}>
                            <h2 className="text-xl font-semibold mb-4 text-center text-black">{editingRoom ? 'Edit Room' : 'Add Room'}</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
                                {/* Image previews */}
                                {existingFrontImage && (
                                    <div className="mb-2">
                                        <p className="font-medium">Existing Front View:</p>
                                        <div className="flex gap-2 items-center">
                                            <img src={existingFrontImage} alt="Front" className="w-24 h-16 object-cover rounded" />
                                            <button type="button" className="btn btn-xs btn-error" onClick={handleRemoveFrontImage}>Remove</button>
                                        </div>
                                    </div>
                                )}
                                {existingPictures.length > 0 && (
                                    <div className="mb-2">
                                        <p className="font-medium">Existing Slide Show Images:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {existingPictures.map((img, idx) => (
                                                <div key={idx} className="relative">
                                                    <img src={img} alt="room" className="w-24 h-16 object-cover rounded" />
                                                    <button type="button" className="btn btn-xs btn-error absolute top-0 right-0" onClick={() => handleRemoveExistingImage(img)}>x</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <fieldset disabled={loading} className="space-y-4">
                                    <div>
                                        <label className="label">Title</label>
                                        <input className="input input-bordered w-full" {...register('title')} />
                                    </div>
                                    <div>
                                        <label className="label">Room Number</label>
                                        <input className="input input-bordered w-full" {...register('roomNumber')} />
                                    </div>
                                    <div>
                                        <label className="label">Description</label>
                                        <textarea className="textarea textarea-bordered w-full" {...register('description')} />
                                    </div>
                                    <div>
                                        <label className="label">Price</label>
                                        <input type="number" className="input input-bordered w-full" {...register('price')} />
                                    </div>
                                    <div>
                                        <label className="label">Max People</label>
                                        <input type="number" className="input input-bordered w-full" {...register('maxPeople')} />
                                    </div>
                                    {/* Front View Image */}
                                    <div>
                                        <label className="label">Front View Picture</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="file-input file-input-bordered w-full"
                                            onChange={(e) => setFrontImage(e.target.files?.[0] || null)}
                                        />
                                    </div>

                                    {/* Multiple Pictures */}
                                    <div>
                                        <label className="label">Room Pictures (Slide Show)</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="file-input file-input-bordered w-full"
                                            onChange={(e) => setRoomImages(Array.from(e.target.files || []))}
                                        />
                                    </div>

                                    {/* Amenities Checkboxes */}
                                    <div>
                                        <label className="label">Amenities</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['TV', 'AC', 'Bathtub', 'Shower', 'WiFi'].map((item) => (
                                                <label key={item} className="flex gap-2 items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                        checked={selectedAmenities.includes(item)}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            setSelectedAmenities((prev) =>
                                                                checked ? [...prev, item] : prev.filter((a) => a !== item)
                                                            );
                                                        }}
                                                    />
                                                    {item}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">Number of Beds</label>
                                        <input type="number" className="input input-bordered w-full" {...register('numberOfBeds')} />
                                    </div>
                                    <div>
                                        <label className="label">Room Type</label>
                                        <select className="select select-bordered w-full" {...register('roomType')}>
                                            <option value="Classic">Classic</option>
                                            <option value="Deluxe">Deluxe</option>
                                            <option value="Suite">Suite</option>
                                            <option value="Single">Single</option>
                                            <option value="Double">Double</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">Status</label>
                                        <select className="select select-bordered w-full" {...register('status')}>
                                            <option value="available">Available</option>
                                            <option value="booked">Booked</option>
                                            <option value="maintenance">Maintenance</option>
                                        </select>
                                    </div>
                                </fieldset>

                                <div className="flex gap-4 justify-end mt-4">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : editingRoom ? 'Update' : 'Create'}
                                    </button>

                                    <button
                                        type="button"
                                        disabled={loading}
                                        className="btn btn-outline"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}
            <ToastContainer />
        </div>
    );
};

export default RoomManager;
