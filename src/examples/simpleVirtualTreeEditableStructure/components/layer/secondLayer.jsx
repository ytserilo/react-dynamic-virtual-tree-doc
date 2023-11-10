import { useEffect, useRef } from "react";
import { LayerComponent } from "react-dynamic-virtual-tree";
import { ThirdLayer } from "./thirdLayer";
import styles from "../../../layer.module.css";

export const SecondLayer = ({
  onInitHeight,
  layer,
  listItem,
  sample,
  props,
}) => {
  const { item } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    onInitHeight(ref.current.getBoundingClientRect().height);
  }, [ref.current]);

  const getComponentProps = (index) => {
    const children = item.children;
    if (!children[index]) {
      return;
    }
    return {
      item: children[index],
    };
  };

  return (
    <div
      style={{
        position: "absolute",
        top: listItem.getAbsoluteTop(),
        width: "100%",
        marginLeft: 20,
      }}
    >
      {sample && (
        <div ref={ref} className={styles.item}>
          <p>{item.data.data.toString()}</p>
        </div>
      )}

      <div className={styles.item}>
        <p>{item.data.data.toString()}</p>
      </div>
      <div style={{ position: "relative" }}>
        <LayerComponent
          getComponentProps={getComponentProps}
          listItem={listItem}
          layer={layer}
        >
          {({ ...props }) => <ThirdLayer {...props} />}
        </LayerComponent>
      </div>
    </div>
  );
};
