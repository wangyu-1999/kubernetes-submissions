# todo-app

## 1.2

`docker build . -t march787/todo-app:v1`

`docker push march787/todo-app:v1`

`kubectl create deployment todo-app-dep --image=march787/todo-app:v1`

`kubectl logs -f todo-app-dep-84dddfd47d-8k2pc`

## 1.4

`kubectl delete deployment todo-app-dep`

`kubectl apply -f todo-app/manifests/deployment.yaml`

`kubectl get pods`

`kubectl logs -f todo-app-dep-dff447b54-89dzf`

## 1.5

`docker build . -t march787/todo-app:v2`

`docker push march787/todo-app:v2`

`kubectl apply -f manifests/deployment.yaml`

`kubectl port-forward todo-app-dep-7d8fbbf677-2nm4z 8080:5000`

## 1.6

`docker build . -t march787/todo-app:v3`

`docker push march787/todo-app:v3`

`kubectl apply -f manifests/deployment.yaml`

`kubectl apply -f manifests/service.yaml`

`kubectl get service todo-app-svc`
