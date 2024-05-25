import { WidgetProps } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";
import { lowerCaseArray } from "from-anywhere";
import { useSuggestions } from "./useSuggestions.js";
import { getDotnotationVariablesRecursive } from "./getDotnotationVariables.js";

export const VariableTextWidget = (props: {
  value: unknown;
  onChange: (value: any) => void;
  formContext?: {
    variableJsonSchema?: JSONSchema7;
    isRootTemplateVariable?: boolean;
  };
  schema: JSONSchema7;
  name: string;
  label: string;
  itemType?: string;
  placeholder?: string;
}) => {
  const {
    value,
    onChange,
    formContext,
    schema,
    name,
    placeholder,
    label,
    itemType,
  } = props satisfies Partial<WidgetProps>;

  // NB: this is a regression for other openapis and should later be removed!
  const markdownTextParameterNames = ["markdown", "description", "content"];
  const lastWord = lowerCaseArray(name).pop()!;

  const isTextArea =
    markdownTextParameterNames.includes(lastWord) ||
    (schema.maxLength || 0) >= 10000;

  const variableJsonSchema = formContext?.variableJsonSchema as
    | JSONSchema7
    | undefined;

  // Infer `variableTags` from `variableJsonSchema`. For all `StringObject`s, use dotnotation in the old UX for now.
  const variableTags = variableJsonSchema?.properties
    ? getDotnotationVariablesRecursive(variableJsonSchema)
    : [];

  const isRootTemplateVariable = formContext?.isRootTemplateVariable;
  const realValue = value ? String(value) : "";
  // Can be both elements, typing is hard
  const { onChangeSuggestions, renderTags, textAreaRef } = useSuggestions<any>({
    value: realValue,
    onChange,
    variableTags,
    isRootTemplateVariable,
  });
  const textInputClass = `w-full py-4 text-sm px-3 border border-gray-300 rounded-md focus:outline-none my-2 py-2 dark:!text-white dark:!bg-gray-800 text-gray-700 bg-white`;

  return (
    <>
      <p className="font-medium">
        {label}
        {schema.type === "boolean" ? " (Boolean)" : ""}
      </p>

      {isTextArea ? (
        <textarea
          ref={textAreaRef}
          rows={6}
          value={realValue}
          placeholder={
            variableJsonSchema
              ? isRootTemplateVariable
                ? placeholder
                : "Type $ to see variables available"
              : placeholder
          }
          className={textInputClass}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChangeSuggestions(e);
            onChange(e.target.value);
          }}
          maxLength={schema?.maxLength}
          minLength={schema?.minLength}
        />
      ) : (
        <input
          ref={textAreaRef}
          type={itemType}
          value={realValue}
          className={textInputClass}
          placeholder={
            variableJsonSchema
              ? isRootTemplateVariable
                ? placeholder
                : "Type $ to see variables available"
              : placeholder
          }
          onChange={(event) => {
            onChange(event.target.value);

            onChangeSuggestions(event);
          }}
          maxLength={schema?.maxLength}
          minLength={schema?.minLength}
        />
      )}
      {renderTags()}
    </>
  );
};
