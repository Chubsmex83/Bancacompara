export default function Loading() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="h-8 w-56 bg-gray-200 rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 bg-gray-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
