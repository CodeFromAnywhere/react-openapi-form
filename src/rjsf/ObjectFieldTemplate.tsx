import { getDefaultRegistry } from "@rjsf/core";
import { ObjectFieldTemplateProps } from "@rjsf/utils";

/** Enhances it to support columns */
export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  if (
    !props.formContext.columnsAmount ||
    props.schema?.["ui:widget"] !== "columns"
  ) {
    const Default = getDefaultRegistry().templates.ObjectFieldTemplate;
    return <Default {...props} />;
  }

  const visibleProperties = props.properties.filter(
    (element) => !element.hidden,
  );

  const itemsPerColumn = Math.ceil(
    visibleProperties.length / props.formContext.columnsAmount,
  );

  const chunks = new Array(props.formContext.columnsAmount)
    .fill(null)
    .map((_, index) => {
      const start = 0 + index * itemsPerColumn;

      return visibleProperties.slice(start, start + itemsPerColumn);
    });

  const colStyle = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }[props.formContext.columnsAmount as number];

  return (
    <div className={`grid ${colStyle} gap-12`}>
      {props.title}
      {props.description}
      {chunks.map((chunk, i) => {
        return (
          <div key={`col${i}`}>
            {chunk.map((element, j) => {
              return <div key={`col${i}el${j}`}>{element.content}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
};
