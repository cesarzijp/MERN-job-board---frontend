import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";

function DeleteJobButton({ id, title }) {
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Slide,
  };

  const deleteJobHandler = async () => {
    const job = await fetch(`http://localhost:4000/api/jobs/${id}`, {
      method: "DELETE",
    });
    console.log(job);
    if (job.ok) {
      navigate("/");
      toast(`Job "${title}" deleted`, toastOptions);
    }
  };

  return (
    <button
      onClick={deleteJobHandler}
      className='px-3 py-1.5 border-[1px] border-gray-800 rounded-md transition-all duration-300 hover:bg-gray-900  hover:border-gray-800'
    >
      Delete this job
    </button>
  );
}

export default DeleteJobButton;
