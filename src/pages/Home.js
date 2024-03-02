import { React } from "react";
import JobList from "../components/JobList";
import FramerPageWrapper from "../components/FramerPageWrapper";

function Home() {
  return (
    <FramerPageWrapper>
      <div className=' w-full block'>
        <h1 className=' text-4xl'>Jobs</h1>
        <JobList></JobList>
      </div>
    </FramerPageWrapper>
  );
}

export default Home;
