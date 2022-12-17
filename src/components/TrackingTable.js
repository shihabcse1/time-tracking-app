import Table from "react-bootstrap/Table";

function TrackingTable({ reports }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Session ID</th>
                    <th>Date</th>
                    <th>Total Time Tracked</th>
                    <th>Total Pauses</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((a, index) => (
                    <tr>
                        <td>{a.session_id}</td>
                        <td>{a.date}</td>
                        <td>
                            {Math.floor(parseInt(a.total_time) / 3600)}h{" "}
                            {Math.floor((parseInt(a.total_time) % 3600) / 60)}m
                        </td>
                        <td>{a.total_pause}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default TrackingTable;
