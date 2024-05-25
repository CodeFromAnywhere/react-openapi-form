/// <reference types="react" />
/**
 * Useful hook that allows you to have variables in a textarea or textinput.
 *
 * Currently is very niche for ${variables} and also has a predefined render.
 *
 * In the future, this can be more generalized and also just return the handler, not the rendering.
 *
 * NB: provide the type of element as generic!
 */
export declare const useSuggestions: <T extends HTMLInputElement | HTMLTextAreaElement>(context: {
    value: string;
    onChange: (v: string) => void;
    variableTags: string[] | undefined;
    isRootTemplateVariable?: boolean | undefined;
}) => {
    onChangeSuggestions: (e: import("react").ChangeEvent<T>) => void;
    renderTags: () => import("react/jsx-runtime").JSX.Element | null;
    textAreaRef: import("react").RefObject<T>;
};
//# sourceMappingURL=useSuggestions.d.ts.map