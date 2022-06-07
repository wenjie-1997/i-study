import React from "react";

const Welcome = () => {
  return (
    <>
      <div
        style={{ margin: "250px 0px 200px 0px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="w-50 d-flex flex-column align-items-center">
          <h1 className="text-center">Welcome to I-Study</h1>
          <p className="text-center">
            A school online teaching and learning system for teacher and Student
          </p>
        </div>
      </div>
      <div className="credits text-center">
        <i>Developed by Pang Wen Jie</i>
      </div>
    </>
  );
};

export default Welcome;
