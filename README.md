# react-openapi-form

Welcome to react-openapi-form. This is a thin wrapper around [rjsf](https://github.com/rjsf-team/react-jsonschema-form).

Goals:

- Make it easy to use [rjsf](https://github.com/rjsf-team/react-jsonschema-form) with openapis with minimal configuration.
- Be unopinionated about the theming
- Flexibility to edit
- Ability to work with remote openapis as well as imported ones.
- Type-safety

Non-goals:

- Things not mentioned at 'goals'.
- Things rjsf does sufficiently well. This thing should be complementary and not replace anything.

# Installation

Install:

`npm i react-openapi-form`

# Usage

```tsx
import { OpenapiForm } from "react-openapi-form";
import "react-openapi-form/css.css";
// Your openapi
import openapi from "../public/openapi.json";

const Page = () => {
  return (
    <OpenapiForm openapi={openapi} path="/root/createDatabase" method="post" />
  );
};
export default Page;
```

# TODO

- ✅ Extrahere `OpenapiForm` into `react-openapi-form` npm package and repo.
- ✅ Make a good readme with goals/non-goals
- ✅ Make `OpenapiForm` installation and usage docs good.
- ✅ Fix theming
- Ensure the form gets submitted properly.
- Add possibility for extra UI to be provided.
- Make it possible to provide your own Form settings so all rsjf features don't get forgotten.
