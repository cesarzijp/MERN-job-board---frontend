import { React, useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import JobListItem from "./JobListItem";
import JobFilter from "./JobFilter";

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
      {jobsArray.map((job) => (
        <JobListItem key={job._id} job={job}></JobListItem>
      ))}
    </div>
  );
}

export default JobList;
