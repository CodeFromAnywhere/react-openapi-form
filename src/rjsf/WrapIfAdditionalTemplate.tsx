import { Input } from "@chakra-ui/react";
import { getDefaultRegistry } from "@rjsf/core";
import {
  ADDITIONAL_PROPERTY_FLAG,
  WrapIfAdditionalTemplateProps,
} from "@rjsf/utils";

/**
 * Used example: https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/custom-templates/#wrapifadditionaltemplate
 */
export const WrapIfAdditionalTemplate = (
  props: WrapIfAdditionalTemplateProps,
) => {
  const renderDefault = false;
  if (renderDefault) {
    const Default = getDefaultRegistry().templates.WrapIfAdditionalTemplate;
    return <Default {...props} />;
  }

  const {
    id,
    label,
    onKeyChange,
    onDropPropertyClick,
    schema,
    children,
    uiSchema,
    registry,
    classNames,
    style,
  } = props;

  const { RemoveButton } = registry.templates.ButtonTemplates;
  const additional = ADDITIONAL_PROPERTY_FLAG in schema;

  if (!additional) {
    return <div>{children}</div>;
  }

  return (
    <div
      className={`${classNames} flex flex-row items-end gap-4  dark:text-white`}
      style={style}
    >
      <div className="pb-1">
        <div className="pb-2 text-sm font-bold">
          <label htmlFor={`${id}-key`}>Key</label>
        </div>
        {/* @ts-ignore */}
        <Input
          type="text"
          id={`${id}-key`}
          onBlur={(event) => {
            onKeyChange(event.target.value);
          }}
          defaultValue={label}
        />
      </div>

      {/* This is the value and is probably the string object, which I can't edit here directly */}
      <div className="w-full">{children}</div>

      <div className="pb-1">
        <RemoveButton
          registry={registry}
          onClick={onDropPropertyClick(label)}
          uiSchema={uiSchema}
        />
      </div>
    </div>
  );
};
