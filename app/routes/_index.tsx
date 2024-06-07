import { PrismaClient } from "@prisma/client";
import type { MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import client from "~/client";

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
          const survey = element
          console.log(survey)
          return (
            <>
              <div className="flex">
                <li key={survey.id}>{survey.title}</li>
                <button className="bg-green-500 border border-gray-500 flex flex-row"> Take this survey </button>
              </div>

            </>
          )
        }
        )}
      </ul></>
  );
};


