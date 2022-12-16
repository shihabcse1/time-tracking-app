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
                        <td>{a.Date}</td>
                        <td>{a.total_time}</td>
                        <td>{a.total_pause}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default TrackingTable;
