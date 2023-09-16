import React from "react";
import { Collapse } from "antd";
import { Highlight } from "../../../components/highlight";
import { VirtualTreeChildrenHeightChanging } from "../../../examples/virtualTreeChildrenHeightChanging";

export const ChangeChildrenSize = () => {
  return (
    <>
      <h2 id="changeChildrenSize" className="layoutTitle">
        Change Children Size
      </h2>
      <p>
        Dealing with the last element that doesn't have child layers is
        straightforward. However, when working with layers that have child
        layers, the library provides additional methods for the listItem object.
      </p>
      <p>
        Now, let's add the ability to change the height of child layers. We will
        make some modifications to the ThirdLayer component by adding an onClick
        listener:
      </p>
      <Highlight
        language="typescript"
        code={`<div onClick={toggleOpen}>
 <p>{item.data.data.toString()}</p>
 <p>{item.data.id}</p>
</div>
`}
      />
      <p>Also, let's add the toggleOpen function:</p>
      <Highlight
        language="typescript"
        code={`const toggleOpen = () => {
 const newOpen = !open;

 setOpen(newOpen);

 if (newOpen) {
   const tree = listItem.getMemorizedState<ListItemHeightTree>();
   /*
   Retrieve the saved values
    */
   if (!tree) {
     return;
   }

   listItem.setListItemHeightTree(tree);
   /*
     The setListItemHeightTree method sets the values of the generated tree to child nodes
     specified in this tree.
    */
   root.update(rootListItem);
   /*
     Update the virtual tree as shown in the ThirdLayer example
    */
 } else {
   const tree = listItem.genListItemHeightTree();
   /*
     The genListItemHeightTree method generates a structure that stores all current
     child node height values starting from the current node.
    */
   listItem.memorizeState<ListItemHeightTree>(tree);
   /* Memorize the values - see the memorized state section later */
   listItem.setChildrenHeight(0);
   /*
     The setChildrenHeight method has two arguments (height: number, depth?: number).
     If you don't provide the depth argument, by default, all child layers will have the height value
     passed in the height argument.

     If you specify a value for the depth argument, the height values will be set
     at the specified depth.
    */

   root.update(rootListItem);
   /*
     Update the virtual tree as shown in the ThirdLayer example
    */
 }
};`}
      />
      <Collapse
        size="small"
        items={[
          {
            key: "example",
            label: "Example",
            children: <VirtualTreeChildrenHeightChanging />,
          },
        ]}
      />
    </>
  );
};
