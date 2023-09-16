import { useContext, useEffect, useRef, useState } from "react";
import { VirtualTreeContext } from "react-dynamic-virtual-tree";

export const ThirdLayer = ({ onInitHeight, listItem, sample, props }) => {
  const { listItem: rootListItem, root } = useContext(VirtualTreeContext);
  const [open, setOpen] = useState(listItem.getMemorizedState() || false);

  const { item } = props;
  const ref = useRef(null);
  const contentRef = useRef(null);
  const editHeight = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    onInitHeight(ref.current.getBoundingClientRect().height);
  }, [ref.current]);

  useEffect(() => {
    const block = contentRef.current;
    if (!block) {
      return;
    }

    const r = new ResizeObserver((elements) => {
      const newHeight = block.getBoundingClientRect().height;
      if (elements.length > 0 && listItem.currentHeight !== newHeight) {
        if (editHeight.current) {
          editHeight.current = false;

          listItem.editHeight(newHeight);
          root.update(rootListItem);
        }
      }
    });

    r.observe(block);
    return () => {
      r.unobserve(block);
    };
  }, [contentRef.current]);

  const toggleOpen = () => {
    editHeight.current = true;
    listItem.memorizeState(!open);
    setOpen(!open);
  };

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
          <div>
            <p>{item.data.data.toString()}</p>
            <p>{item.data.id}</p>
          </div>
        </div>
      )}

      <div
        onClick={toggleOpen}
        ref={contentRef}
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
        <div>
          <p>{item.data.data.toString()}</p>
          <p>{item.data.id}</p>

          {open && <div style={{ height: 120 }}>Additional content</div>}
        </div>
      </div>
    </>
  );
};
