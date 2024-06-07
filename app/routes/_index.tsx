import { PrismaClient } from "@prisma/client";
import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import client from "~/client";

//create this variable. it is empty for now bc the input field will fill in.
let surveyName = ""
let QuestionOne = ""

export const loader = async () => {
  const surveys = await client.survey.findMany();
  console.log(surveys)
  return { surveys: surveys }
}
//   let surveys = [
//   {
//     id: "1",
//     title: "Survey 1",
//   },
// ]


// export const action = async ({ request }) => {

//   return null
//   //return a response
// }

//Remix takes the action and turns it into a PUT request. Anything that isn't a GET request. GET is the default export of
// component. If the component isn't there, it's the loader
//one action per route
//actions define POST - define how the post/put is handled. anything not a get
// loaders define how data is loaded
//components are returned on a GET
export const action: ActionFunction = async ({ }) => {
  return new Response("this is a test action survey");
}


export default function Index() {
  const data = useLoaderData<typeof loader>();
  const surveys = data.surveys
  // Create a survey 
  // get all existing surveys
  return (
    <><div className="text-lg">
      <h1>Survey List</h1>
    </div><ul>
        {surveys.map((element, index, array) => {
          const survey = element;
          console.log(survey);
          return (
            <>
              <div className="flex">
                <li key={survey.id}>{survey.title}</li>
                <button className="bg-purple-200 border border-gray-500 flex flex-row rounded-md font-bold py-2 px-4"> Take this survey </button>

              </div>
              <div className="bg-green-200 border border-gray-500 flex flex-row rounded-md font-bold py-2 px-4 w-60">
                <Link to="/create"> New Survey </Link>
              </div>
            </>
          );
        }
        )}
      </ul></>
  )
}
