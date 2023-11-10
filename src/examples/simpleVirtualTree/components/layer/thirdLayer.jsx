import { useEffect, useRef } from "react";
import styles from "../../../layer.module.css";

export const ThirdLayer = ({ onInitHeight, listItem, sample, props }) => {
  const { item } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    onInitHeight(ref.current.getBoundingClientRect().height);
  }, [ref.current]);

  return (
    <>
      {sample && (
        <div
          ref={ref}
          style={{
            position: "absolute",
            width: "100%",
            borderBottom: "1px solid red",
            padding: 4,
          }}
        >
          <div className={styles.item}>
            <p>{item.data.data.toString()}</p>
          </div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          cursor: "pointer",
          top: listItem.getAbsoluteTop(),
          width: "100%",
          borderBottom: "1px solid red",
          padding: 4,
          marginLeft: 20,
        }}
      >
        <div className={styles.item}>
          <p>{item.data.data.toString()}</p>
        </div>
      </div>
    </>
  );
};
