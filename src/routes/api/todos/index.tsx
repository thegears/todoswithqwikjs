import { type RequestHandler } from '@builder.io/qwik-city';

const todosList: object[] = [];

export const onGet: RequestHandler = async ({ json }) => {
  json(200, { todosList });
};

export const onPost: RequestHandler = async ({ json, request }) => {

  const body = await request.text()

  todosList.push({
    content: body
  });

  json(200, {});
};

export const onDelete: RequestHandler = async ({ json, request }) => {

  const body = await request.text()

  todosList.splice(parseInt(body), 1)
  json(200, {});
};
