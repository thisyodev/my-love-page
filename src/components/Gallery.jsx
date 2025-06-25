
const images = ['/img1.jpg', '/img2.jpg'];

const Gallery = () => (
  <div className="py-12">
    <h2 className="text-3xl font-semibold mb-6">📸 Our Memories</h2>
    <div className="flex justify-center gap-6 flex-wrap">
      {images.map((src, i) => (
        <img key={i} src={src} alt={`memory-${i}`} className="w-64 h-64 object-cover rounded-xl shadow-xl hover:scale-105 transition" />
      ))}
    </div>
  </div>
);
export default Gallery;
