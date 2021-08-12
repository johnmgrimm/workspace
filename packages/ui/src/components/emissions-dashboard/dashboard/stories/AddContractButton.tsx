import { PlusIcon as PlusIconOutline } from '@heroicons/react/outline';

export default function Example() {
  return (
    <div className="flex flex-wrap content-center">
      <button
        type="button"
        className="inline-flex mr-4 items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIconOutline className="h-5 w-5" aria-hidden="true" />
      </button>
      <p className="my-auto text-base font-medium text-gray-900">
        Add Contract
      </p>
    </div>
  );
}
