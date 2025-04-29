const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div
      className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-b-blue-500 border-transparent"
      role="status"
      aria-label="Loading"
    ></div>
  </div>
);

export default LoadingSpinner;
