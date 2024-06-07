import type { MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";


let surveys = [
  {
    id: "1",
    title: "survey1",
  },
]

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// export const action = async ({ request }) => {

//   return null
//   //return a response
// }

export const loader = async () => {
  return ({ message: "Welcome to remix!" });
}



export default function Index() {
  const message = useLoaderData<typeof loader>();

  // Create a survey 
  // get all existing surveys
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>


      <Form method="POST" action="/messages">

      </Form>


      <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
        Remix Docs
      </a>
      {/* </li>
      </ul > */}
    </div >
  );
}
