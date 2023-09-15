import { Link } from "react-router-dom";
import { Highlight } from "../../../components/highlight";

export const Wrapper = () => {
  return (
    <div>
      <h2 id="wrapper" className="layoutTitle">
        Wrapper
      </h2>
      <p>
        This is a utility component used as a nested component for{" "}
        <Link to="#virtualTreeProvider" reloadDocument>
          VirtualTreeProvider
        </Link>
        . It manages the update of the list content height and updates the
        container height for displaying the content, similar to{" "}
        <Link to="#virtualTreeProvider" reloadDocument>
          VirtualTreeProvider
        </Link>
        .
      </p>
      <p>
        You can also create your custom Wrapper component. Here's an example of
        what the default Wrapper component looks like:
      </p>
      <Highlight
        language="typescript"
        code={`interface WrapperProps {
  children: ReactNode;
  virtualTree: VirtualTree;
  height: number;
  className?: string;
}`}
      />
      <Highlight
        language="typescript"
        code={`export const Wrapper = ({
  children,
  virtualTree,
  height: containerHeight,
  className,
  overScan = 20,
}: WrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // This is the content's height
  const [height, setHeight] = useState<number>(0);
  /*
     This is the container's height, useRef is used to avoid reinitialization.
     As the container's height may frequently change in some cases.
     If you plan to create your own Wrapper component and your height won't change, you can use useState.
  */
  const containerHeightRef = useRef<number>(containerHeight);

  const handler = useCallback(() => {
    const block = ref.current;
    if (!block) {
      return;
    }

    /*
      Here we notify the virtualTree that the user is scrolling the content,
      or the container's height has changed.
    */
    virtualTree.pushOffset(
      virtualTree.getOffset(
        block.scrollTop,
        containerHeightRef.current,
        overScan
      )
    );
  }, []);

  useEffect(() => {
    if (containerHeightRef.current !== containerHeight) {
      containerHeightRef.current = containerHeight;
      handler();
    }
  }, [containerHeight]);

  useEffect(() => {
    const block = ref.current;
    if (!block) {
      return;
    }

    /*
      Here ResizeObserver is used to track container's size changes.
      You can omit this in your Wrapper components if you don't need this functionality.
    */
    const resizeOb = new ResizeObserver(() => {
      containerHeightRef.current = block.getBoundingClientRect().height;
      handler();
    });

    resizeOb.observe(block);
    return () => {
      resizeOb.unobserve(block);
    };
  }, [ref.current]);

  useEffect(() => {
    const clearFunctions: Array<() => void> = [];

    const clear = virtualTree.onReady(() => {
      if (ref.current) {
        ref.current.addEventListener("scroll", handler);
        setHeight(virtualTree.getTotalHeight());
        handler();

        const clearOnUpdate = virtualTree.onUpdate(() => {
          /*
            onUpdate is called when you call the .update() function on the virtualTree object.
          */
          setHeight(virtualTree.getTotalHeight());
          handler();
        });

        clearFunctions.push(clearOnUpdate);
      }
    });

    clearFunctions.push(clear);
    handler();

    return () => {
      clearFunctions.forEach((clear) => clear());
      if (ref.current) {
        ref.current.removeEventListener("scroll", handler);
      }
    };
  }, []);

  /*
    The styles for the .virtualListContainer class look like this:
    {
      position: relative;
      overflow: auto;
      will-change: transform;
      direction: ltr;
      width: 100%;
    }
  */
  return (
    <div
      ref={ref}
      className={styles.virtualListContainer}
      style={{ height: containerHeight }}
    >
      <div style={{ height }} className={className}>
        {children}
      </div>
    </div>
  );
};`}
      />
    </div>
  );
};
