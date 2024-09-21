const ButtonUpdate = ({ name, isName }) => {
  return (
    <>
      <button
        type="button"
        data-modal-toggle="user-modal"
        className={`text-white bg-cyan-500 hover:bg-cyan-500 focus:ring-4 focus:ring-cyan-100 font-medium rounded-lg text-sm inline-flex items-center ${
          isName ? "px-2" : "px-3"
        } py-2 text-center`}
      >
        <svg
          className={`${isName ? "mr-0" : "mr-2"} h-5 w-5`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          ></path>
        </svg>
        {name}
      </button>
    </>
  );
};
export default ButtonUpdate;
