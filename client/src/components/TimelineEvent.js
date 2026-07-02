export default function TimelineEvent({ event }) {
  return (
    <div className="timeline-event">
      <span className="time-box">{event.time}</span>
      <p>{event.text}</p>
    </div>
  );
}
