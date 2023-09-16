import { useContext, useEffect, useRef, useState } from "react";
import { LayerComponent, VirtualTreeContext } from "react-dynamic-virtual-tree";
import { SecondLayer } from "./secondLayer";

export const FirstLayer = ({
  onInitHeight,
  layer,
  listItem,
  sample,
  props,
}) => {
  const { item } = props;
  const { root, listItem: rootListItem } = useContext(VirtualTreeContext);
  const ref = useRef(null);
  const [open, setOpen] = useState(
    listItem.getMemorizedState()?.[0] !== undefined
      ? listItem.getMemorizedState()?.[0]
      : true
  );

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

  const toggleOpen = () => {
    const newOpen = !open;

    setOpen(newOpen);

    if (newOpen) {
      const [, tree] = listItem.getMemorizedState();
      if (!tree) {
        return;
      }

      listItem.setListItemHeightTree(tree);

      root.update(rootListItem);
    } else {
      const tree = listItem.genListItemHeightTree();

      listItem.memorizeState([newOpen, tree]);
      listItem.setChildrenHeight(0);

      root.update(rootListItem);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: listItem.getAbsoluteTop(),
        width: "100%",
      }}
    >
      {sample && (
        <div ref={ref}>
          <p>{item.data.data.toString()}</p>
          <p>{item.data.id}</p>
        </div>
      )}

      <div onClick={toggleOpen}>
        <p>{item.data.data.toString()}</p>
        <p>{item.data.id}</p>
      </div>
      <div style={{ position: "relative" }}>
        <LayerComponent
          getComponentProps={getComponentProps}
          listItem={listItem}
          layer={layer}
        >
          {({ ...props }) => <SecondLayer {...props} />}
        </LayerComponent>
      </div>
    </div>
  );
};
