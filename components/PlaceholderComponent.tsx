export default function PlaceholderComponent({ title }: { title: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Component is being updated. Check back soon!
        </p>
      </div>
    </div>
  )
}