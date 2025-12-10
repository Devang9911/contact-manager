import { usePopup } from "../hooks/usePopup";
import { useState, useEffect } from "react";

const UpdatePop = () => {
    const { popup, hidePopup } = usePopup();
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    // When popup opens, fill existing data
    useEffect(() => {
        if (popup.visible && popup.type === "update") {
            setName(popup.data?.name || "");
            setNumber(popup.data?.number || "");
        }
    }, [popup]);

    if (!popup.visible || popup.type !== "update") return null;

    return (
        <>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes popupZoom {
                    0% { transform: scale(0.85); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .fade-in {
                    animation: fadeIn 0.25s ease-out;
                }
                .popup-zoom {
                    animation: popupZoom 0.25s ease-out;
                }
                `}
            </style>

            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-9999 fade-in">
                <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/30 w-[340px] text-center popup-zoom">

                    <h2 className="font-semibold text-2xl text-gray-800 mb-4">
                        Update Contact
                    </h2>

                    <div className="flex flex-col gap-4 mb-4">
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="number"
                            value={number}
                            placeholder="Enter number"
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                        onClick={() => {
                            if (!name || !number) return;

                            popup.onUpdate({
                                id: popup.data.id,
                                name,
                                number,
                            });

                            hidePopup();
                        }}
                    >
                        Update
                    </button>

                </div>
            </div>
        </>
    );
};

export default UpdatePop;
