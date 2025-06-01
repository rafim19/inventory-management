import { Star, StarHalf } from "lucide-react";
import React from "react";

type Props = {
  rating: number;
};

const Rating = ({ rating }: Props) => {
  return [1, 2, 3, 4, 5].map((value, index) => {
    const difference = rating - value;

    if (difference >= -0.5 && difference < 0) {
      return <StarHalf key={index} color={"#FFC107"} />;
    }

    return <Star key={index} color={difference >= 0 ? "#FFC107" : "#E4E5E9"} />;
  });
};

export default Rating;
