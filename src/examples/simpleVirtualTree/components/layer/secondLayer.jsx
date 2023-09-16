import { useEffect, useRef } from "react";
import { LayerComponent } from "react-dynamic-virtual-tree";
import { ThirdLayer } from "./thirdLayer";

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
        <div ref={ref}>
          <p>{item.data.data.toString()}</p>
          <p>{item.data.id}</p>
        </div>
      )}

      <div>
        <p>{item.data.data.toString()}</p>
        <p>{item.data.id}</p>
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
