import hljs from "highlight.js";

export const Highlight = ({ code, language, minimum = false }) => {
  const Wrapper = !minimum
    ? ({ children }) => <pre>{children}</pre>
    : ({ children }) => <>{children}</>;

  return (
    <Wrapper>
      <span
        dangerouslySetInnerHTML={{
          __html: hljs.highlight(code, { language }).value,
        }}
      />
    </Wrapper>
  );
};
