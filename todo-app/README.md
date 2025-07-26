# todo-app

## 1.2
`docker build . -t march787/todo-app:v1`

`docker push march787/todo-app:v1 `

`kubectl create deployment todo-app-dep --image=march787/todo-app:v1`

`kubectl logs -f todo-app-dep-84dddfd47d-8k2pc  `
