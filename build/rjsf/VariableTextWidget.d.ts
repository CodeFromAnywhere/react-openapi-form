import { JSONSchema7 } from "json-schema";
export declare const VariableTextWidget: (props: {
    value: unknown;
    onChange: (value: any) => void;
    formContext?: {
        variableJsonSchema?: JSONSchema7 | undefined;
        isRootTemplateVariable?: boolean | undefined;
    } | undefined;
    schema: JSONSchema7;
    name: string;
    label: string;
    itemType?: string | undefined;
    placeholder?: string | undefined;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=VariableTextWidget.d.ts.map