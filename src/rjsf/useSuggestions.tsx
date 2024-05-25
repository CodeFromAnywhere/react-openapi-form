import { useState, useRef } from "react";
import { getContext } from "./getContext";

/**
 * Useful hook that allows you to have variables in a textarea or textinput.
 *
 * Currently is very niche for ${variables} and also has a predefined render.
 *
 * In the future, this can be more generalized and also just return the handler, not the rendering.
 *
 * NB: provide the type of element as generic!
 */
export const useSuggestions = <
  T extends HTMLTextAreaElement | HTMLInputElement,
>(context: {
  value: string;
  onChange: (v: string) => void;
  variableTags: string[] | undefined;
  isRootTemplateVariable?: boolean;
}) => {
  const { onChange, value, variableTags, isRootTemplateVariable } = context;
  const textAreaRef = useRef<T>(null);

  const [suggestions, setSuggestions] = useState<null | {
    suggestions: string[];
    wordAtPosition: string;
    positionIndex: number;
  }>(null);

  const onChangeSuggestions = (e: React.ChangeEvent<T>) => {
    if (!variableTags) {
      return;
    }

    const newText = e.target.value;
    const positionIndex = e.target.selectionStart;

    console.log({ positionIndex });
    if (positionIndex === null) {
      return;
    }

    const { wordAtPosition } = getContext({
      text: newText,
      positionIndex,
    });

    const isVariableWritten = isRootTemplateVariable
      ? true
      : wordAtPosition.startsWith("$");

    const variableAtPosition = isRootTemplateVariable
      ? wordAtPosition
      : wordAtPosition.slice(2);

    if (isVariableWritten) {
      const suggestions = variableTags.filter((tag) =>
        tag.toLowerCase().includes(variableAtPosition.toLowerCase()),
      );
      setSuggestions({ positionIndex, wordAtPosition, suggestions });
    } else {
      setSuggestions(null);
    }
  };

  const renderTags = () => {
    return variableTags && suggestions && suggestions.suggestions.length > 0 ? (
      <div className="flex flex-row flex-wrap">
        {suggestions.suggestions.map((variable) => (
          <div
            className="border m-1 cursor-pointer border-black p-1 dark:!border-white rounded-sm"
            key={`var-${variable}`}
            onClick={(e) => {
              const before = value.slice(
                0,
                suggestions.positionIndex - suggestions.wordAtPosition.length,
              );

              const after = value.slice(suggestions.positionIndex);

              const newText = isRootTemplateVariable
                ? variable
                : before + "${" + variable + "}" + after;

              onChange(newText);
              setSuggestions(null);

              if (!textAreaRef.current) {
                return;
              }

              textAreaRef.current.focus();

              setTimeout(() => {
                if (!textAreaRef.current) {
                  return;
                }
                const newSelectionIndex =
                  suggestions.positionIndex -
                  suggestions.wordAtPosition.length +
                  variable.length +
                  3;

                textAreaRef.current.selectionEnd = newSelectionIndex;
              }, 10);
            }}
          >
            <span>{variable}</span>
          </div>
        ))}
      </div>
    ) : null;
  };

  return { onChangeSuggestions, renderTags, textAreaRef };
};
