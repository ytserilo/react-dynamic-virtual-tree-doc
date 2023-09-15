import React from "react";
import { Link } from "react-router-dom";
import { Highlight } from "../../../components/highlight";

export const VirtualTreeContext = () => {
  return (
    <div>
      <h2 id="virtualTreeContext" className="layoutTitle">
        VirtualTreeContext
      </h2>
      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`root: VirtualTree`}
          />
        </code>
      </pre>
      <p>
        Has a type of{" "}
        <Link reloadDocument to="#virtualTree">
          VirtualTree
        </Link>
      </p>

      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`offset: [number, number] // [startIndex, endIndex]`}
          />
        </code>
      </pre>

      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`listItem: ListItem // This is the root ListItem`}
          />
          <code>
            {" "}
            <Link to="#listItem" reloadDocument>
              ListItem
            </Link>
          </code>
        </code>
      </pre>

      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`layer: Layer // This is the root Layer`}
          />
          <code>
            {" "}
            <Link to="#layer" reloadDocument>
              Layer
            </Link>
          </code>
        </code>
      </pre>

      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`setListItem: (listItem: ListItem) => void`}
          />
        </code>
      </pre>
      <p>
        To set a new ListItem, you also need to set the{" "}
        <Link to="#layer" reloadDocument>
          Layer
        </Link>
        .
      </p>

      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`setLayer: (layer: Layer) => void`}
          />
        </code>
      </pre>
      <p>
        To set a new root Layer, you also need to set the Layer of the{" "}
        <Link to="#listItem" reloadDocument>
          ListItem
        </Link>
        .
      </p>
      <blockquote>
        <p>
          Note: `setListItem` and `setLayer` are used together and are necessary
          to update the tree state without reinitializing it. They also help
          preserve the previous state of the tree with its last height values
          for each ListItem element.
        </p>
      </blockquote>

      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`reInit: (listItem: ListItem, layer: Layer) => void`}
          />
        </code>
      </pre>
      <p>
        This function is used for complete reinitialization of the virtual tree.
      </p>
      <p>
        The `reInit` function differs from `setListItem` and `setLayer` in that
        it is used for a full reinitialization of the tree. This means that the
        previous state saved through{" "}
        <Link to="listItem-memorizeState" reloadDocument>
          memorizeState
        </Link>{" "}
        will not be preserved, and all heights for ListItems will be cleared and
        rewritten.
      </p>
    </div>
  );
};
