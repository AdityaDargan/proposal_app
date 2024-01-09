// src/App.js
import React, { useState } from 'react';
import './App.css';

const questions = [
  'Will you be my girlfriend?',
  'Do you promise to be my forever love?',
  // Add more questions if needed
];

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [buttonPositions, setButtonPositions] = useState({
    yes: { left: 'auto', top: 'auto' },
    no: { left: 'auto', top: 'auto' },
    notSure: { left: 'auto', top: 'auto' },
  });
  const [showButtons, setShowButtons] = useState(true);

  const resetButtonPositions = () => {
    setButtonPositions({
      yes: { left: 'auto', top: 'auto' },
      no: { left: 'auto', top: 'auto' },
      notSure: { left: 'auto', top: 'auto' },
    });
  };

  const handleButtonClick = (answer) => {
    if (answer === 'yes' && questionIndex < questions.length - 1) {
      // If 'Yes' is clicked on a question other than the last one, show the next question
      setQuestionIndex((prevIndex) => prevIndex + 1);
      // Reset button positions
      resetButtonPositions();
    } else if (answer === 'yes' && questionIndex === questions.length - 1) {
      // If 'Yes' is clicked on the last question, show a message or perform an action
      setQuestionIndex(0); // Reset to the first question (you can adjust this as needed)
      resetButtonPositions();
      setShowButtons(false); // Hide buttons after the last 'Yes'
    }
  };

  const handleButtonHover = (e, buttonType) => {
    const button = e.target;
    if (button) {
      const randomX = Math.random() * (window.innerWidth * 0.4) + window.innerWidth * 0.3;
      const randomY = Math.random() * (window.innerHeight * 0.4) + window.innerHeight * 0.3;

      const newPosition = {
        left: `${randomX}px`,
        top: `${randomY}px`,
      };

      // Check for overlap with existing button positions
      const overlaps = Object.values(buttonPositions).some((position) => {
        return (
          Math.abs(parseInt(position.left) - randomX) < button.offsetWidth &&
          Math.abs(parseInt(position.top) - randomY) < button.offsetHeight
        );
      });

      // If overlap, try again with a new position
      if (overlaps) {
        return handleButtonHover(e, buttonType);
      }

      // Set the new position for the current button type
      setButtonPositions((prevPositions) => ({
        ...prevPositions,
        [buttonType]: newPosition,
      }));

      // Apply the new position to the button
      button.style.position = 'absolute';
      button.style.left = newPosition.left;
      button.style.top = newPosition.top;
    }
  };

  return (
    <div className="container">
      <h1 className="text-big font-extrabold mb-8 mt-2">{questions[questionIndex]}</h1>
      {showButtons && (
        <div className="button-container">
          <button
            className="button-yes"
            onClick={() => handleButtonClick('yes')}
          >
            Yes
          </button>
          <button
            className="button-no"
            onMouseEnter={(e) => handleButtonHover(e, 'no')}
          >
            No
          </button>
          <button
            className="button-notSure"
            onMouseEnter={(e) => handleButtonHover(e, 'notSure')}
          >
            Not Sure
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
