import React from "react";

const Course = () => {
  return (
    <div className="em__course__card">
      <div className="display">
        <img src="assets/images/c1.png" alt="Course Image" />
      </div>
      <div className="details">
        <div className="duration">
          <span>Duration: 8 Month</span>
        </div>
        <div className="title">
          <h4>Flower Design</h4>
        </div>

        <div className="read__more">Read More</div>
      </div>
    </div>
  );
};

export default Course;
