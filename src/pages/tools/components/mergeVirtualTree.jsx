import React from "react";
import { Link } from "react-router-dom";
import { Highlight } from "../../../components/highlight";

export const MergeVirtualTree = () => {
  return (
    <div>
      <h2 id="mergeVirtualTree" className="layoutTitle">
        mergeVirtualTree
      </h2>
      <blockquote>
        <p>
          This function should be used to update the state of your virtual tree
          while preserving the state of the previous tree.
        </p>
      </blockquote>
      <pre>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code="(prev: VirtualTreeState, next: VirtualTreeState, reInitTrigger: () => void) => void"
          />
          {"\n\n"}
          <Highlight
            minimum={true}
            language="typescript"
            code={`interface VirtualTreeState {
  layer: Layer;
  listItem: ListItem;
}`}
          />
        </code>
      </pre>
      <p>
        <strong>reInitTrigger</strong>: This function is called when it's
        necessary to completely reinitialize the virtual tree. It was designed
        to be used as a function that invokes the `reInit` function from the{" "}
        <Link to="/api-reference#virutalTreeContext" reloadDocument>
          VirtualTreeContext
        </Link>{" "}
        context.
      </p>
      <blockquote>
        <p>Example of using the `mergeVirtualTree` function:</p>
      </blockquote>
      <Highlight
        language="typescript"
        code={`/*
In this example, many crucial parts are missing,
which are necessary for the correct functioning of the library.
To see the proper usage, refer to QuickStart here.
*/

const RootComponent = ({ collectors }: { collectors: VirtualTreeCollectors }) => {
  const {
    root,
    setReady: setVirtualTreeReady,
    layer,
    listItem,
    setLayer,
    setListItem,
    reInit,
  } = useContext(VirtualTreeContext);

  useEffect(() => {
    /*
    See more details in the quick Start.
     */
    return listItem.onChildrenReady(() => {
      listItem.height = 0;
      root.update(listItem);
      root.ready();
      setVirtualTreeReady(true);
    });
  }, []);

  useEffect(() => {
    /*
    The genTree function is not part of the library; you have to implement it yourself.
    It's used here just for the sake of example.
     */

    const [{ listItem: newListItem, layer: newLayer }, clear] = genTree(rootListItem, rootLayer, collectors);

    const { listItem: mergedListItem, layer: mergedLayer } = mergeVirtualTree(
      { listItem, layer }, // Previous root listItem, layer
      { listItem: newListItem, layer: newLayer }, // New root listItem, layer
      () => {
        /*
          Called only when the structure of the new tree significantly differs from the previous one.
          For instance, if the nesting level of the previous tree is 3 and the new tree is 4 or more.
          If the nesting level is smaller, reInit callback is not invoked.
          Changing the tree structure is highly discouraged, as the functionality ensuring stable operation
          has not been developed in this case.
        */
        reInit(newListItem, newLayer);
      }
    );
    setListItem(mergedListItem);
    setLayer(mergedLayer);
    root.update(mergedListItem, "root-update");
  }, [collectors]);

  /*
  To learn more about this LayerComponent (see here).
   */
  const getComponentProps = (index: number): LeagueCollectorProps | undefined => {
    if (!collectors[index]) {
      return;
    }
    return collectors[index];
  };

  return (
    <div style={{ position: "relative" }}>
      <LayerComponent<LeagueCollectorProps | undefined>
        getComponentProps={getComponentProps}
        layer={layer}
        listItem={listItem}
      >
        {({ ...props }) => <InnerCollector {...props} />}
      </LayerComponent>
    </div>
  );
};`}
      />
    </div>
  );
};
