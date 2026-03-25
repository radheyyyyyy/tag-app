import { authenticate } from "../shopify.server";
import { useActionData, useSubmit } from "react-router";

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const res = await admin.graphql(`
    #graphql
    mutation {
      cartTransformCreate(functionHandle: "cart-attribute-function") {
        cartTransform {
          id
          functionId
        }
        userErrors {
          field
          message
        }
      }
    }
  `);

  const { data } = await res.json();
  return { data };
};

export default function Activate() {
  const actionData = useActionData();
  console.log(actionData);
  const submit = useSubmit();

  return (
    <s-page>
      <s-button
        variant="primary"
        onClick={() => { submit(null, { method: 'post' }) }} // ✅ fixed
      >
        Activate Cart Transform
      </s-button>
      {actionData && <pre>{JSON.stringify(actionData, null, 2)}</pre>}
    </s-page>
  );
}