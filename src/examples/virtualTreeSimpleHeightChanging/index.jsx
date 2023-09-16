import { useContext, useEffect, useRef, useState } from "react";
import {
  LayerComponent,
  mergeVirtualTree,
  VirtualTreeContext,
  VirtualTreeProvider,
} from "react-dynamic-virtual-tree";
import { FirstLayer } from "./components/layer/firstLayer";
import { genTreeData, genVirtualTree } from "../generateDataFunction";

const VirtualTreeIndex = ({ item }) => {
  const {
    root,
    ready: virtualTreeReady,
    layer,
    listItem,
    setLayer,
    setListItem,
    reInit,
  } = useContext(VirtualTreeContext);
  const [ready, setReady] = useState(false);
  const clearFunction = useRef(() => {});

  useEffect(() => {
    const [{ listItem: newListItem, layer: newLayer }, clear] = genVirtualTree(
      listItem,
      layer,
      ready,
      item
    );

    if (ready) {
      const { listItem: mergedListItem, layer: mergedLayer } = mergeVirtualTree(
        { listItem, layer },
        { listItem: newListItem, layer: newLayer },
        () => {
          reInit(newListItem, newLayer);
        }
      );

      setListItem(mergedListItem);
      setLayer(mergedLayer);
      root.update(mergedListItem);
      clearFunction.current();
    }
    setReady(true);
    clearFunction.current = clear;
  }, [item]);

  useEffect(() => {
    return clearFunction.current;
  }, []);

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
    <div style={{ position: "relative" }}>
      {ready && (
        <div>
          {!virtualTreeReady && <span>Loading...</span>}
          <LayerComponent
            getComponentProps={getComponentProps}
            layer={layer}
            listItem={listItem}
          >
            {({ ...props }) => <FirstLayer {...props} />}
          </LayerComponent>
        </div>
      )}
    </div>
  );
};

export const VirtualTreeSimpleHeightChanging = () => {
  const [treeData, setTreeData] = useState(genTreeData());

  return (
    <div className="virtual-tree">
      <VirtualTreeProvider height={500}>
        <VirtualTreeIndex item={treeData} />
      </VirtualTreeProvider>
    </div>
  );
};
