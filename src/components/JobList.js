import { React, useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import JobListItem from "./JobListItem";
import JobFilter from "./JobFilter";
import { motion, AnimatePresence } from "framer-motion";

function JobList() {
  const [jobsArray, setJobsArray] = useState([]);
  const [copyOfJobsArray, setCopyOfJobsArray] = useState([]);
  const [searchParams] = useSearchParams();

  // get url parameters
  const location = useLocation();

  const [locationParam, setLocationParam] = useState(
    searchParams.get("location")
  );
  const [hoursParam, setHoursParam] = useState(searchParams.get("hours"));

  useEffect(() => {
    setLocationParam(searchParams.get("location"));
    setHoursParam(searchParams.get("hours"));
  }, [location]);

  const filterJobs = () => {
    let arrayToFilter = copyOfJobsArray;
    if (locationParam) {
      const newArray = arrayToFilter.filter((job) => {
        if (locationParam === "all") {
          return true;
        }
        if (job.location === locationParam) {
          return true;
        } else {
          return false;
        }
      });
      arrayToFilter = newArray;
    }
    if (hoursParam) {
      const newArray = arrayToFilter.filter((job) => {
        if (hoursParam === "all") {
          return true;
        }
        if (job.hours === hoursParam) {
          return true;
        } else {
          return false;
        }
      });
      arrayToFilter = newArray;
    }
    console.log("run", arrayToFilter);
    setJobsArray(arrayToFilter);
  };

  useEffect(() => {
    filterJobs();
  }, [locationParam, hoursParam, location, copyOfJobsArray]);

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
          setCopyOfJobsArray(jobs);
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
      {copyOfJobsArray && <JobFilter jobs={copyOfJobsArray}></JobFilter>}
      <AnimatePresence mode='wait'>
        {jobsArray.map((job) => (
          <motion.div
            layout
            key={job._id}
            className='block w-full'
            initial={{ opacity: 0, y: 50, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1,
              y: 50,
            }}
            transition={{ duration: 0.25, ease: [0.54, 0.475, 0.005, 0.995] }}
          >
            <JobListItem job={job}></JobListItem>
          </motion.div>
        ))}
        {!jobsArray && (
          <p>
            It can take up to 1 minute for the backend to wake up for the first
            request
          </p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default JobList;
