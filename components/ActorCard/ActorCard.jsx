export default function ActorCard({ actor, onClick }) {
  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer"
      onClick={onClick} // Handle card click
    >
      <img 
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} 
        alt={actor.name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{actor.name}</h3>
        <p className="text-gray-600">Known for: {actor.known_for_department}</p>
      </div>
    </div>
  );
}
