export default function SquadCard({ data }) {
  return (
    <div className="squad-card">
      {Object.entries(data).map(([team, players]) => (
        <div className="team-squad" key={team}>
          <h3>{team}</h3>
          <ul>
            {players.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
