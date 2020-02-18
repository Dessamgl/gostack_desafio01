const express = require('express');

const server = express();

server.use(express.json());

const projects = [
  {
    id: 0,
    title: "Projeto 01",
    tasks: []
  },
  {
    id: 1,
    title: "Projeto 02",
    tasks: []
  },
  {
    id: 2,
    title: "Projeto 03",
    tasks: ["tarefa"]
  },
]

server.use((req, res, next) => {
  console.count();

  return next();
})


function projectIdExists(req, res, next) {
  const { id } = req.params;

  const projectId = projects.find(project => project.id == id);

  if(!projectId){
    return res.status(400).json({Message: 'Project does not exists'});
  }
  return next();
}

server.post('/projects', (req, res) => {
  const {id, title} = req.body;

  const newProject = {
    id,
    title,
    tasks: []
  };

  projects.push(newProject);

  return res.json(projects);
})

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.put('/projects/:id', projectIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const findIdInProject = projects.find(project => project.id == id);
  findIdInProject.title = title;

  return res.json(projects);
})

server.delete('/projects/:id', projectIdExists, (req, res) => {
  const { id } = req.params;

  const findIdInProject = projects.find(project => project.id == id);
  projects.splice(findIdInProject, 1);

  return res.send();
})

server.post('/projects/:id/tasks', projectIdExists, (req, res) =>{
const { id } = req.params;
const { title } = req.body;

const projectId = projects.find(project => project.id == id);

projectId.tasks.push(title);

return res.json(projectId);
})

server.listen(3000);