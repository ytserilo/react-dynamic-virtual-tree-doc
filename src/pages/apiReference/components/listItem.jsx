import React from "react";
import { Link } from "react-router-dom";
import { Highlight } from "../../../components/highlight";

export const ListItem = () => {
  return (
    <div>
      <h2 id="listItem" className="layoutTitle">
        ListItem
      </h2>
      <h3>Constructor</h3>
      <pre lang="no-highlight">
        <code>constructor </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(id: string, initialHeight?: number)`}
          />
        </code>
      </pre>
      <blockquote>
        <p>
          It's worth noting that for the root listItem, it's preferable to use
          ROOT_ID from:
        </p>
      </blockquote>
      <Highlight
        language="typescript"
        code={`import { ROOT_ID } from "./components/virtualTreeComponent/virtualTreeContext";`}
      />
      <h3>Attributes</h3>
      <pre lang="no-highlight">
        <code>id: </code>
        <code>
          <Highlight minimum={true} language="typescript" code={`string`} />
        </code>
      </pre>
      <p>The id of the listItem object.</p>
      <pre lang="no-highlight" id="currentHeight">
        <code>currentHeight: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`number | undefined`}
          />
        </code>
      </pre>
      <p>
        The current height of the layer, which can be changed using the{" "}
        <Link to="#editHeight" reloadDocument>
          editHeight
        </Link>{" "}
        method.
      </p>
      <pre lang="no-highlight" id="defaultHeight">
        <code>defaultHeight: </code>
        <code>
          <Highlight minimum={true} language="typescript" code={`number`} />
        </code>
      </pre>
      <p>
        The default height, which can only be changed along with{" "}
        <Link to="#currentHeight" reloadDocument>
          currentHeight
        </Link>{" "}
        using the{" "}
        <Link to="#height" reloadDocument>
          height
        </Link>{" "}
        setter.
      </p>
      <pre lang="no-highlight">
        <code>children: </code>
        <code>
          <Highlight minimum={true} language="typescript" code={`ListItem[]`} />
        </code>
      </pre>
      <p>The child listItem objects.</p>
      <pre lang="no-highlight">
        <code>parent: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`ListItem | undefined`}
          />
        </code>
      </pre>
      <p>
        The parent listItem object can only be undefined for the root listItem.
      </p>
      <h3>Methods</h3>
      <h4>addChildren</h4>
      <pre lang="no-highlight">
        <code>addChildren: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(children: ListItem[], ready?: () => void) => () => void`}
          />
        </code>
      </pre>
      <p>
        The callback ready is optional and is only called when all child
        listItem elements have been initialized.
      </p>
      <p>
        It returns a "clean" function; when called, it removes all child
        elements along with their listeners.
      </p>
      <blockquote>
        <p>
          Unlike{" "}
          <Link to="#layer" reloadDocument>
            Layer
          </Link>
          , the{" "}
          <Link to="#listItem" reloadDocument>
            ListItem
          </Link>{" "}
          does not have the{" "}
          <Link to="#addChild" reloadDocument>
            addChild
          </Link>{" "}
          method because it contains additional logic required for initializing
          the virtual tree.
        </p>
      </blockquote>
      <h4 id="onUpdateHeight">onUpdateHeight</h4>
      <pre lang="no-highlight">
        <code>onUpdateHeight: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(callback: (height: number) => void) => () => void`}
          />
        </code>
      </pre>
      <p>
        It returns a cleanup function that must be called to remove the event
        listener.
      </p>
      <h4 id="editHeight">editHeight</h4>
      <pre lang="no-highlight">
        <code>editHeight: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(height: number) => void`}
          />
        </code>
      </pre>
      <p>
        Sets the{" "}
        <Link to="#currentHeight" reloadDocument>
          currentHeight
        </Link>{" "}
        while leaving the{" "}
        <Link to="#defaultHeight" reloadDocument>
          defaultHeight
        </Link>{" "}
        unchanged.
      </p>
      <p>
        It also dispatches an event to all those subscribed to height updates
        through the{" "}
        <Link to="#onUpdateHeight" reloadDocument>
          onUpdateHeight
        </Link>{" "}
        method.
      </p>
      <h4 id="memorizeState">memorizeState</h4>
      <pre>
        <code>memorizeState: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(state: T) => void`}
          />
        </code>
      </pre>
      <p>Used to memorize the component's state for reuse.</p>
      <h4 id="getMemorizedState">getMemorizedState</h4>
      <pre lang="no-highlight">
        <code>getMemorizedState: </code>
        <code>
          <Highlight minimum={true} language="typescript" code="<T>() => T" />
        </code>
      </pre>
      <p>Used to retrieve the stored state.</p>
      <h4 id="height">getter, setter height</h4>
      <pre lang="no-highlight">
        <code>getter, setter “height”: </code>
        <code>
          <Highlight minimum={true} language="typescript" code="number" />
        </code>
      </pre>
      <p>
        Sets the default and current height. The getter returns the total height
        along with the sum of the heights of all child elements.
      </p>
      <h4 id="getAbsoluteTop">getAbsoluteTop</h4>
      <pre lang="no-highlight">
        <code>getAbsoluteTop: </code>
        <code>
          <Highlight minimum={true} language="typescript" code="() => number" />
        </code>
      </pre>
      <p>
        Returns the absolute top value for positioning the list item element
        correctly, and it returns a relative value from the parent listItem
        element.
      </p>
      <h4 id="getListItemHeightTree">getListItemHeightTree</h4>
      <Highlight
        language="typescript"
        code={`interface ListItemHeightTree {
  id: string;
  height: number;
  children: Record<string, ListItemHeightTree>;
}`}
      />
      <pre lang="no-highlight">
        <code>getListItemHeightTree: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code="() => ListItemHeightTree"
          />
        </code>
      </pre>
      <p>
        Returns a ListItemHeightTree structure in which height values for each
        child node are stored.
      </p>
      <h4 id="setListItemHeightTree">setListItemHeightTree</h4>
      <pre lang="no-highlight">
        <code>setListItemHeightTree: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code="(rootTree: ListItemHeightTree) => void"
          />
        </code>
      </pre>
      <p>
        The argument rootTree applies the stored height values to all child
        nodes.
      </p>
      <h4 id="setChildrenHeight">setChildrenHeight</h4>
      <pre lang="no-highlight">
        <code>setChildrenHeight: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code="(height: number, depth?: number) => void"
          />
        </code>
      </pre>
      <p>
        If you don't pass the depth argument, the height value passed in the
        height argument will be set by default to all child layers. If you
        specify a value for the depth argument, the height values will be set at
        the specified depth.
      </p>
      <blockquote>
        <p>
          For a more detailed and understandable description of these methods,
          you can read the <Link to="/tutorial">tutorial</Link>.
        </p>
      </blockquote>
    </div>
  );
};
