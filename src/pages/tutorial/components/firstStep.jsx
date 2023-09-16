import React from "react";
import { Collapse } from "antd";
import { Highlight } from "../../../components/highlight";

export const FirstStep = () => {
  return (
    <>
      <h2 id="firstStep" className="layoutTitle">
        First Steps
      </h2>
      <p>To begin, you need to wrap VirtualTreeIndex in VirtualTreeProvider.</p>
      <blockquote>
        <p>
          VirtualTreeIndex is a component that you need to create yourself. How
          to create this component will be described shortly.
        </p>
      </blockquote>
      <h4>VirtualTreeProvider props</h4>
      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`props -> {
    height: number;
    className?: string;
}`}
          />
        </code>
      </pre>
      <Highlight
        language="typescript"
        code={`const App = () => {
 return (
   <VirtualTreeProvider height={500}>
     <VirtualTreeIndex item={treeData} />
   </VirtualTreeProvider>
 );
};
`}
      />
      <blockquote>
        <p>
          You can also use{" "}
          <a
            target="_blank"
            href="https://www.npmjs.com/package/react-virtualized-auto-sizer"
          >
            react-virtualized-auto-sizer
          </a>{" "}
          to get the height value.
        </p>
      </blockquote>
      <Highlight
        language="typescript"
        code={`const App = () => {
 return (
   <AutoSizer>
     {({ height }) => {
       <VirtualTreeProvider height={height}>
         <VirtualTreeIndex item={treeData} />
       </VirtualTreeProvider>;
     }}
   </AutoSizer>
 );
};
`}
      />
      <p id="virtualTreeIndex">
        Next, we need to create a <strong>VirtualTreeIndex</strong>.
      </p>
      <blockquote>
        <p>
          This component is needed to update the tree structure and clear the
          virtual tree.
        </p>
      </blockquote>
      <Highlight
        language="typescript"
        code={`interface ItemData {
 id: number;
 data: string;
}

interface Item {
 id: string;
 data: ItemData;
 children: Item[];
}

const VirtualTreeIndex = ({ item }: { item: Item }) => {
 const {
   ready: virtualTreeReady,
   /*
     virtualTreeReady - You can use this value to display a loader, essentially known as tree warm-up,
     since the height values for nodes are taken from the component itself.
   */
   layer,
   listItem,
 } = useContext(VirtualTreeContext);

 /*
   The ready parameter needs to be set to true when you haven't initialized the virtual tree yet.
   By default, ready should be false.
  */
 const [ready, setReady] = useState<boolean>(false);

 /* Needed to clear the virtual tree of outdated nodes */
 const [clearFunction, setClearFunction] = useState<() => void>(() => {});

 useEffect(() => {
   /*
    Here, we use clearFunction as an unmount function for useEffect.
     You need to use useEffect without dependencies, just pass an empty array,
     so that the unmount function is called only once.
    */
   return clearFunction;
 }, []);

 const getComponentProps = (index: number): LayerProps | undefined => {
   /*
     The getComponentProps function is mandatory for the LayerComponent component,
     this function is needed to pass data to your components.
    */
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
       {/*
         position: "relative" is needed for the correct positioning of virtual components.
         Since virtual components are positioned relative to their parent nodes.
       */}
       {ready && (
           <div>
             {!virtualTreeReady && <span>Loading...</span>}
             <LayerComponent<LayerProps | undefined>
                 getComponentProps={getComponentProps}
                 layer={layer}
                 listItem={listItem}
             >
               {({ ...props }) => <FirstLayer {...props} />}
             </LayerComponent>
             {
               /*
                 layer, listItem should contain parent nodes to those that will be in FirstLayer
               */
             }
           </div>
       )}
     </div>
 );
};
`}
      />
      <p>
        In this example, we will use useEffect to update the data and structure
        of the virtual tree.
      </p>
      <Highlight
        language="typescript"
        code={`useEffect(() => {
 const [{ listItem: newListItem, layer: newLayer }, clear] = genVirtualTree(listItem, layer, ready, item);

 if (ready) {
   const { listItem: mergedListItem, layer: mergedLayer } = mergeVirtualTree(
       { listItem, layer },
       { listItem: newListItem, layer: newLayer },
       () => {
         reInit(newListItem, newLayer);
         /*
           reInitTrigger is called only when there are conflicts during
           merging trees, in the body of this function, call the reInit function
           with the new listItem and layer objects.
          
           This means that the tree will go through the reinitialization procedure again.
          */
       }
   );
   /*
    The mergeVirtualTree function merges two virtual trees while preserving the state of the tree.
     The data that is preserved after merging includes mergedState, currentHeight, defaultHeight.
    */

   setListItem(mergedListItem); // Set mergedListItem as the root listItem
   setLayer(mergedLayer); // Set mergedLayer as the root layer
   root.update(mergedListItem); // Now update the tree
   clearFunction(); // Need to call it here to remove outdated data.
 }
 setReady(true);
 /*
   When we set ready to true, it should only be when
   listItem and layer objects formed.
  */

 setClearFunction(() => {
   /*
     Set the clear function so that it gets called during the next update.
     We use this specific form of setting it because if we just pass
     the function like setClearFunction(clear), clearFunction will be assigned undefined.
    */
   return clear;
 });
}, [item]);
`}
      />
      <blockquote>
        <p>
          The genVirtualTree function is not part of the library and serves as
          an example here; here is its code.
        </p>
      </blockquote>
      <Collapse
        size="small"
        items={[
          {
            key: "code",
            label: "genVirtualTree",
            children: (
              <Highlight
                language="typescript"
                code={`interface ItemData {
  id: number;
  data: string;
}

interface Item {
  id: string;
  data: ItemData;
  children: Item[];
}

const genTreeData = () => {
  const root: Item = { id: "root", children: [], data: { id: Math.random(), data: new Date().toDateString() } };
  for (let i = 0; i < 10; i++) {
    const item: Item = { id: \`\${i}\`, children: [], data: { id: Math.random(), data: new Date().toDateString() } };

    for (let j = 0; j < 10; j++) {
      const itemChild: Item = {
        id: \`\${i}-\${j}\`,
        children: [],
        data: { id: Math.random(), data: new Date().toDateString() },
      };

      for (let k = 0; k < 10; k++) {
          const itemChildChild: Item = {
            id: \`\${i}-\${j}-\${k}\`,
            children: [],
            data: { id: Math.random(), data: new Date().toDateString() },
          };

          itemChild.children.push(itemChildChild);
      }

      item.children.push(itemChild);
    }

    root.children.push(item);
  }

  return root;
};

const getFirstLayer = (items: Item[]) => {
  return items.map((item) => {
    const listItem = new ListItem(item.id);
    const layer = new Layer(listItem);
    let clearFunctions: Array<() => void> = [];

    const secondLayer = getSecondLayer(item.children);
    clearFunctions.push(listItem.addChildren(secondLayer.map(({ listItem }) => listItem)));
    clearFunctions.push(layer.addChildren(secondLayer.map(({ layer }) => layer)));
    secondLayer.forEach(({ clearFunction }) => {
      clearFunctions.push(clearFunction);
    });

    return {
      listItem,
      layer,
      clearFunctions,
    };
  });
};

const getSecondLayer = (items: Item[]) => {
  return items.map((item) => {
    const listItem = new ListItem(item.id);
    const layer = new Layer(listItem);
    let clearFunctions: Array<() => void> = [];

    const thirdLayer = getThirdLayer(item.children);

    clearFunctions.push(listItem.addChildren(thirdLayer.map(({ listItem }) => listItem)));
    clearFunctions.push(layer.addChildren(thirdLayer.map(({ layer }) => layer)));

    return {
      clearFunction: () => {
        clearFunctions.forEach((func) => func());
      },
      layer,
      listItem,
    };
  });
};

const getThirdLayer = (items: Item[]) => {
  return items.map((item) => {
    const listItem = new ListItem(item.id);
    const layer = new Layer(listItem);

    return { layer, listItem };
  });
};

const genVirtualTree = (
  listItem: ListItem,
  layer: Layer,
  ready: boolean,
  data: Item
): [{ listItem: ListItem; layer: Layer }, () => void] => {
  const clearFunctions: Array<() => void> = [];

  const newListItem = ready ? new ListItem(ROOT_ID) : listItem;
  const newLayer = ready ? new Layer(newListItem) : layer;

  const firstLayer = getFirstLayer(data.children);
  clearFunctions.push(newListItem.addChildren(firstLayer.map(({ listItem }) => listItem)));
  clearFunctions.push(newLayer.addChildren(firstLayer.map(({ layer }) => layer)));

  return [
    {
      listItem: newListItem,
      layer: newLayer,
    },
    () => {
      clearFunctions.forEach((callback) => callback());
    },
  ];
};`}
              />
            ),
          },
        ]}
      />
    </>
  );
};
