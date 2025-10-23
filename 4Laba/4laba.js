function Callback(url, callback) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
          callback("Ошибка: " + response.status);
        return;
      }
      return response.json();
    })
    .then(data => {
      if (data) callback(null, data);
    })
    .then(undefined, error => callback(error));
}
function Posts() {
  Callback('https://jsonplaceholder.typicode.com/posts', (error, posts) => {
    if (error) console.log("Ошибка: " + error);
    else {
      let sort = posts.sort((a, b) => b.title.length - a.title.length);
      console.log("Posts:", sort);
    }
  });
}
function Comments() {
  Callback('https://jsonplaceholder.typicode.com/comments', (error, comments) => {
    if (error) console.log("Ошибка: " + error);
    else {
      let sort = comments.sort((a, b) => a.name.localeCompare(b.name));
      console.log("Comments:", sort);
    }
  });
}
function Users() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(o => {
      if (!o.ok) {
       console.log("Ошибка: " + o.status);
        return [];
      }
      return o.json();
    })
    .then(users => {
      if (!users || users.length == 0) return;
      let infa = users.map(u => ({
        id: u.id,
        name: u.name,
        username: u.username,
        email: u.email,
        phone: u.phone
      }));
     console.log("Users:", infa);
    }, error => console.log("Ошибка: " + error));
}
function Todos() {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(o => {
      if (!o.ok) {
        console.log("Ошибка: " + o.status);
        return [];
      }
      return o.json();
    })
    .then(todos => {
      if (!todos || todos.length == 0) return;
      let infa = todos.filter(t => !t.completed);
       console.log("Todos:", infa);
    }, error => console.log("Ошибка: " + error));
}
async function PostsCommentsA() {
  let postst = await fetch('https://jsonplaceholder.typicode.com/posts'),commentst = await fetch('https://jsonplaceholder.typicode.com/comments');
  if (!postst.ok || !commentst.ok) {
       console.log("Ошибка");
  } else {
    let posts = await postst.json(),comments = await commentst.json();
    console.log("Async Posts:", posts.sort((a, b) => b.title.length - a.title.length));
    console.log("Async Comments:", comments.sort((a, b) => a.name.localeCompare(b.name)));
  }
}
async function UsersTodosA() {
  let userst = await fetch('https://jsonplaceholder.typicode.com/users'),todost = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!userst.ok || !todost.ok) {
    console.log("Ошибка");
  } else {
    let users = await userst.json(),todos = await todost.json(),users1;
    users1= users.map(t => ({
      id: t.id,
      name: t.name,
      username: t.username,
      email: t.email,
      phone: t.phone
    }));
    let Todost = todos.filter(t => !t.completed);
    console.log("Async Users:", users1);
    console.log("Async Todos:", Todost);
  }
}
Posts();
Comments();
Users();
Todos();
PostsCommentsA();
UsersTodosA();
