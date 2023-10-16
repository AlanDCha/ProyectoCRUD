
const blogsDOM = document.querySelector('.blogs')


const showTasks = async() => {
  try {
    const { data: { blogs } } = await axios.get('/api/blogs');
    if (blogs.length < 1) {
      blogsDOM.innerHTML = `<h1 class="text-center">No tienes tareas</h1>`;
      return;
    }
    const allBlogs = blogs
      .map(blog => {
        const { title, body, _id } = blog;
        return `<div 
            class="blog card animate__animated animate__fadeIn" 
            id="${_id}"
            onClick="onEditBlogButton(event)"
            >
            <div class="card-cuerpo card-body d-flex flex-row justify-content-between">
              <div>
                <h4 class="card-title">${title}</h4>
                <input class="title-input visually-hidden"/>
                <p class="card-text">${body}</p>
                <input class="body-input visually-hidden"/>
              </div>
              <button 
                onClick="onDeleteBlog(event)" 
                class="btn btn-danger h-50 mx-2" 
              >
                Borrar
              </button>
            </div>
          </div>`
      })
      .join('')
      blogsDOM.innerHTML = allBlogs;
  } catch (error) {
    console.log(error);
  }
}

const onCreateBlog = async() => {

  const prev = document.querySelector('.prev');
  const title = document.querySelector('.titulo').value;
  const body = document.querySelector('.body').value;

  if (title === "" && cuerpo === ""){
    return;
  }

  const obj = {title, body}

  try {
    await axios.post('/api/blogs', obj)
    showTasks();
    prev.remove();
  } catch (error) {
    console.log(error);
  }
}

const onCreateBlogButton = () => {
  let div = `<div class="prev card p-2 d-flex flex-column gap-1">
          <input 
            type="text" 
            class="titulo form-control" 
            id="title" 
            name="title" 
            placeholder="Titulo" 
          />
          <textarea 
            class="body form-control"
            name="body" 
            id="body" 
            cols="20" 
            rows="5" 
            placeholder="Contenido"></textarea>
          <button 
            class="btn btn-primary" 
            type="submit" 
            onClick="onCreateBlog()"
          >
            Submit
          </button>
        </div>`;
  if (!!document.querySelector('.prev')){
    document.querySelector('.prev').remove()
  } else {
    blogsDOM.innerHTML = div + blogsDOM.innerHTML;
  }
}

const onUpdateBlog = async() => {

  const title = document.querySelector('.edit-titulo').value;
  const body = document.querySelector('.edit-body').value;
  const edit = document.querySelector('.edit');
  const id = edit.parentElement.id;

  const obj = { title, body }

  try {
    await axios.put(`/api/blogs/${id}`, obj)
    edit.remove();
    showTasks();
  } catch (error) {
    console.log(error);
  }
} 

const onEditBlogButton = event => {
  const tag = event.target.tagName;
  if (tag !== "DIV" || !!document.querySelector('.edit')) return;
  const id = event.target.parentElement.attributes.id.value;
  const div = document.getElementById(id);
  const tag_titulo = div.getElementsByClassName('card-title');
  const tag_body = div.getElementsByClassName('card-text');
  const titulo = tag_titulo[0].textContent;
  const body = tag_body[0].textContent;
  let edit = `<div class="edit p-2 d-flex flex-column gap-1">
          <input 
            type="text" 
            class="edit-titulo form-control" 
            id="edit-title" 
            name="edit-title" 
            placeholder="Titulo" 
            value="${titulo}"
          />
          <textarea 
            class="edit-body form-control"
            name="edit-body" 
            id="edit-body" 
            cols="20" 
            rows="5" 
            placeholder="Contenido">${body}</textarea>
          <button class="btn btn-primary" type="submit" onClick="onUpdateBlog()">Submit </button>
        </div>`;
  div.innerHTML = edit;
}

const onDeleteBlog = async(event) => {
  const tag = event.target.tagName;
  if (tag !== "BUTTON") return;
  const id = event.target.parentElement.parentElement.attributes.id.value;
  try {
    await axios.delete(`/api/blogs/${id}`);
    showTasks();
  } catch (error) {
    console.log(error);
  }
}

document.querySelector('.prev')?.addEventListener('submit', async(e) => {
  e.preventDefault()

  const title = document.querySelector('.title').value;
  const body = document.querySelector('.body').value;

  console.log(title);
  console.log(body);
})

showTasks();

document.addEventListener('click', event => {
  const edit = document.querySelector('.edit');
  if (event.target.classList.contains('card-cuerpo')){
    return;
  }
  else if (checkParent(edit, event.target) || event.target === edit){
    return;
  } else {
    edit.remove();
    showTasks();
  }
  // console.log(event.target);
})

const checkParent = (parent, child) => parent.contains(child);