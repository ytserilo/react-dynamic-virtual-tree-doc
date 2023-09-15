import React from "react";
import { Link } from "react-router-dom";
import { Highlight } from "../../../components/highlight";

export const LayerComponent = () => {
  return (
    <div>
      <h2 id="layerComponent" className="layoutTitle">
        LayerComponent
      </h2>
      <h3>Props</h3>
      <h4 id="layerComponent-layer">layer: </h4>
      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`layer: Layer`}
          />
        </code>
      </pre>
      <p>
        Type{" "}
        <Link to="#layer" reloadDocument>
          Layer
        </Link>
      </p>

      <h4 id="layerComponent-listItem">listItem: </h4>
      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`listItem: ListItem`}
          />
        </code>
      </pre>
      <p>
        Type{" "}
        <Link to="#listItem" reloadDocument>
          listItem
        </Link>
      </p>

      <h4 id="layerComponent-getComponentProps">getComponentProps: </h4>
      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`getComponentProps: <T>(index: number) => T | undefined`}
          />
        </code>
      </pre>
      <p>Used to retrieve data for the component.</p>

      <h4 id="layerComponent-children">children: </h4>
      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`children: React.FC<LayerChildrenComponentProps<T>>`}
          />
        </code>
      </pre>
      <Highlight
        language="typescript"
        code={`interface LayerChildrenComponentProps<T> {
  layer: Layer;
  listItem: ListItem;
  sample: boolean;
  onInitHeight: (height: number) => void;
  props?: T;
}`}
      />
      <p>
        It's worth noting that children accepts a component function rather than
        ReactNode.
      </p>
      <p>Here's an example of using LayerComponent:</p>
      <blockquote>
        <p>
          You should not use it in your project code; this fragment is for
          informational purposes only.
        </p>
      </blockquote>
      <Highlight
        language="typescript"
        code={`interface InnerComponentProps {
  value: string;
}

const InnerComponent = ({ props }: LayerChildrenComponentProps<InnerComponentProps>) => {
  return <h1>{props?.value}</h1>;
};

/*
 The Test component is not a root component because it has the listItem and layer props.
 The 'unknown' type is used here as a generic; you can pass the type you want here.
*/
const Test = ({ listItem, layer }: LayerChildrenComponentProps<unknown>) => {
  const getComponentProps = (index: number) => {
    /*
      The index represents the index of the element in the array.
    */
    return { value: "Hello world" + index };
  };
  /* The generic <InnerComponentProps> determines the type for the "props" of InnerComponent */
  return (
    <LayerComponent<InnerComponentProps> getComponentProps={getComponentProps} layer={layer} listItem={listItem}>
      {({ ...props }) => <InnerComponent {...props} />}
    </LayerComponent>
  );
};`}
      />
    </div>
  );
};
