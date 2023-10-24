import { component$, $, useStore, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";


export default component$(() => {



  const addTodoInput = useSignal("");


  const todosList = useStore({
    list: [],
    addTodo: $(function(this: any) {

      const inputValue = addTodoInput.value
      addTodoInput.value = ""

      this.list.push({
        content: inputValue
      });

      fetch(`/api/todos`, {
        method: 'POST',
        body: inputValue
      });
    }),
    removeTodo: $(function(this: any, index: number) {
      this.list.splice(index, 1)

      fetch('/api/todos', {
        method: 'DELETE',
        body: `${index}`
      });
    })
  });
  useVisibleTask$(async () => {
    const res = await fetch('/api/todos');
    const todos = await res.json();
    todosList.list = todos.todosList
  })

  return (
    <div class="p-5">
      <div class="w-full flex justify-center">
        <h4 class="text-6xl">TODOS</h4>
      </div>

      <div class="w-full flex justify-center mb-6">
        <input bind: value={addTodoInput} type="text" placeholder="TODO" class="input input-bordered w-full max-w-xs" />
        <button class="btn" onClick$={() => { todosList.addTodo() }}>Ekle</button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {

          todosList.list.map((todo: { content: string }, index: number) =>
            <div key={index} class="row-span-auto">
              <div class="flex justify-center mt-5 ">
                <div class="w-96 bg-base-100 shadow-xl flex justify-center card">

                  <div onClick$={() => todosList.removeTodo(index)} class="flex justify-end">
                    <div class=" flex justify-center items-center  absolute h-full opacity-10 rounded-r-2xl w-1/6 hover:bg-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </div>
                  </div>

                  <div class="card-body w-5/6 text-center">

                    <span class=" break-all">{todo.content}</span>

                  </div>
                </div>
              </div>
            </div>
          )

        }
      </div >
    </div >
  );
});

export const head: DocumentHead = {
  title: "TODOS",
  meta: [
    {
      name: "description",
      content: "todos app with qwik.js",
    },
  ],
};
