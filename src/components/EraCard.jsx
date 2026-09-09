import { useState } from "react";

export default function EraCard({ point, title, description, answers, media }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="era">
      <div className="era-content">
        <div className="media">{media}</div>
        <div className="date">{point}</div>
        <h2>{title}</h2>
        <p>{description}</p>

        <button onClick={() => setOpen(!open)}>
          {open ? "Close Point" : `Explore ${point}`}
        </button>

        <div className={`details ${open ? "open" : ""}`}>
          {answers.map((answer) => (
            <div className="answer" key={answer.label}>
              <h3>{answer.label}</h3>
              <p>{answer.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
