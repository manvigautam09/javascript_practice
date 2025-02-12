import React from "react";
import "./styles.css";
import "./styles/tailwind-pre-build.css";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

const y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const x = [1, 2, 3, 4, 5, 6, 7, 8];

const getNewPos = (currOfX, currOfY) => {
  let newPosOfX = 1;
  let newPosOfY = 1;

  if (currOfX % 2 !== 0) {
    newPosOfY = currOfY === y.length ? currOfY : Number(currOfY) + 1;
    newPosOfX = currOfY === y.length ? Number(currOfX) + 1 : currOfX;
  } else {
    newPosOfY = currOfY === 1 ? currOfY : Number(currOfY) - 1;
    newPosOfX = currOfY === 1 ? Number(currOfX) + 1 : currOfX;
  }

  return { newPosOfX, newPosOfY };
};

const customIncludes = (filled, x, y) => {
  let includes = false;
  if (filled[x] && filled[x].includes(y)) {
    includes = true;
  }

  return includes;
};

export default function App() {
  const [resumeAnimation, setResumeAnimation] = useState(false);
  const [filled, setFilled] = useState({
    // 1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    // 2: [10, 9, 8],
  });

  const startOrResumeAnimation = () => {
    setInterval(() => {
      setFilled((filledPrev) => {
        const currOfX =
          Object.keys(filledPrev).length === 0
            ? 1
            : Object.keys(filledPrev)[Object.keys(filledPrev).length - 1];

        const currOfY =
          Object.keys(filledPrev).length > 0
            ? filledPrev[Object.keys(filledPrev).length][
                filledPrev[Object.keys(filledPrev).length].length - 1
              ]
            : 1;
        console.log("currOfX", currOfX);
        if (currOfX > x.length || (currOfX === 1 && currOfY === 1)) {
          setFilled({ 1: [1] });
        } else {
          let { newPosOfX, newPosOfY } = getNewPos(currOfX, currOfY);

          let newFilled = { ...filledPrev };
          newFilled[newPosOfX] = newFilled[newPosOfX]
            ? [...newFilled[newPosOfX], newPosOfY]
            : [newPosOfY];
          setFilled(newFilled);
        }
      });
    }, 300);
  };

  return (
    <Router>
      <div className="App p-3">
        <button
          onClick={startOrResumeAnimation}
          className="bg-gray-400 border border-black p-1 my-3 focus:outline-none rounded-lg"
        >
          Animation
        </button>
        {/* <button className="ml-4 bg-gray-400 border border-black p-1 my-3 focus:outline-none rounded-lg">
          Pause
        </button> */}
        {x.map((xItem, xInd) => (
          <div className="flex" key={xInd}>
            {y.map((yItem, yInd) => (
              <div
                className="w-8  border border-grey"
                key={yInd}
                style={{
                  backgroundColor: customIncludes(filled, xInd + 1, yInd + 1)
                    ? "green"
                    : "white",
                }}
              >
                {[xInd + 1 + ",", yInd + 1]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Router>
  );
}
