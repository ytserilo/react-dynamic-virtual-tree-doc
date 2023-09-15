import React from "react";
import { Highlight } from "../../../components/highlight";

export const VirtualTreeProvider = () => {
  return (
    <div>
      <h2 id="virtualTreeProvider" className="layoutTitle">
        VirtualTreeProvider
      </h2>
      <blockquote>
        <p>
          This component should wrap the list components that need to be
          virtualized.
        </p>
      </blockquote>

      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`children: ReactNode // (required)`}
          />
        </code>
      </pre>

      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`height: number // Container height for displaying content (required)`}
          />
        </code>
      </pre>

      <pre lang="no-highlight">
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`className?: string // Applied to the Wrapper component, optional`}
          />
        </code>
      </pre>
    </div>
  );
};
