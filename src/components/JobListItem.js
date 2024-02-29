import React from "react";
import { Link } from "react-router-dom";

function JobListItem(props) {
  return (
    <Link
      className=' py-7 flex w-full mb-2 border-t-[1px] border-gray-800'
      to={`/jobs/${props.job._id}`}
    >
      <h3 className=' text-3xl'>{props.job.title}</h3>
    </Link>
  );
}

export default JobListItem;
