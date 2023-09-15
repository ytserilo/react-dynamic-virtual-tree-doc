import SimpleTreeSecond from "../../assets/home/simpleTree2.png";
import SimpleTree from "../../assets/home/simpleTree.png";
import Tree from "../../assets/home/tree.png";

export const Home = () => {
  return (
    <div>
      <h1>Introduction</h1>
      <h3>Installation</h3>
      <pre lang="no-highlight">
        <code>npm install react-virtual-tree</code>
      </pre>
      <p>
        This library is designed for displaying homogeneous tree-like
        structures, for example.
      </p>
      <h3>This tree will work:</h3>
      <img src={SimpleTree} alt="tree" />
      <h3>This won't:</h3>
      <img src={Tree} alt="tree" />
      <p>
        It's also worth noting that the default height for all elements on the
        same level should be the same.
      </p>
      <img src={SimpleTreeSecond} alt="tree" />
    </div>
  );
};
