import { PrismaClient } from "@prisma/client";
import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import client from "~/client";

export const action: ActionFunction = async ({ request }) => {
    const data = await request.formData();

    console.log(request.formData())

    const newSurvey = await client.survey.create({
        data: {
            title: data.get('title')?.toString() || "default name",
        },
    });

    const questions = data.getAll('question');
    questions.forEach(async (question) => {
        await client.question.create({
            data: {
                questionText: question.toString(),
                surveyId: newSurvey.id,
            },
        });
    });

    const surveys = await client.survey.findMany();

    console.log(surveys);

    return new Response(JSON.stringify({ surveys }), {
        headers: {
            "Content-Type": "application/json"
        }
    });



}

export const loader = async () => {
    const surveys = await client.survey.findMany();
    return { surveys: surveys };
};


export default function createSurvey() {
    const data = useLoaderData<typeof loader>();
    const surveys = data.surveys
    // Create a survey 
    // get all existing surveys
    return (
        <>
            <div>
                <h1>Survey List</h1>
            </div>
            <ul>
                {surveys.map((element, index, array) => (
                    <div key={element.id} className="flex">
                        <li >{element.title}</li>
                    </div>
                ))}
            </ul>
            <Form method="post">
                <div>
                    <label className="font-bold">
                        Survey Name:
                        <input type="text" className="bg-gray-200 border border-gray-400 rounded-md" id='title' />
                    </label>
                </div>
                <div>
                    <label className="font-bold">
                        Survey Question 1:
                        <input type="text" className="bg-gray-200 border border-gray-400 rounded-md" id='question' />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </Form>
        </>

    );
};


//Forms create the POST


// async function main() {
//     await prisma.survey.create({
//         data: {
//             title: 'Favorite Fruit Survey',
//             questions: {
//                 create: { questionText: 'What is your favorite fruit?' },
//             },
//         }
//     }
//     )
// }

// const allSurveys = await prisma.survey.findMany()
// console.dir(allSurveys)

