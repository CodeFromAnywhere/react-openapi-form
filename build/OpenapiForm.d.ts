import { Keys, O } from "from-anywhere";
import { FormContext, HttpMethodEnum } from "openapi-util";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
export type OperationPartial = {
    responses: {
        "200": {
            content: {
                "application/json": {
                    schema: any;
                };
            };
        };
    };
};
/**
 * Simple Openapi form
 */
export declare const OpenapiForm: <T extends {
    paths: {
        [key: string]: {
            head?: OperationPartial | undefined;
            options?: OperationPartial | undefined;
            get?: OperationPartial | undefined;
            put?: OperationPartial | undefined;
            post?: OperationPartial | undefined;
            delete?: OperationPartial | undefined;
            patch?: OperationPartial | undefined;
            trace?: OperationPartial | undefined;
        };
    };
}, P extends Keys<T["paths"]>, M extends keyof T["paths"][P] & HttpMethodEnum>(props: {
    /** You can provide a direct JSON import of the OpenAPI here just in order to gain typescript type inference for the paths and methods.
     *
     * If you provide this, formContext can be inferred and should be omitted.
     */
    openapi?: T | undefined;
    path: P;
    method: M;
    formContext?: FormContext | undefined;
    /** Gets called after response came back */
    withResponse?: ((context: {
        response: any;
        statusCode: number | undefined;
        statusText: string | undefined;
        url: string;
        body: string | undefined;
        bodyData: O | undefined;
        headers: O;
        method: HttpMethodEnum;
    }) => void) | undefined;
    /** Properties to be filled when initialising the form */
    initialData?: O | undefined;
    /** See https://rjsf-team.github.io/react-jsonschema-form/ for examples */
    uiSchema?: UiSchema<any, RJSFSchema, any> | undefined;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=OpenapiForm.d.ts.map