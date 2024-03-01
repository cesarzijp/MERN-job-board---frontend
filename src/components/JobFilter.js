import { React, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function JobFilter({ jobs }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paramsLocation, setParamsLocation] = useState({});
  const [paramsHours, setParamsHours] = useState({});

  const hoursHandler = (e) => {
    searchParams.set("hours", e.target.value);
    setSearchParams(searchParams);
  };

  const locationHandler = (e) => {
    searchParams.set("location", e.target.value);
    setSearchParams(searchParams);
  };

  // get unique values
  const locationsUnique = () => {
    let array = [];
    jobs.forEach((job) => {
      if (!array.includes(job.location)) {
        array.push(job.location);
      }
    });
    return array;
  };

  const hoursUnique = () => {
    let array = [];
    jobs.forEach((job) => {
      if (!array.includes(job.hours)) {
        array.push(job.hours);
      }
    });
    return array;
  };

  return (
    <div className='flex flex-row gap-4 mb-12'>
      <div className=' flex flex-col gap-1'>
        <label className='block text-sm text-gray-500 '>Location</label>

        <select
          className=' text-gray-200 px-3 py-2  min-w-40 rounded-sm  bg-gray-800 border-2 border-gray-800 focus:border-gray-700 focus-visible:border-gray-700'
          onChange={locationHandler}
        >
          <option value='all'>All</option>
          {locationsUnique().map((location) => (
            <option value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className=' flex flex-col gap-1'>
        <label className='block text-sm text-gray-500 '>Hours</label>

        <select
          className=' text-gray-200 px-3 py-2  min-w-40 rounded-sm  bg-gray-800 border-2 border-gray-800 focus:border-gray-700 focus-visible:border-gray-700'
          onChange={hoursHandler}
        >
          <option value='all'>All</option>
          {hoursUnique().map((hours) => (
            <option value={hours}>{hours}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default JobFilter;
