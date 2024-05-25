import { jsx as _jsx } from "react/jsx-runtime";
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
export const useSuggestions = (context) => {
    const { onChange, value, variableTags, isRootTemplateVariable } = context;
    const textAreaRef = useRef(null);
    const [suggestions, setSuggestions] = useState(null);
    const onChangeSuggestions = (e) => {
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
            const suggestions = variableTags.filter((tag) => tag.toLowerCase().includes(variableAtPosition.toLowerCase()));
            setSuggestions({ positionIndex, wordAtPosition, suggestions });
        }
        else {
            setSuggestions(null);
        }
    };
    const renderTags = () => {
        return variableTags && suggestions && suggestions.suggestions.length > 0 ? (_jsx("div", { className: "flex flex-row flex-wrap", children: suggestions.suggestions.map((variable) => (_jsx("div", { className: "border m-1 cursor-pointer border-black p-1 dark:!border-white rounded-sm", onClick: (e) => {
                    const before = value.slice(0, suggestions.positionIndex - suggestions.wordAtPosition.length);
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
                        const newSelectionIndex = suggestions.positionIndex -
                            suggestions.wordAtPosition.length +
                            variable.length +
                            3;
                        textAreaRef.current.selectionEnd = newSelectionIndex;
                    }, 10);
                }, children: _jsx("span", { children: variable }) }, `var-${variable}`))) })) : null;
    };
    return { onChangeSuggestions, renderTags, textAreaRef };
};
//# sourceMappingURL=useSuggestions.js.map