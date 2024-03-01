import { React, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorBar from "../components/EditorBar";

function AddJob() {
  const content =
    "<h1>Your job</h1><p>Please provide a description of your job</p>";
  const extensions = [StarterKit];
  const navigate = useNavigate();

  const fetchUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_LOCALURL
      : process.env.REACT_APP_LIVE_URL;

  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobHours, setJobHours] = useState("");
  const [jobDescription, setJobdescription] = useState(content);
  const [jobTitleForToast, setJobTitleForToast] = useState("");

  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      setJobdescription(editor.getHTML());
    },
  });

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

  // function to run after succesful submit
  const resetForm = () => {
    setJobTitleForToast(jobTitle);
    toast(`${jobTitleForToast} added`, toastOptions);
    setJobTitle("");
    setJobLocation("");
    setJobHours("");
    setJobdescription("");
    setTimeout(() => {
      navigate("/");
    }, 250);
  };

  // send data to api
  const addJobToDb = async (e) => {
    e.preventDefault();

    // check if fields contain data
    if (jobTitle && jobHours && jobDescription) {
      try {
        let data = {
          title: jobTitle,
          location: jobLocation,
          hours: jobHours,
          active: true,
          description: jobDescription,
        };
        const job = await fetch(fetchUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        // console.log("job", job);

        // run reset if ok
        if (job.ok) {
          resetForm();
        } else {
          // send error message
          toast(`Error: ${job.statusText} `, toastOptions);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // error if any of the fields is empty
      toast(`Error: required field missing`, toastOptions);
    }
  };

  return (
    <div className='block w-full'>
      <h1 className=' text-4xl mb-6'>Add job</h1>

      <div className='lg:flex w-full  gap-4'>
        <div className='form_element w-full'>
          <label className='block text-sm text-gray-500 '>Job title</label>
          <input
            className=' rounded-sm w-full bg-gray-900 border-2 border-gray-800 px-2 py-1'
            type='text'
            value={jobTitle}
            onChange={(e) => {
              setJobTitle(e.target.value);
            }}
          />
        </div>
        <div className='form_element w-full'>
          <label className='block text-sm text-gray-500 '>Location</label>
          <input
            className=' rounded-sm w-full bg-gray-900 border-2 border-gray-800 px-2 py-1'
            type='text'
            value={jobLocation}
            onChange={(e) => {
              setJobLocation(e.target.value);
            }}
          />
        </div>
        <div className='form_element w-full lg:w-2/3'>
          <label className='block text-sm text-gray-500 '>Hours</label>
          <input
            className=' rounded-sm w-full bg-gray-900 border-2 border-gray-800 px-2 py-1'
            type='text'
            value={jobHours}
            onChange={(e) => {
              setJobHours(e.target.value);
            }}
          />
        </div>
      </div>
      <div className='lg:flex w-full flex-col mt-2 mb-5 gap-0'>
        <label className='block text-sm text-gray-500 '>Description</label>
        <div className='editor min-w-full  custom-html-styles w-full block prose text-white'>
          <EditorBar editor={editor} />
          <EditorContent
            className=' rounded-sm mt-2 w-full bg-gray-900 border-2 border-gray-800 px-2 py-1'
            editor={editor}
          ></EditorContent>
        </div>
      </div>
      <button
        role='submit'
        onClick={addJobToDb}
        className='px-3 py-1.5 border-[1px] border-gray-800 rounded-md transition-all duration-300 hover:bg-gray-900  hover:border-gray-800'
      >
        Save job
      </button>
    </div>
  );
}

export default AddJob;
