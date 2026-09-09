import EraCard from "./EraCard";

const eras = [
  {
    point: "Point 1:",
    media: "     ",
    title: "Primary Orality to Writing",
    description:
      "From knowledge carried by human memory to information preserved in physical records.",
    answers: [
      {
        label: "A. Why did this change happen?",
        text:
          "Simply relying on memory and relaying the information through spoken words would prove to be difficult as societies became larger and more complex. A conceptualized knowledge not repeated constantly simply vanishes if not said aloud. Having written words and information on paper or any medium became useful for recording information or communicating across different places. That while early scripts is used as a “craft” or administrative aides, the significant moment of breakthrough occurred when the ancient Greeks introduced the vowels for Semitic consonantal scripts, this allowed to an abstract and visual translations of the elusive domain of sound, thus the cause of the change from primary orality to writing. "
      },
      {
        label: "B. Relationship between old and new media",
        text:
          "Both oral and writing allow the sharing of information and knowledge. They can be used together to make communicating easier and accessible. Each can support the other, where spoken words can be written down, while written texts can also be read aloud or communicated orally."
      },
      {
        label: "C. Impact on society and culture",
        text:
          "This change allowed communication and giving information to be easier and accessible. This allowed laws, beliefs, information and knowledge to be recorded accurately. In terms of culture, writing allowed people’s beliefs and traditions to be recorded and passed down to future generations. And with society, rules and laws are written down, helping people understand and follow them."
      }
    ]
  },
  {
    point: "Point 2:",
    media: "     ",
    title: "Print to Electronic Media",
    description:
      "How we went from mass reproduction of text to the mass broadcasting of sound and images.",
    answers: [
      {
        label: "A. Why did this change happen?",
        text:
          "The shift from print era to television era was caused by the development of technology and the growing demand for a quicker and more efficient way of relaying information. This paved the way for the electronic era, which presented information in a more entertaining and visually appealing medium such as the television."
      },
      {
        label: "B. Relationship between old and new media",
        text:
          "Both print and television era serve the purpose of giving and sharing information with people. Television provides moving images with audio while print media mainly has printed words and information. But both are still significant in their own ways. Television, with its audio and visuals, provides a way to share information in an entertaining and engaging way. While print allows the information presented to be more detailed and in-depth."
      },
      {
        label: "C. Impact on society and culture",
        text:
          "The change in this media allowed information to be relayed faster, quicker, and in a more entertaining way. Additionally, more people can have access to this since television can reach people from across the world."
      }
    ]
  },
  {
    point: "Point 3:",
    media: "     ",
    title: "Television to Convergent Media",
    description:
      "Receiving broadcast information from centralized sources to participating in a free connected digital environment.",
    answers: [
      {
        label: "A. Why did this change happen?",
        text:
          " Due to the continuous change and evolution of technology, it allowed the shift from television to the internet for its more world wide and accessible. As technology improves, the Internet and social media were developed, allowing people to connect and communicate with others from across the world."
      },
      {
        label: "B. Relationship between old and new media",
        text:
          "Both television and the internet and social media allow communication. Despite the internet allowing people to access information easier and faster, not everyone has access to it, television remains an important medium that keeps people updated with significant events happening locally and around the world. "
      },
      {
        label: "C. Impact on society and culture",
        text:
          "This change impacted society and culture by making information and communication faster and accessible. Nowadays, people can search, find, and watch information from almost anywhere using their digital devices with just a few clicks. With social media, it allows people to share their thoughts, opinions, content and experiences with others."
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
