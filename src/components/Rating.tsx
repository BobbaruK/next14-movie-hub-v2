import React from "react";
import { FaStar } from "react-icons/fa";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  vote: number;
}

const Rating = ({ vote, ...restProps }: Props) => {
  const voteFixed = vote.toFixed(1);
  return (
    <span
      {...restProps}
      className={[
        "flex",
        "items-center",
        "gap-2",
        "rounded-md",
        "bg-black",
        "px-2",
        "text-slate-300",
        `${restProps.className}`,
      ].join(" ")}
    >
      <FaStar /> {voteFixed}
    </span>
  );
};

export default Rating;
