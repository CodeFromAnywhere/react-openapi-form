import { JSONSchema7 } from "json-schema";
import { O } from "from-anywhere";
/** General purpose component with all my widgets and templates */
export declare const ReactJsonSchemaForm: (props: {
    id?: string | undefined;
    formData?: O | undefined;
    isBooleanTextField?: boolean | undefined;
    variableJsonSchema?: JSONSchema7 | undefined;
    onSubmit?: ((formData?: O) => void) | undefined;
    /** If given, will show no submit button */
    onChange?: ((formData?: O) => void) | undefined;
    schema: JSONSchema7;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReactJsonSchemaForm.d.ts.map