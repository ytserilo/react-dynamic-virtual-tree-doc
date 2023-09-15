import React from "react";
import { Link } from "react-router-dom";
import { Highlight } from "../../../components/highlight";

export const Layer = () => {
  return (
    <div>
      <h2 id="layer" className="layoutTitle">
        Layer
      </h2>
      <blockquote>
        <p>
          Layer is a utility object, and in typical applications, there is no
          need to use it directly.
        </p>
      </blockquote>

      <h3>Attributes</h3>
      <h4 id="layer-children">children</h4>
      <pre lang="no-highlight">
        <code>children: </code>
        <code>
          <Highlight minimum={true} language="typescript" code={`Layer[]`} />
        </code>
      </pre>
      <p>Child layers.</p>

      <h4 id="layer-listItem">listItem</h4>
      <pre lang="no-highlight">
        <code>listItem: </code>
        <code>
          <Highlight minimum={true} language="typescript" code={`ListItem`} />
        </code>
      </pre>
      <p>
        Attached{" "}
        <Link to="#listItem" reloadDocument>
          listItem
        </Link>{" "}
        to this layer; layer and listItem must be at the same nesting level.
      </p>

      <h4 id="layer-parent">parent</h4>
      <pre lang="no-highlight">
        <code>parent: </code>
        <code>
          <Highlight minimum={true} language="typescript" code={`Layer`} />
        </code>
      </pre>
      <p>
        Parent{" "}
        <Link to="#layer" reloadDocument>
          Layer
        </Link>
        .
      </p>

      <h3>Methods</h3>
      <h4 id="layer-addChildren">addChildren</h4>
      <pre lang="no-highlight">
        <code>addChildren: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(layers: Layer[]) => () => void`}
          />
        </code>
      </pre>
      <p>
        Adds child components to the current component and returns a clean
        function. When executed, it removes child components.
      </p>

      <h4 id="layer-addChild">addChild</h4>
      <pre lang="no-highlight">
        <code>addChild: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(child: Layer) => () => void`}
          />
        </code>
      </pre>
      <p>
        Usually used with the <Link to="#layer-addChildren">addChildren</Link>{" "}
        function. It's better to prefer the{" "}
        <Link to="#layer-addChildren">addChildren</Link> function, but if it's
        more convenient for you, you can use this one.
      </p>

      <h4 id="layer-getRoot">getRoot</h4>
      <pre lang="no-highlight">
        <code>getRoot: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`() => Layer`}
          />
        </code>
      </pre>
      <p>
        A method that returns the root{" "}
        <Link to="#layer" reloadDocument>
          layer
        </Link>
        .
      </p>

      <h4 id="layer-getLayersByLevel">getLayersByLevel</h4>
      <pre lang="no-highlight">
        <code>getLayersByLevel: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(level: number) => Layer[]`}
          />
        </code>
      </pre>
      <p>
        A method that returns layers at the specified level. For example, if the
        layer from which you call this function has level 5, and you pass
        level=2 as an argument to the function, you will get layers from level
        7. In other words, the global level will be 7, and the local level will
        be 2 relative to the layer from which you call the function. Typically
        used with rootLayer.
      </p>
    </div>
  );
};
