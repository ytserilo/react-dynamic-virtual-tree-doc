import React from "react";
import { Collapse } from "antd";
import { Link } from "react-router-dom";
import { Highlight } from "../../../components/highlight";
import { SimpleVirtualTreeEditableStructure } from "../../../examples/simpleVirtualTreeEditableStructure";

export const UpdateTreeStructure = () => {
  return (
    <>
      <h2 id="updateTreeStructure" className="layoutTitle">
        Updating Tree Structure
      </h2>
      <p>
        To update the structure and data within it, you simply need to pass new
        data, as shown in this example.
      </p>
      <Highlight
        language="typescript"
        code={`const App = () => {
 const [treeData, setTreeData] = useState<Item>(genTreeData());

 const generateNewTreeData = () => {
   setTreeData(genTreeData());
 };

 return (
   <div>
     <VirtualTreeProvider height={500}>
       <VirtualTreeIndex item={treeData} />
     </VirtualTreeProvider>
     <button onClick={generateNewTreeData}>regenerate</button>
   </div>
 );
};
`}
      />
      <p>
        Our useEffect in the{" "}
        <Link to="#virtualTreeIndex" reloadDocument>
          VirtualTreeIndex
        </Link>{" "}
        component, which we discussed earlier, will handle the rest of the work
        for us.
      </p>
      <Collapse
        size="small"
        items={[
          {
            key: "example",
            label: "Example",
            children: <SimpleVirtualTreeEditableStructure />,
          },
        ]}
      />
    </>
  );
};
