# todo-app

## 1.2

`docker build . -t march787/todo-app:v1`

`docker push march787/todo-app:v1`

`kubectl create deployment todo-app-dep --image=march787/todo-app:v1`

`kubectl logs -f todo-app-dep-84dddfd47d-8k2pc`

## 1.4

`kubectl delete deployment todo-app-dep`

`kubectl apply -f todo-app/mainifest/deployment.yaml`

`kubectl get pods`

`kubectl logs -f todo-app-dep-dff447b54-89dzf`
