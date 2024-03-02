import React from "react";

function Container(props) {
  return (
    <div className='w-full max-w-full lg:max-w-[900px] mx-auto flex px-4 '>
      {props.children}
    </div>
  );
}

export default Container;
