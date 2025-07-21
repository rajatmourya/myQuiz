import React from "react";

function Sidebar({ count, setCurrentIndex, answered }) {
  const btnStyle = {
    margin: "3px",
    padding: "10px",
  };

  const answeredStyle = {
    ...btnStyle,
    backgroundColor: "green", // Set a different color for answered questions
    color: "white",
  };

  // Generate an array based on the count
  const buttonArray = Array.from({ length: count }, (_, index) => index + 1);

  return (
    <div>
      {buttonArray.map((num, index) => (
        <button
          key={index}
          style={answered[index] ? answeredStyle : btnStyle} // Apply style based on answered status
          onClick={() => setCurrentIndex(index)} // Set currentIndex on button click
        >
          {num}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
