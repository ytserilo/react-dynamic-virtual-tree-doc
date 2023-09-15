import React from "react";
import { Highlight } from "../../../components/highlight";

export const MemorizeState = () => {
  return (
    <>
      <h2 id="memorizeState" className="layoutTitle">
        Memorize State
      </h2>
      <p>The `listItem` object has two methods:</p>
      <Highlight
        language="typescript"
        code={`getMemorizedState - <T>(state: T)
memorizeState - <T>() => T
`}
      />
      <blockquote>
        <p>
          It's clear why these methods are needed, but their specific
          problem-solving capability may not be immediately evident.
        </p>
      </blockquote>
      <p>
        The problem they solve is preserving the component's state after it has
        been unmounted.
      </p>
      <p>
        The library's working principle is to display only the components that
        fall within the user's viewport. This means that if a component goes out
        of the user's view, it will be removed from the DOM, and its state won't
        be preserved. That's where these methods come in handy.
      </p>
      <Highlight
        language="typescript"
        code={`export const ThirdLayer = ({ onInitHeight, listItem, sample, props }: LayerChildrenComponentProps<LayerProps>) => {
 const { listItem: rootListItem, root } = useContext(VirtualTreeContext);
 /*
   Here we obtain the root listItem and virtualTree objects,
   which will be needed for updating the component's height.
  */
 const [open, setOpen] = useState<boolean>(listItem.getMemorizedState<boolean>() || false);`}
      />
      <p>Here, we retrieve the memorized state.</p>
      <Highlight
        language="typescript"
        code={`const toggleOpen = () => {
 editHeight.current = true;
 listItem.memorizeState<boolean>(!open);
 setOpen(!open);
};`}
      />
    </>
  );
};
