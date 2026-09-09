import EraCard from "./EraCard";

const eras = [
  {
    point: "Point 01",
    media: "     ",
    title: "Primary Orality → Writing",
    description:
      "From knowledge carried by human memory to information preserved in physical records.",
    answers: [
      {
        label: "A — Why did this change happen?",
        text:
          "Oral communication depended heavily on memory and direct human interaction. As societies became larger and more complex, people needed ways to preserve information beyond individual memory. Writing allowed laws, transactions, history, beliefs, and knowledge to be recorded and preserved."
      },
      {
        label: "B — Relationship between old and new media",
        text:
          "Both oral and written communication share the purpose of transmitting knowledge, stories, beliefs, and traditions. Oral communication is immediate and highly accessible within a community, while writing provides greater permanence and allows information to travel across distance and generations."
      },
      {
        label: "C — Impact on society and culture",
        text:
          "Writing transformed government, religion, education, trade, and history by making information recordable and transferable. Cultural knowledge no longer depended entirely on human memory and could be preserved through physical records."
      }
    ]
  },
  {
    point: "Point 02",
    media: "     ",
    title: "Print → Electronic Media",
    description:
      "From mass reproduction of text to the mass broadcasting of sound and images.",
    answers: [
      {
        label: "A — Why did this change happen?",
        text:
          "Printing made information faster and cheaper to reproduce. As society continued to develop, people sought even faster ways to distribute information to large audiences. Electrical technologies eventually made it possible to transmit sound and images across long distances, leading to radio and television."
      },
      {
        label: "B — Relationship between old and new media",
        text:
          "Print and electronic media both inform, educate, entertain, and influence mass audiences. Print requires reading, while television combines sound and moving images. Both can shape public opinion, but electronic broadcasting can deliver the same message to huge audiences almost simultaneously."
      },
      {
        label: "C — Impact on society and culture",
        text:
          "Television and other electronic media changed everyday life by becoming major sources of news and entertainment. They influenced popular culture, advertising, consumer behavior, and political campaigns by allowing messages and images to reach millions of people at once."
      }
    ]
  },
  {
    point: "Point 03",
    media: "     ",
    title: "Television → Convergent Media",
    description:
      "From receiving broadcast information to participating in a connected digital environment.",
    answers: [
      {
        label: "A — Why did this change happen?",
        text:
          "Computers, the internet, smartphones, and digital networks created faster and more interactive forms of communication. Unlike traditional broadcasting, digital media allows people to receive information while also creating, sharing, commenting on, and distributing their own content."
      },
      {
        label: "B — Relationship between old and new media",
        text:
          "Television and new media both inform, entertain, and influence audiences. However, television mainly follows a one-to-many model, while social media enables many-to-many communication. New media also combines features of older media: text from print, audio from radio, video from television, and interpersonal communication from telephones and messaging."
      },
      {
        label: "C — Impact on society and culture",
        text:
          "The internet and social media made communication faster, more accessible, and more participatory. Individuals can publish to global audiences without traditional media organizations. This changed politics, journalism, business, entertainment, education, and relationships, while also creating challenges such as misinformation, privacy concerns, and information overload."
      }
    ]
  }
];

export default function Timeline() {
  return (
    <main className="timeline-wrap">
      <div className="timeline" />
      {eras.map((era) => (
        <EraCard key={era.point} {...era} />
      ))}
    </main>
  );
}
