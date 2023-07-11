import React, { useEffect, useState } from 'react';
import generateText from './helpers/generateText';

//write regex from a-z and space
const regex = /^[a-z ]$/;

const App = () => {
  const [paragraph, setParagraph] = useState(generateText());
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (paragraph.length === typedText.length) {
      setShowResult(true);
      const endTime = new Date().getTime();

      const difference = Math.round(
        paragraph.split(' ').length / ((endTime - startTime) / 1000 / 60)
      );
      setWpm(difference);
    }
  }, [paragraph, typedText, setWpm, startTime]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toLowerCase();

    if (typedText.length === 0) setStartTime(new Date().getTime());

    if (regex.test(key)) {
      setTypedText(typedText + key);
    }

    if (key === 'backspace') {
      setTypedText(typedText.slice(0, typedText.length - 1));
    }
  };

  const handleRestart = () => {
    setParagraph(generateText());
    setTypedText('');
    setShowResult(false);

    setStartTime(0);
  };

  return (
    <div className='flex flex-col items-center'>
      {showResult && (
        <div className='flex flex-col items-center'>
          <h1 className='text-3xl'>Your typing speed is {wpm} WPM</h1>
        </div>
      )}

      {showResult && (
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md my-4 z-[999]'
          onClick={handleRestart}
        >
          Restart
        </button>
      )}

      {!showResult && (
        <>
          <p className='text-center w-3/4'>
            {paragraph.split('').map((letter, i) => {
              return (
                <span
                  key={i}
                  className={`
                
              
                opacity-75
                transition
                duration-75
                ease-in-out
                
                ${!typedText[i] ? 'bg-gray-500' : ''}
                ${
                  !typedText[i]
                    ? ''
                    : typedText[i] === letter
                    ? 'bg-green-300'
                    : 'bg-red-300'
                }
            
            
            
            `}
                >
                  {letter}
                </span>
              );
            })}
          </p>
          <input
            className='opacity-0 absolute top-0  left-0 h-screen w-screen z-50 cursor-default'
            autoFocus
            onKeyDown={handleKeyDown}
          />
        </>
      )}
    </div>
  );
};

export default App;
