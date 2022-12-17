import { useState } from "react";

function BtnComponent(props) {
    const [pauseNumber, setPauseNumber] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [pauseTime, setPauseTime] = useState(0);
    const [totalTimeCount, setTotalTimeCount] = useState(0);
    const [date, setDate] = useState(0);

    const totalTimeTrack = () => {
        const timeInMilliSeconds = new Date();
        const dateOfToday =
            timeInMilliSeconds.getDate() +
            "/" +
            timeInMilliSeconds.getMonth() +
            "/" +
            timeInMilliSeconds.getFullYear();
        setDate(dateOfToday);
    };

    const trackDate = () => {
        const timeInMilliSeconds = new Date();
        const dateOfToday =
            timeInMilliSeconds.getDate() +
            "/" +
            timeInMilliSeconds.getMonth() +
            "/" +
            timeInMilliSeconds.getFullYear();
        setDate(dateOfToday);
    };

    //increase counter
    const increasePauseNumber = () => {
        setPauseNumber((count) => count + 1);
    };

    //reset counter
    const resetPauseNumber = () => {
        setPauseNumber(0);
    };

    const timeFunction = () => {
        return Math.floor(Date.now() / 1000);
    };

    const pauseTrackerActions = () => {
        setPauseTime(timeFunction());
        setTotalTimeCount(totalTimeCount + (timeFunction() - startTime));
        increasePauseNumber();
        props.pause();
    };

    const startTrackerActions = () => {
        trackDate();
        props.start();
        setStartTime(timeFunction());
    };

    const resumeTrackerActions = () => {
        props.resume();
        setStartTime(timeFunction());
    };

    const stopTrackerActions = () => {
        setStartTime(0);
        setPauseTime(0);
        setTotalTimeCount(0);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const report = {
            session_id: "34",
            date: date,
            total_time: totalTimeCount,
            total_pause: pauseNumber,
        };
        // send to your database

        fetch("http://localhost:5000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(report),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                resetPauseNumber();
                trackDate();
                stopTrackerActions();
                props.stop();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            {props.status === 0 ? (
                <button
                    className="stopwatch-btn stopwatch-btn-gre"
                    onClick={startTrackerActions}
                >
                    Start Tracking
                </button>
            ) : (
                ""
            )}

            {props.status === 1 ? (
                <div>
                    <button
                        className="stopwatch-btn stopwatch-btn-red"
                        onClick={pauseTrackerActions}
                    >
                        Pause Tracking
                    </button>
                    <button
                        className="stopwatch-btn stopwatch-btn-yel"
                        onClick={onSubmit}
                    >
                        Stop Track
                    </button>
                </div>
            ) : (
                ""
            )}

            {props.status === 2 ? (
                <div>
                    <button
                        className="stopwatch-btn stopwatch-btn-gre"
                        onClick={resumeTrackerActions}
                    >
                        Resume Tracking
                    </button>
                    <button
                        className="stopwatch-btn stopwatch-btn-yel"
                        //onClick={props.stop}
                        onClick={onSubmit}
                    >
                        Stop Track
                    </button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default BtnComponent;
