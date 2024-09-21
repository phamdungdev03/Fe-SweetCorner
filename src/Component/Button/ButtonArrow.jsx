import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} rounded-lg cursor-pointer right-3 top-1/2 z-[2]`}
      style={{
        ...style,
        background: "#fff",
        width: "30px",
        height: "30px",
        transform: "translateY(-50%)",
        border: "2px solid #cd9b32",
      }}
      onClick={onClick}
    >
      <span className="text-black text-2xl absolute left-0.5 top-0.5">
        <GrFormNext />
      </span>
    </div>
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} rounded-lg cursor-pointer left-3 top-1/2 z-[2]`}
      style={{
        ...style,
        background: "#fff",
        width: "30px",
        height: "30px",
        transform: "translateY(-50%)",
        border: "2px solid #cd9b32",
      }}
      onClick={onClick}
    >
      <span className="text-black text-2xl absolute right-0.5 top-0.5">
        <GrFormPrevious />
      </span>
    </div>
  );
};

export { NextArrow, PrevArrow };
