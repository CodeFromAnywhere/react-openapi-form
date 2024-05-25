import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getFormContextFromOpenapi, submitOperation, } from "openapi-util";
import { useState } from "react";
import { ReactJsonSchemaForm } from "./rjsf/ReactJsonSchemaForm";
/**
 * Simple Openapi form
 */
export const OpenapiForm = (props) => {
    const { method, path, formContext, openapi } = props;
    const [isLoading, setIsLoading] = useState(false);
    const { schema, parameters, securitySchemes, servers } = openapi
        ? getFormContextFromOpenapi({ method, path, openapi })
        : formContext
            ? formContext
            : {};
    //1. server-component: use getFormSchema (async function)
    //2. client-component: the resolved JSON Schema can be input into <RSJF/> ()
    return (_jsxs("div", { children: [isLoading ? _jsx("div", { children: "Loading" }) : null, schema ? (_jsx(ReactJsonSchemaForm, { schema: schema, 
                // TODO: Fill this with localStorage data
                formData: undefined, onSubmit: (data) => {
                    if (!servers) {
                        alert("No servers");
                        return;
                    }
                    setIsLoading(true);
                    let statusCode = undefined;
                    let statusText = undefined;
                    submitOperation({
                        path,
                        method,
                        servers,
                        data: data || {},
                        parameters,
                        securitySchemes,
                    })
                        .then(async (response) => {
                        statusCode = response.status;
                        statusText = response.statusText;
                        const json = await response.json();
                        return json;
                    })
                        .then((result) => {
                        setIsLoading(false);
                        console.log({ result });
                    })
                        .catch((e) => {
                        setIsLoading(false);
                        console.log(e);
                    });
                } })) : (_jsx("div", { children: "No schema" }))] }));
};
//# sourceMappingURL=OpenapiForm.js.map