import React from "react";
import { Collapse } from "antd";
import { Highlight } from "../../../components/highlight";
import { VirtualTreeSimpleHeightChanging } from "../../../examples/virtualTreeSimpleHeightChanging";

export const ChangeItemSize = () => {
  return (
    <>
      <h2 id="changeItemSize" className="layoutTitle">
        Changing Item Size
      </h2>
      <p>
        In this example, we will use ResizeObserver to detect changes in the
        size of a block and subsequently update the component's height.
      </p>
      <p>
        You can read more about ResizeObserver{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver"
          target="_blank"
        >
          here
        </a>
        .
      </p>
      <Highlight
        language="typescript"
        code={`export const ThirdLayer = ({ onInitHeight, listItem, sample, props }: LayerChildrenComponentProps<LayerProps>) => {
 const { listItem: rootListItem, root } = useContext(VirtualTreeContext);
 /*
   Here, we obtain the root listItem and virtualTree objects, which will be needed to update the component's height.
  */
 const [open, setOpen] = useState<boolean>(listItem.getMemorizedState<boolean>() || false);
 /* We will discuss memorized state later in the section about memorized state. */
 const { item } = props as LayerProps;
 const ref = useRef<HTMLDivElement>(null);
 const contentRef = useRef<HTMLDivElement>(null);
 // ref through which we will access the necessary HTML element
 const editHeight = useRef<boolean>(false);

 useEffect(() => {
   if (!ref.current) {
     return;
   }

   onInitHeight(ref.current.getBoundingClientRect().height);
 }, [ref.current]);

 useEffect(() => {
   const block = contentRef.current;
   // Obtain a reference to the HTML element
   if (!block) {
     return;
   }

   const r = new ResizeObserver((elements) => {
     const newHeight = block.getBoundingClientRect().height;
     if (elements.length > 0 && listItem.currentHeight !== newHeight) {
       if (editHeight.current) {
         editHeight.current = false;

         /*
         If the size of the element has changed, we update the height of our listItem object
         using the editHeight method of the listItem object.
          */
         listItem.editHeight(newHeight);
         root.update(rootListItem);
         /*
         When the height is changed, we need to update the virtual tree.
          */
       }
     }
   });

   r.observe(block);
   // Add the ResizeObserver listener
   return () => {
     r.unobserve(block);
   };
 }, [contentRef.current]);

 const toggleOpen = () => {
   editHeight.current = true;
   listItem.memorizeState<boolean>(!open);
   setOpen(!open);
 };

 return (
   <>
     {sample && (
       <div
         ref={ref}
         style={{
           position: "absolute",
           width: "100%",
           borderBottom: "1px solid red",
           padding: 4,
         }}
       >
         <div>
           <p>{item.data.data.toString()}</p>
           <p>{item.data.id}</p>
         </div>
       </div>
     )}

     <div
       onClick={toggleOpen}
       ref={contentRef}
       style={{
         position: "absolute",
         cursor: "pointer",
         top: listItem.getAbsoluteTop(),
         width: "100%",
         borderBottom: "1px solid red",
         padding: 4,
         marginLeft: 20,
       }}
     >
       <div>
         <p>{item.data.data.toString()}</p>
         <p>{item.data.id}</p>

         {open && <div style={{ height: 120 }}>Additional content</div>}
       </div>
     </div>
   </>
 );
};
`}
      />
      <Collapse
        size="small"
        items={[
          {
            key: "example",
            label: "Example",
            children: <VirtualTreeSimpleHeightChanging />,
          },
        ]}
      />
    </>
  );
};
