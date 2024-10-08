const ButtonDelete = ({ name, isName }) => {
  return (
    <>
      <button
        type="button"
        data-modal-toggle="delete-user-modal"
        className={`text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:ring-red-100 font-medium rounded-lg text-sm inline-flex items-center ${
          isName ? "px-1" : "px-3"
        } py-2 text-center`}
      >
        <svg
          className={`${isName ? "mr-0" : "mr-2"} h-5 w-5`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        {name}
      </button>
    </>
  );
};

export default ButtonDelete;
