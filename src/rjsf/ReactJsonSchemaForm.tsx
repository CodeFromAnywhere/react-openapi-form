"use client";

import { ChakraProvider } from "@chakra-ui/react";
import Form from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv8";
import { RegistryWidgetsType } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";
// owned
import { O } from "from-anywhere";
// relative
import { ObjectFieldTemplate } from "./ObjectFieldTemplate";
import { WrapIfAdditionalTemplate } from "./WrapIfAdditionalTemplate";
import { VariableTextWidget } from "./VariableTextWidget";

/** General purpose component with all my widgets and templates */
export const ReactJsonSchemaForm = (props: {
  id?: string;
  formData?: O;
  isBooleanTextField?: boolean;
  variableJsonSchema?: JSONSchema7;
  onSubmit?: (formData?: O) => void;
  /** If given, will show no submit button */
  onChange?: (formData?: O) => void;
  schema: JSONSchema7;
}) => {
  const {
    id,
    formData,
    onSubmit,
    isBooleanTextField,
    schema,
    onChange,
    variableJsonSchema,
  } = props;

  const widgets: RegistryWidgetsType = {
    // NB: This replaces all text fields with my custom widget (see https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/custom-widgets-fields#customizing-the-default-fields-and-widgets)
    TextWidget: VariableTextWidget,
  };

  if (isBooleanTextField) {
    // NB: turns all booleans into a text field
    widgets.CheckboxWidget = VariableTextWidget;
  }

  return (
    <ChakraProvider>
      <Form
        id={id}
        // liveOmit
        templates={{
          ObjectFieldTemplate,
          WrapIfAdditionalTemplate,
          // add variables support
        }}
        widgets={widgets}
        formContext={{ columnsAmount: 2, variableJsonSchema }}
        formData={formData}
        transformErrors={(errors) => {
          return errors.filter((x) => x.name !== "type");
        }}
        onSubmit={
          onSubmit
            ? async (data, event) => {
                if (data.errors.length > 0) {
                  console.log("ERRORRS");
                  return;
                }

                const { formData } = data;
                onSubmit(formData);
              }
            : undefined
        }
        onChange={(data) => {
          const { formData } = data;
          onChange?.(formData);
        }}
        schema={schema}
        validator={validator}
        //  noHtml5Validate
      >
        {!!onChange ? <div /> : undefined}
      </Form>
    </ChakraProvider>
  );
};
