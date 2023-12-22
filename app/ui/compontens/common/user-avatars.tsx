export default function UserAvatars() {
  return (
    <>
      <a href="#" className="group block flex-shrink-0">
        <div className="flex items-center">
          <div className="inline-block h-9 w-9 rounded-full bg-slate-200"></div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Tom Cook
            </p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              View profile
            </p>
          </div>
        </div>
      </a>
    </>
  );
}
