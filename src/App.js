import { useEffect, useState } from "react";
import "./App.css";
import BtnComponent from "./components/BtnComponent";
import DisplayComponent from "./components/DisplayComponent";
import TrackingTable from "./components/TrackingTable";

function App() {
    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);

    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setReports(data);
            });
    }, []);

    // Not started = 0
    // started = 1
    // stopped = 2

    const start = () => {
        run();
        setStatus(1);
        setInterv(setInterval(run, 10));
    };

    var updatedMs = time.ms,
        updatedS = time.s,
        updatedM = time.m,
        updatedH = time.h;

    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        if (updatedMs === 100) {
            updatedS++;
            updatedMs = 0;
        }
        updatedMs++;
        return setTime({
            ms: updatedMs,
            s: updatedS,
            m: updatedM,
            h: updatedH,
        });
    };

    const pause = () => {
        clearInterval(interv);
        setStatus(2);
    };

    const stop = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ ms: 0, s: 0, m: 0, h: 0 });
    };

    const resume = () => start();

    return (
        <div className="main-section">
            <div className="clock-holder">
                <div className="stopwatch">
                    <BtnComponent
                        status={status}
                        resume={resume}
                        stop={stop}
                        pause={pause}
                        start={start}
                    />
                    <br></br>
                    <DisplayComponent time={time} />
                </div>
            </div>
            <div className="table-holder">
                <TrackingTable
                    key={reports.session_id}
                    reports={reports}
                ></TrackingTable>
            </div>
        </div>
    );
}

export default App;
