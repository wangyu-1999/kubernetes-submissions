# exercises

## 1.1

`docker build . -t march787/log-output:v1`
`docker push march787/log-output:v1`
`k3d cluster create -a 2`
`kubectl create deployment log-output-dep --image=march787/log-output:v1`
`kubectl get pods`

> (base) wangyu@wangyudeMacBook-Air log-output % kubectl get pods
> NAME                                 READY   STATUS    RESTARTS   AGE
> hashgenerator-dep-54ddc5f49c-ltdt5   1/1     Running   0          72m
> log-output-dep-65fdcc8dc6-nmlkr      1/1     Running   0          22s

`kubectl logs -f log-output-dep-65fdcc8dc6-nmlkr`

> (base) wangyu@wangyudeMacBook-Air log-output % kubectl logs -f > log-output-dep-65fdcc8dc6-nmlkr 
> Application started. The generated string is: > 80fd9fe9-f576-4d59-a301-b44f2ad4b8f6
> 2025-07-26T10:00:24.970Z:80fd9fe9-f576-4d59-a301-b44f2ad4b8f6
> 2025-07-26T10:00:29.963Z:80fd9fe9-f576-4d59-a301-b44f2ad4b8f6
> 2025-07-26T10:00:34.972Z:80fd9fe9-f576-4d59-a301-b44f2ad4b8f6
> ...
