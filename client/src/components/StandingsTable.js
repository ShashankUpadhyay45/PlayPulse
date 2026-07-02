export default function StandingsTable({ table }) {
  return (
    <table className="standings-table">
      <thead>
        <tr>
          <th>Team</th>
          <th>Played</th>
          <th>Won</th>
          <th>Lost</th>
          <th>Points</th>
        </tr>
      </thead>

      <tbody>
        {table.map((t, i) => (
          <tr key={i}>
            <td>{t.team}</td>
            <td>{t.played}</td>
            <td>{t.won}</td>
            <td>{t.lost}</td>
            <td>{t.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
