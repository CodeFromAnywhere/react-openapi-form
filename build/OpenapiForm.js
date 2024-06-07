import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getFormContextFromOpenapi, getOperationRequestInit, } from "openapi-util";
import { useEffect, useState } from "react";
import { resolveSchemaRecursive } from "openapi-util/build/resolveSchemaRecursive";
import { ReactJsonSchemaForm } from "./rjsf/ReactJsonSchemaForm";
/**
 * Simple Openapi form.
 */
export const OpenapiForm = (props) => {
    const { method, path, formContext, openapi, withResponse, initialData, uiSchema, } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [formContextState, setFormContextState] = useState(formContext);
    /**
     * NB: Unfortunately the reference resolving is async and this makes a hook required in this way. This can probably be done differently but I should focus at this stage.
     *
     * Now, the first render will not contain the resulting schema yet for openapi inferenced forms.
     */
    useEffect(() => {
        (async () => {
            if (openapi) {
                const dereferenced = (await resolveSchemaRecursive({
                    document: openapi,
                    shouldDereference: true,
                }));
                const formContext = getFormContextFromOpenapi({
                    method,
                    path,
                    openapi: dereferenced,
                });
                //  console.log({ dereferenced, formContext });
                setFormContextState(formContext);
            }
        })();
    }, []);
    const { schema, parameters, securitySchemes, servers } = formContextState || {};
    //1. server-component: use getFormSchema (async function)
    //2. client-component: the resolved JSON Schema can be input into <RSJF/> ()
    return (_jsxs("div", { children: [isLoading ? _jsx("div", { children: "Loading" }) : null, schema ? (_jsx(ReactJsonSchemaForm, { schema: schema, uiSchema: uiSchema, formData: initialData, onSubmit: async (data) => {
                    if (!servers) {
                        alert("No servers");
                        return;
                    }
                    setIsLoading(true);
                    let statusCode = undefined;
                    let statusText = undefined;
                    const { fetchRequestInit, url, bodyData } = getOperationRequestInit({
                        path,
                        method,
                        servers,
                        data: data || {},
                        parameters,
                        securitySchemes,
                    });
                    const { body, headers } = fetchRequestInit;
                    const response = await fetch(url, fetchRequestInit)
                        .then(async (response) => {
                        statusCode = response.status;
                        statusText = response.statusText;
                        const json = await response.json();
                        return json;
                    })
                        .catch((e) => {
                        console.log(e);
                    });
                    setIsLoading(false);
                    withResponse?.({
                        response,
                        statusCode,
                        statusText,
                        url,
                        bodyData,
                        body,
                        headers,
                        method,
                    });
                } })) : (_jsx("div", { children: "No schema" }))] }));
};
//# sourceMappingURL=OpenapiForm.js.map