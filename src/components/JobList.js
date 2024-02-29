import { React, useState, useEffect } from "react";
import JobListItem from "./JobListItem";

function JobList() {
  const [jobsArray, setJobsArray] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/jobs");
        const jobs = await res.json();
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
