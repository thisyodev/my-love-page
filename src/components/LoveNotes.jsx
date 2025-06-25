
const notes = [
  "You make my world brighter every day 💡",
  "Your smile is my favorite thing 😊",
  "You're my best friend and soulmate 💞",
];

const LoveNotes = () => (
  <div className="py-12 bg-pink-100">
    <h2 className="text-3xl font-semibold mb-6">📝 Reasons I Love You</h2>
    <ul className="space-y-4 text-lg max-w-xl mx-auto">
      {notes.map((note, i) => (
        <li key={i} className="bg-white p-4 rounded shadow-md">{note}</li>
      ))}
    </ul>
  </div>
);
export default LoveNotes;
