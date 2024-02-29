import { React } from "react";
import JobList from "../components/JobList";

function Home() {
  return (
    <div className=' w-full block'>
      <h1 className=' text-4xl'>Alle jobs</h1>
      <div className='filter'>Filter</div>
      <JobList></JobList>
    </div>
  );
}

export default Home;
