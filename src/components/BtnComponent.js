function BtnComponent(props) {
    const onSubmit = async (e) => {
        e.preventDefault();

        const report = {
            session_id: "34",
            date: "23/3/23",
            total_time: 300,
            total_pause: 5,
        };
        //console.log(JSON.stringify(report));
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
                        //onClick={props.stop}
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
                        onClick={props.resume}
                    >
                        Resume Tracking
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
        </div>
    );
}

export default BtnComponent;
