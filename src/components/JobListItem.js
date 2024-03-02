import React from "react";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";

function JobListItem(props) {
  return (
    <Link
      className=' py-7 flex justify-between w-full mb-2 border-t-[1px] flex-col gap-3 lg:gap-0 lg:flex-row border-gray-800'
      to={`/jobs/${props.job._id}`}
    >
      <h3 className='text-3xl'>{props.job.title}</h3>
      <div className='flex gap-6  lg:justify-end lg:w-[300px]'>
        <div className='flex custom-center item-center flex-row  '>
          <FiClock />
          <span>{props.job.hours}</span>
        </div>
        <div className='flex custom-center items-center flex-row lg:min-w-40 justify-end  '>
          <FiMapPin />
          <span>{props.job.location}</span>
        </div>
      </div>
    </Link>
  );
}

export default JobListItem;
