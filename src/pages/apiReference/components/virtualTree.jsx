import React from "react";
import { Link } from "react-router-dom";
import { Highlight } from "../../../components/highlight";

export const VirtualTree = () => {
  return (
    <div>
      <h2 id="virtualTree" className="layoutTitle">
        VirtualTree
      </h2>
      <h3>Methods</h3>
      <h4 id="virtualTree-getTotalHeight">getTotalHeight</h4>
      <pre lang="no-highlight">
        <code>getTotalHeight: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`() => number`}
          />
        </code>
      </pre>
      <p>
        Method that returns the total height of the content, including the sum
        of all child and root listItem nodes.
      </p>

      <h4 id="virtualTree-getSlice">getSlice</h4>
      <pre lang="no-highlight">
        <code>getSlice: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(start: number, end: number) => [
    number,
    number,
    {
        item: ListItem, // Only low-level listItem layers go here.
        top: number, // Global top value in px
        compare: (listItem: ListItem) => boolean /*
            Function that checks whether to display the listItem passed as an argument to the function,
            it also checks all ancestors of the listItem because if a child element needs to be displayed,
            it means that the parent should also be displayed.
        */
     }[]
]`}
          />
        </code>
      </pre>
      <p>Used to retrieve elements needed for rendering.</p>

      <h4 id="virtualTree-update">update</h4>
      <pre lang="no-highlight">
        <code>update: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(rootListItem: ListItem, id?: string) => void`}
          />
        </code>
      </pre>
      <p>
        Invokes the tree, recalculates totalHeight, and sends notifications for
        tree updates.
      </p>
      <blockquote>
        <p>
          The "id" parameter is needed so that when you subscribe to updates
          using the{" "}
          <Link to="#virtualTree-onUpdate" reloadDocument>
            onUpdate
          </Link>{" "}
          method, you will receive this same "id" as the second parameter in the
          callback.
        </p>
      </blockquote>

      <h4 id="virtualTree-onUpdate">onUpdate</h4>
      <pre lang="no-highlight">
        <code>onUpdate: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(callback: (id?: string) => void) => () => void`}
          />
        </code>
      </pre>
      <p>
        Takes a callback and returns a cleanup function to remove this onUpdate
        event listener.
      </p>

      <h4 id="virtualTree-pushOffset">pushOffset</h4>
      <pre lang="no-highlight">
        <code>pushOffset: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(offset: [number, number]) => void`}
          />
        </code>
      </pre>
      <p>
        Used to notify that the range of the slice to be displayed has changed.
        (It sends an event to all listeners who subscribed to it using the{" "}
        <Link to="#virtualTree-onOffset" reloadDocument>
          onOffset
        </Link>{" "}
        method.)
      </p>

      <h4 id="virtualTree-onOffset">onOffset</h4>
      <pre lang="no-highlight">
        <code>onOffset: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(callback: (offset: [number, number]) => void) => void`}
          />
        </code>
      </pre>
      <p>Returns a cleanup function to remove this listener.</p>

      <h4 id="virtualTree-getOffset">getOffset</h4>
      <pre lang="no-highlight">
        <code>getOffset: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(callback: (offset: [number, number]) => void) => void`}
          />
        </code>
      </pre>
      <p>
        Function to obtain the [start, end] range, taking the following
        arguments:
      </p>
      <Highlight
        language="typescript"
        code={`(scrollTop: number, height: number, overScan: number = 0)`}
      />
      <p>
        <strong>scrollTop</strong> is the scrollTop value of the element with
        the class ".virtualListContainer," from the{" "}
        <Link to="#wrapper">Wrapper</Link> component.
      </p>
      <p>
        <strong>height</strong> is the height of the container in which content
        needs to be displayed, not to be confused with the content's height.
      </p>
      <p>
        <strong>overscan</strong> is an optional numerical value that indicates
        how many items should be displayed in addition to those already included
        in the offset, i.e., it looks like this [start - overscan, end +
        overscan].
      </p>
    </div>
  );
};
