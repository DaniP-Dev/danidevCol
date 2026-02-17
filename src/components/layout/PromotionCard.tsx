export default function indx() {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="p-4 bg-blue-50 rounded-lg dark:bg-blue-900">
        <div className="flex items-center mb-3">
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
            Pro
          </span>
        </div>
        <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
          Unlock premium features and boost your productivity!
        </p>
        <a
          href="#"
          className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Upgrade now
        </a>
      </div>
    </div>
  );
}
