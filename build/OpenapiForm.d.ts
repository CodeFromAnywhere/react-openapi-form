import { Keys } from "from-anywhere";
import { FormContext, HttpMethodEnum, OpenapiDocument } from "openapi-util";
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
} & OpenapiDocument, P extends Keys<T["paths"]>, M extends keyof T["paths"][P] & HttpMethodEnum>(props: {
    /** You can provide a direct JSON import of the OpenAPI here just in order to gain typescript type inference for the paths and methods.
     *
     * If you provide this, formContext can be inferred and should be omitted.
     */
    openapi?: T | undefined;
    path: P;
    method: M;
    formContext?: FormContext | undefined;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=OpenapiForm.d.ts.map