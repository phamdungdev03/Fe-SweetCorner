const ButtonCreate = ({ name }) => {
  return (
    <button
      type="button"
      data-modal-toggle="add-user-modal"
      className="w-1/2 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
    >
      <svg
        className="-ml-1 mr-2 h-6 w-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        ></path>
      </svg>
      {name}
    </button>
  );
};

export default ButtonCreate;
