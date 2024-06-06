import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Assignment2 = () => {
    const [color, setColor] = useState("zinc");

    function handleDivColor(bgColor) {
        setColor(bgColor)
    }

    const navigate = useNavigate();

    function navigateHandler(link) {
        navigate(link);
    }

    return (
        <>
            <div className="w-full p-10 h-full">
                <button onClick={() => navigateHandler("/")} className="py-2 px-4 bg-zinc-800 rounded-md absolute mt-4 ml-4">
                    &larr; Back
                </button>
                <h1 className="text-center text-3xl mb-8">Assignment 2: Background Changer</h1>
                <div className="w-fit p-4 mx-auto">
                    <div className={`w-full h-40 bg-${color}-700 rounded-md1`}>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button className="px-4 py-2 rounded-sm bg-red-700 hover:bg-red-800" onClick={() => handleDivColor("red")}>Red</button>
                        <button className="px-4 py-2 rounded-sm bg-blue-700 hover:bg-blue-800" onClick={() => handleDivColor("blue")}>Blue</button>
                        <button className="px-4 py-2 rounded-sm bg-green-700 hover:bg-green-800" onClick={() => handleDivColor("green")}>Green</button>
                        <button className="px-4 py-2 rounded-sm bg-yellow-700 hover:bg-yellow-800" onClick={() => handleDivColor("yellow")}>Yellow</button>
                        <button className="px-4 py-2 rounded-sm bg-zinc-700 hover:bg-zinc-800" onClick={() => handleDivColor("zinc")}>Reset</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Assignment2;