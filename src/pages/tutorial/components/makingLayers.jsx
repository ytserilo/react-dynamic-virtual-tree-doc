import React from "react";
import { Highlight } from "../../../components/highlight";

export const MakingLayers = () => {
  return (
    <>
      <h2 id="makingLayers" className="layoutTitle">
        Creating Layers
      </h2>
      <p>
        Next, we move on to the stage where we will start describing layers
        directly.
      </p>
      <p>
        In the previous section, you could see that the LayerComponent wraps
        another component, FirstLayer. Now we will look at its code with
        comments.
      </p>
      <blockquote>
        <p>
          The mandatory steps to make the component display correctly are to
          initialize the component's height and indicate in the layout whether
          the layer contains child layers.
        </p>
      </blockquote>
      <Highlight
        language="typescript"
        code={`export const FirstLayer = ({
 onInitHeight, // a function that should be called when sample === true
 layer, // the current layer
 listItem, // the current listItem
 sample,
 /*
   sample can be true or false -> if sample === true, you should create a component
   that will serve as a reference for all others at the same nesting level
  */
 props,
}: LayerChildrenComponentProps<LayerProps>) => {
 const { item } = props as LayerProps;
 /*
   The data you passed to the getComponentProps function in the parent component is stored in props.
 */
 const ref = useRef<HTMLDivElement>(null);

 useEffect(() => {
   if (!ref.current) {
     return;
   }

   onInitHeight(ref.current.getBoundingClientRect().height);
 }, [ref.current]);
 /*
   In this case, we obtain the height as follows.
   We pass the ref to sample, and then get the height of the element when
   the HTML element itself appears in the layout.

   You can use any convenient method for you; the important thing is that
   you pass a number as an argument to the onInitHeight function.
  */

 const getComponentProps = (index: number): LayerProps | undefined => {
   const children = item.children;
   if (!children[index]) {
     return;
   }
   return {
     item: children[index],
   };
 };

 return (
   <div style={{ position: "absolute", top: listItem.getAbsoluteTop(), width: "100%" }}>
     {
       /*
       Very important code.
       The library uses absolute positioning relative to the parent component,
       so it's extremely important to have such containers.
       To correctly set the value, use the getAbsoluteTop method.
       */
     }
     {sample && (
       <div ref={ref}>
         <p>{item.data.data.toString()}</p>
         <p>{item.data.id}</p>
       </div>
     )}
     {
       /*
       In this case, we use this approach to obtain the height of the HTML element.
       You can avoid duplicating the layout and simply create a condition in useEffect:
       if(sample)
         onInitHeight(ref.current.getBoundingClientRect())
      */
     }

     <div>
       <p>{item.data.data.toString()}</p>
       <p>{item.data.id}</p>
     </div>
     <div style={{ position: "relative" }}>
       <LayerComponent<LayerProps | undefined> getComponentProps={getComponentProps} listItem={listItem} layer={layer}>
         {({ ...props }) => <SecondLayer {...props} />}
       </LayerComponent>
       {
         /*
         Forming layers is the same for any nesting level.
         */
       }
     </div>
     {
       /*
       Pay attention to how "position: relative" is used here.
       As we mentioned earlier, child layers are positioned relative to their parent,
       so it's important to specify "position: relative" for correct positioning of child elements.
      */
     }
   </div>
 );
};
`}
      />
      <blockquote>
        <p>
          The only thing to note is that you cannot use LayerComponent in the
          last layer that does not have child layers, but all other principles
          remain the same.
        </p>
      </blockquote>
    </>
  );
};
