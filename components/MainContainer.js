import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbReload } from "react-icons/tb";
import {
  HiOutlinePlayCircle,
  HiOutlinePauseCircle,
  HiOutlinePhoto,
} from "react-icons/hi2";

import {
  pomodoro,
  shortBreak,
  longBreak,
} from "@/redux/reducers/activityReducer";

const MainContainer = () => {
  const [intervalRef, audioRef] = [useRef(null), useRef(null)];

  const activityDefaultMinutes = useSelector((state) => state.activity.value);
  const dispatch = useDispatch();

  const [timerDisplay, setTimerDisplay] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [bg, setBg] = useState(1);

  useEffect(() => {
    setSecondsLeft(activityDefaultMinutes * 60);
    setTimerDisplay(
      activityDefaultMinutes < 10
        ? `0${activityDefaultMinutes}:00`
        : `${activityDefaultMinutes}:00`
    );
    return () => {
      resetTimer();
    };
  }, [activityDefaultMinutes]);

  useEffect(() => {
    let minutesDisplay = Math.floor(secondsLeft / 60);
    let secondsDisplay = secondsLeft % 60;
    secondsDisplay =
      secondsDisplay < 10 ? `0${secondsDisplay}` : secondsDisplay;
    minutesDisplay =
      minutesDisplay < 10 ? `0${minutesDisplay}` : minutesDisplay;
    setTimerDisplay(`${minutesDisplay}:${secondsDisplay}`);
  }, [secondsLeft]);

  /* Button Click Events  Play Pause Reset */
  const startTimer = () => {
    setIsRunning(true);
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
    }, 1000);
    intervalRef.current = intervalId;
  };

  const pauseTimer = () => {
    const intervalId = intervalRef.current;
    clearInterval(intervalId);
    setIsRunning(false);
  };
  const resetTimer = () => {
    pauseTimer();
    setTimerDisplay(
      activityDefaultMinutes < 10
        ? `0${activityDefaultMinutes}:00`
        : `${activityDefaultMinutes}:00`
    );
    setSecondsLeft(activityDefaultMinutes * 60);
  };
  /*--------*/

  if (secondsLeft < 0) {
    audioRef.current.play();
    resetTimer();
  }

  const changeBG = () => {
    setBg((prev) => (prev == 5 ? 1 : prev + 1));
  };

  return (
    <div
      style={{
        backgroundImage: `url(/bg/${bg}.jpg)`,
      }}
      className={`wrapper flex flex-col h-screen bg-cover bg-center bg-black`}
    >
      <div className="mainContainer flex flex-col gap-5 items-center justify-center w-screen h-full">
        <div className="activity_buttons">
          <ul className="flex w-full gap-6 max-sm:flex-col max-sm:gap-1 ">
            <li className="mx-2 my-2 w-40" onClick={() => dispatch(pomodoro())}>
              <input
                type="radio"
                id="pomo"
                name="activity"
                value="pomo"
                className="hidden peer"
                defaultChecked={true}
              />
              <label
                htmlFor="pomo"
                className="shadow-lg inline-flex justify-center w-full bg-indigo-500 border border-indigo-500 hover:bg-transparent  active:bg-indigo-700 text-white font-bold rounded-full px-5 py-2.5 cursor-pointer  peer-checked:bg-indigo-700"
              >
                <div className="py-2">Pomodoro</div>
              </label>
            </li>
            <li
              className="mx-2 my-2 w-40 "
              onClick={() => dispatch(shortBreak())}
            >
              <input
                type="radio"
                id="short"
                name="activity"
                value="short"
                className="hidden peer"
              />
              <label
                htmlFor="short"
                className="shadow-lg inline-flex justify-center w-full bg-indigo-500 border border-indigo-500 hover:bg-transparent active:bg-indigo-700 text-white font-bold rounded-full px-5 py-2.5 cursor-pointer  peer-checked:bg-indigo-700"
              >
                <div className="py-2">Short Break</div>
              </label>
            </li>
            <li
              className="mx-2 my-2 w-40"
              onClick={() => dispatch(longBreak())}
            >
              <input
                type="radio"
                id="long"
                name="activity"
                value="long"
                className="hidden peer"
              />
              <label
                htmlFor="long"
                className="shadow-lg inline-flex justify-center w-full bg-indigo-500 border border-indigo-500 hover:bg-transparent  active:bg-indigo-700 text-white font-bold rounded-full px-5 py-2.5 cursor-pointer  peer-checked:bg-indigo-700"
              >
                <div className="py-2">Long Break</div>
              </label>
            </li>
          </ul>
        </div>
        <div className="timerDisplay max-sm:text-6xl sm:text-7xl lg:text-9xl text-white font-medium font-mono">
          {timerDisplay}
        </div>
        <div className="startButton flex gap-3">
          {!isRunning && (
            <HiOutlinePlayCircle
              size={60}
              className="text-white cursor-pointer"
              onClick={startTimer}
            />
          )}
          {isRunning && (
            <HiOutlinePauseCircle
              size={60}
              className="text-white cursor-pointer"
              onClick={pauseTimer}
            />
          )}

          <TbReload
            size={60}
            className="text-white cursor-pointer"
            onClick={resetTimer}
          />
          {/* <VscSettings size={40} className="text-white cursor-pointer" /> */}
        </div>
      </div>
      <audio ref={audioRef}>
        <source src="./audio/audio2.mp3" type="audio/mpeg" />
      </audio>
      <div className="footer flex justify-between">
        <div className="spotify flex justify-start max-sm:hidden mx-7 my-6 ">
          <iframe
            className="rounded-xl"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0"
            width="270"
            height="80"
            loading="lazy"
          ></iframe>
        </div>
        <div className="changeBG text-white opacity-60 mx-3 mb-3 flex justify-center items-end cursor-pointer">
          <div
            title="Change Background"
            className="icon [&title]:hover:absolute"
            onClick={() => changeBG()}
          >
            <HiOutlinePhoto size={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
