import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getDefaultRegistry } from "@rjsf/core";
/** Enhances it to support columns */
export const ObjectFieldTemplate = (props) => {
    if (!props.formContext.columnsAmount ||
        props.schema?.["ui:widget"] !== "columns") {
        const Default = getDefaultRegistry().templates.ObjectFieldTemplate;
        return _jsx(Default, { ...props });
    }
    const visibleProperties = props.properties.filter((element) => !element.hidden);
    const itemsPerColumn = Math.ceil(visibleProperties.length / props.formContext.columnsAmount);
    const chunks = new Array(props.formContext.columnsAmount)
        .fill(null)
        .map((_, index) => {
        const start = 0 + index * itemsPerColumn;
        return visibleProperties.slice(start, start + itemsPerColumn);
    });
    const colStyle = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
    }[props.formContext.columnsAmount];
    return (_jsxs("div", { className: `grid ${colStyle} gap-12`, children: [props.title, props.description, chunks.map((chunk, i) => {
                return (_jsx("div", { children: chunk.map((element, j) => {
                        return _jsx("div", { children: element.content }, `col${i}el${j}`);
                    }) }, `col${i}`));
            })] }));
};
//# sourceMappingURL=ObjectFieldTemplate.js.map