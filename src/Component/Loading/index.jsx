const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 w-full h-full z-50 flex justify-center items-center bg-slate-300 opacity-45">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    </>
  );
};

export default Loading;
