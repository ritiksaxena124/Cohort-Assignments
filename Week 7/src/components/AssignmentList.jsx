import { useNavigate } from "react-router-dom";
const AssignmentList = () => {
    const navigate = useNavigate();

    function navigationHandler(link) {
        navigate(link);
    }
    return (
        <>
            <div className="container  md:w-2/3 lg:w-2/5 px-6 pt-10 mx-auto">
                <h1 className="text-center text-3xl font-semibold mb-8">Assignment List</h1>
                <div onClick={() => navigationHandler("/assignment-1")} className="bg-zinc-700 mt-4  rounded-md hover:bg-zinc-600 p-4 cursor-pointer flex items-center justify-between">
                    <button>Assignment - 1: Profile Card</button>
                    <Label title={"Done"} />
                </div>
                <div onClick={() => navigationHandler("/assignment-2")} className="bg-zinc-700 mt-4 rounded-md p-4 hover:bg-zinc-600 cursor-pointer flex items-center justify-between">
                    <button>Assignment - 2: Background Changer</button>
                    <Label title={"Done"} />
                </div>
            </div>
        </>
    )
}

export default AssignmentList;

function Label({ title }) {
    const bgColor = title == "Done" ? "bg-teal-700" : "bg-blue-700";
    return <span className={`${bgColor} px-3 py-2 rounded-full text-[12px]`}>{title}</span>

}