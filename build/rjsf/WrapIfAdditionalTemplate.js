import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "@chakra-ui/react";
import { getDefaultRegistry } from "@rjsf/core";
import { ADDITIONAL_PROPERTY_FLAG, } from "@rjsf/utils";
/**
 * Used example: https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/custom-templates/#wrapifadditionaltemplate
 */
export const WrapIfAdditionalTemplate = (props) => {
    const renderDefault = false;
    if (renderDefault) {
        const Default = getDefaultRegistry().templates.WrapIfAdditionalTemplate;
        return _jsx(Default, { ...props });
    }
    const { id, label, onKeyChange, onDropPropertyClick, schema, children, uiSchema, registry, classNames, style, } = props;
    const { RemoveButton } = registry.templates.ButtonTemplates;
    const additional = ADDITIONAL_PROPERTY_FLAG in schema;
    if (!additional) {
        return _jsx("div", { children: children });
    }
    return (_jsxs("div", { className: `${classNames} flex flex-row items-end gap-4  dark:text-white`, style: style, children: [_jsxs("div", { className: "pb-1", children: [_jsx("div", { className: "pb-2 text-sm font-bold", children: _jsx("label", { htmlFor: `${id}-key`, children: "Key" }) }), _jsx(Input, { type: "text", id: `${id}-key`, onBlur: (event) => {
                            onKeyChange(event.target.value);
                        }, defaultValue: label })] }), _jsx("div", { className: "w-full", children: children }), _jsx("div", { className: "pb-1", children: _jsx(RemoveButton, { registry: registry, onClick: onDropPropertyClick(label), uiSchema: uiSchema }) })] }));
};
//# sourceMappingURL=WrapIfAdditionalTemplate.js.map