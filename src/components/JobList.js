import { React, useState, useEffect } from "react";
import JobListItem from "./JobListItem";

function JobList() {
  const [jobsArray, setJobsArray] = useState([]);

  const fetchUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_LOCALURL
      : process.env.REACT_APP_LIVE_URL;

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await fetch(fetchUrl);
        const jobs = await res.json();
        console.log(res);
        if (res.ok) {
          setJobsArray(jobs);
        } else {
          console.error("Res not ok");
        }
      } catch (error) {
        console.error();
      }
    };

    getJobs();
  }, []);

  return (
    <div className=' w-full block border-b-[1px] mt-4 border-gray-800'>
      {jobsArray.map((job) => (
        <JobListItem key={job._id} job={job}></JobListItem>
      ))}
    </div>
  );
}

export default JobList;
