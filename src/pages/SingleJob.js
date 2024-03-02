import { React, useState, useEffect, dangerouslySetInnerHTML } from "react";
import { useParams, Link } from "react-router-dom";
import DeleteJobButton from "../components/DeleteJobButton";
import FramerPageWrapper from "../components/FramerPageWrapper";

function SingleJob() {
  const [jobData, setJobData] = useState(null);
  const { id } = useParams();

  const fetchUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_LOCALURL
      : process.env.REACT_APP_LIVE_URL;

  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const res = await fetch(`${fetchUrl}${id}`);
        const job = await res.json();
        console.log(job);
        if (res.ok) {
          setJobData(job);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSingleJob();
  }, []);

  let jobDataHtml = { __html: "" };

  if (jobData) {
    jobDataHtml = { __html: jobData.description };
  }

  return (
    <FramerPageWrapper>
      <div className='w-full'>
        {jobData && (
          <>
            <div class='flex justify-between'>
              <Link
                className='px-3 py-1.5 border-[1px] border-gray-800 rounded-md transition-all duration-300 hover:bg-gray-900  hover:border-gray-800'
                to='/'
              >
                Back
              </Link>
              <DeleteJobButton id={id} title={jobData.title}></DeleteJobButton>
            </div>
            <h1 className=' mt-6 mb-4 text-4xl'>{jobData.title}</h1>
            <div
              className='prose custom-html-styles text-white'
              dangerouslySetInnerHTML={jobDataHtml}
            ></div>
            {/* <p>{jobData.description}</p> */}
          </>
        )}
      </div>
    </FramerPageWrapper>
  );
}

export default SingleJob;
