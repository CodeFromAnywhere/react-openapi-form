"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { ChakraProvider } from "@chakra-ui/react";
import Form from "@rjsf/chakra-ui";
// import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
// relative
import { ObjectFieldTemplate } from "./ObjectFieldTemplate";
import { WrapIfAdditionalTemplate } from "./WrapIfAdditionalTemplate";
import { VariableTextWidget } from "./VariableTextWidget";
/** General purpose component with all my widgets and templates */
export const ReactJsonSchemaForm = (props) => {
    const { id, formData, onSubmit, isBooleanTextField, schema, onChange, variableJsonSchema, uiSchema, } = props;
    const widgets = {
    // NB: This replaces all text fields with my custom widget (see https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/custom-widgets-fields#customizing-the-default-fields-and-widgets)
    // TextWidget: VariableTextWidget,
    };
    if (isBooleanTextField) {
        // NB: turns all booleans into a text field
        widgets.CheckboxWidget = VariableTextWidget;
    }
    return (_jsx(ChakraProvider, { theme: {}, children: _jsx(Form, { id: id, 
            // liveOmit
            templates: {
                ObjectFieldTemplate,
                WrapIfAdditionalTemplate,
                // add variables support
            }, widgets: widgets, formContext: { columnsAmount: 2, variableJsonSchema }, formData: formData, transformErrors: (errors) => {
                return errors.filter((x) => x.name !== "type");
            }, onSubmit: onSubmit
                ? async (data, event) => {
                    if (data.errors.length > 0) {
                        console.log("ERRORRS");
                        return;
                    }
                    const { formData } = data;
                    onSubmit(formData);
                }
                : undefined, onChange: (data) => {
                const { formData } = data;
                onChange?.(formData);
            }, schema: schema, uiSchema: uiSchema, validator: validator, children: !!onChange ? _jsx("div", {}) : undefined }) }));
};
//# sourceMappingURL=ReactJsonSchemaForm.js.map