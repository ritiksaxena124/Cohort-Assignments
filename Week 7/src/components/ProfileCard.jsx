import { useNavigate } from "react-router-dom";
const ProfileCard = () => {
    const navigate = useNavigate();

    function navigateHandler(link) {
        navigate(link);
    }
    return (
        <>
            <button onClick={() => navigateHandler("/")} className="py-2 px-4 bg-zinc-800 rounded-md absolute mt-4 ml-4">
                &larr; Back
            </button>
            <div className="w-full h-screen flex gap-8 items-center justify-center">
                {/* card container */}
                <div className="flex flex-col items-center justify-center gap-6 bg-zinc-800 rounded-md shadow-md">
                    <div className="text-center pt-6 px-2 flex flex-col justify-center items-center">
                        <div className="rounded-full overflow-hidden w-32 mb-4">
                            <img className="w-full h-full object-contain" src="https://i.pinimg.com/280x280_RS/42/b7/d1/42b7d16b862537d85b65e32fb25befa4.jpg" />
                        </div>
                        <div className="flex gap-2 items-end">
                            <h2 className="text-2xl font-semibold">Rita Correia</h2>
                            <span className="text-[18px] text-zinc-400">32</span>
                        </div>
                        <span className="text-zinc-400">London</span>
                    </div>
                    {/* Stats container */}
                    <div className="flex gap-4 text-center border-t-[1px] border-zinc-600 px-4 border-dashed">
                        {/* stats */}
                        <StatsCard count={86} title={"Photos"} />
                        <StatsCard count={110} title={"Photos"} />
                        <StatsCard count={90} title={"Photos"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard

function StatsCard({ count, title }) {
    return (
        <div className="p-4">
            <h3 className="text-[18px] font-semibold">{count}k</h3>
            <span className="text-zinc-400">{title}</span>
        </div>
    )
}