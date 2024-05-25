import { Keys, O } from "from-anywhere";
import {
  FormContext,
  HttpMethodEnum,
  OpenapiDocument,
  getFormContextFromOpenapi,
  submitOperation,
} from "openapi-util";
import { useState } from "react";
import { ReactJsonSchemaForm } from "./rjsf/ReactJsonSchemaForm";
import { RJSFSchema, UiSchema } from "@rjsf/utils";

export type OperationPartial = {
  // requestBody: { content: { "application/json": { schema: any } } };
  responses: {
    "200": { content: { "application/json": { schema: any } } };
  };
};

/**
 * Simple Openapi form
 */
export const OpenapiForm = <
  T extends {
    paths: {
      [key: string]: {
        [key in HttpMethodEnum]?: OperationPartial;
      };
    };
  } & OpenapiDocument,
  P extends Keys<T["paths"]>,
  M extends keyof T["paths"][P] & HttpMethodEnum,
>(props: {
  /** You can provide a direct JSON import of the OpenAPI here just in order to gain typescript type inference for the paths and methods.
   *
   * If you provide this, formContext can be inferred and should be omitted.
   */
  openapi?: T;
  path: P;
  method: M;
  formContext?: FormContext;
  /** Gets called after response came back */
  withResponse?: (
    response: any,
    statusCode: number | undefined,
    statusText: string | undefined,
  ) => void;
  /** Properties to be filled when initialising the form */
  initialData?: O;
  /** See https://rjsf-team.github.io/react-jsonschema-form/ for examples */
  uiSchema?: UiSchema<any, RJSFSchema, any>;
}) => {
  const {
    method,
    path,
    formContext,
    openapi,
    withResponse,
    initialData,
    uiSchema,
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  const { schema, parameters, securitySchemes, servers } = openapi
    ? getFormContextFromOpenapi({ method, path, openapi })
    : formContext
    ? formContext
    : ({} as Partial<FormContext>);

  //1. server-component: use getFormSchema (async function)
  //2. client-component: the resolved JSON Schema can be input into <RSJF/> ()
  return (
    <div>
      {isLoading ? <div>Loading</div> : null}

      {schema ? (
        <ReactJsonSchemaForm
          schema={schema}
          uiSchema={uiSchema}
          formData={initialData}
          onSubmit={async (data) => {
            if (!servers) {
              alert("No servers");
              return;
            }

            setIsLoading(true);

            let statusCode: number | undefined = undefined;
            let statusText: string | undefined = undefined;

            const response = await submitOperation({
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
              .catch((e) => {
                console.log(e);
              });

            setIsLoading(false);

            withResponse?.(response, statusCode, statusText);
          }}
        />
      ) : (
        <div>No schema</div>
      )}
    </div>
  );
};
