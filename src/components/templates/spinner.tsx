export default function Spinner() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center p-4">
          <span>Loading...</span>
        </div>
      </div>
    </div>
  );
}
