import { useDarkMode } from "@/hooks/use_dark_mode";
import { useEffect, useState, type ReactNode } from "react";
import { codeToHtml } from "shiki";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState, props: any) => ({
  themes: state.code.theme,
  props: props,
}));

interface CodeBlockProps {
  code: string;
  lang: string;
  themes: AppState["code"]["theme"];
}

const CodeBlock = connector((props: CodeBlockProps): ReactNode => {
  const [parsedHtml, setParsedHtml] = useState("");
  const darkMode = useDarkMode();
  const handleCodeParsing = async (
    code: string,
    lang: string,
    isDark: boolean,
    themes: typeof props.themes
  ): Promise<void> => {
    const html = await codeToHtml(code, {
      lang: lang,
      theme: isDark ? themes.dark : themes.light,
    });
    setParsedHtml(html);
  };
  useEffect(() => {
    handleCodeParsing(props.code, props.lang, darkMode, props.themes);
  }, [props.lang, props.code, darkMode, props.themes]);
  return (
    <div className="w-full overflow-x-auto">
      <div
        className="[&>pre]:p-3 [&>pre]:overflow-auto text-sm"
        dangerouslySetInnerHTML={{ __html: parsedHtml }}
      />
    </div>
  );
});

CodeBlock.displayName = "CodeBlock";

export default CodeBlock;
