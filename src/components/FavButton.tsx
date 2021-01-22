import { useEffect, useState } from "react";
import styles from "./FavButton.module.css";

export default function FavButton({ fav, onClick }) {
  const [animClass, setAnimClass] = useState("");
  useEffect(() => {
    setAnimClass(styles.anim);
    setTimeout(() => setAnimClass(""), 1000);
  }, [fav]);

  return (
    <img
      onClick={onClick}
      src={fav ? "/heart.svg" : "/heart-off.svg"}
      className={styles.like + " " + animClass}
    />
  );
}
