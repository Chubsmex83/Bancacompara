export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded-xl" />
      <div className="flex gap-1 w-fit">
        {[1, 2, 3].map((i) => <div key={i} className="h-10 w-24 bg-gray-200 rounded-xl" />)}
      </div>
      <div className="h-16 bg-gray-200 rounded-2xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-56 bg-gray-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
