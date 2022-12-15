import React from "react";

function BtnComponent(props) {
    return (
        <div>
            {props.status === 0 ? (
                <button
                    className="stopwatch-btn stopwatch-btn-gre"
                    onClick={props.start}
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
                        onClick={props.pause}
                    >
                        Pause Tracking
                    </button>
                    <button
                        className="stopwatch-btn stopwatch-btn-yel"
                        onClick={props.reset}
                    >
                        Reset Tracking
                    </button>
                </div>
            ) : (
                ""
            )}

            {props.status === 2 ? (
                <div>
                    <button
                        className="stopwatch-btn stopwatch-btn-gre"
                        onClick={props.resume}
                    >
                        Resume Tracking
                    </button>
                    <button
                        className="stopwatch-btn stopwatch-btn-yel"
                        onClick={props.reset}
                    >
                        Reset Tracking
                    </button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default BtnComponent;
