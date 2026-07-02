export default function CommentaryBox({ feed }) {
  return (
    <div className="commentary-box">
      {feed.map((line, i) => (
        <div className="comment-line" key={i}>
          <span className="time">{line.time}</span>
          <p>{line.text}</p>
        </div>
      ))}
    </div>
  );
}
