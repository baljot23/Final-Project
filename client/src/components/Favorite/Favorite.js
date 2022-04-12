import { FcLike } from "react-icons/fc";
import { BsHeart } from "react-icons/bs";
import { useState } from "react";
const Favorite = () => {
  const like = <FcLike />;
  const unLike = <BsHeart />;

  const [favorite, setFavorite] = useState();

  const toggleFavorite = () => {
    setFavorite((like) => {
      if (like === true) {
        console.log("I clicked unlike");
        fetch(`/character/like`, {
          method: "PUT",
        }).then(console.log("This was a favorite character, but now it isn't"));
      }
      if (like === false) {
        console.log("I clicked like");
        fetch(``)
      }
    });
  };

  return (
    <div>
      <BsHeart />
    </div>
  );
};

export default Favorite;
