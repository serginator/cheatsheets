# Kubernetes (1.17)

## Installing

### Mac

```bash
brew install kubernetes-cli
```

### Linux

```bash
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
# create a kubeconfig.yaml file (by downloading it or whatever) and export it
export KUBECONFIG=kubeconfig.yaml
```

## Usage

* Get all nodes: `kubectl get nodes`
* Get cluster info: `kubectl cluster-info`
* Get all pods (like containers): `kubectl get pods`
* Get mmore verbose info about pods: `kubectl get pods -o wide`
* Create a pod with nginx image and expose port 80: `kubectl run myNginx --image=nginx --port=80`
* Get pods info: `kubectl describe pods`
* Get info about one pod: `kubectl describe pod myNginx`
* Delete a pod: `kubectl delete pod myNginx`

# Example of a Deployment yaml file to deploy 3 pods with nginx image and expose port 80

```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
        name: myNginx
    spec:
        replicas: 3
        selector:
            matchLabels:
                app: myNginx
        template:
            metadata:
                labels:
                    app: myNginx
            spec:
                containers:
                - name: myNginx
                    image: nginx
                    ports:
                        - containerPort: 80
```

* Create a deployment: `kubectl create -f myNginx.yaml`
* Get deployments: `kubectl get deployments`
* Get info about one deployment: `kubectl describe deployment myNginx`
* Edit a deployment: `kubectl edit deployment myNginx`
* Delete a deployment: `kubectl delete deployment myNginx`

## Exposing our service to the outside world

* Expose a service: `kubectl expose deployment myNginx --type=LoadBalancer --port=80`
* Get services: `kubectl get services`
* Get info about one service: `kubectl describe service myNginx`
* Delete a service: `kubectl delete service myNginx`

## Other way to export our service, make a service yaml file

```yaml
    apiVersion: v1
    kind: Service
    metadata:
        name: myNginx
        labels:
            app: myNginx
    spec:
        type: LoadBalancer
        ports:
            - port: 80
        selector:
            app: myNginx
```

* Create a service: `kubectl create -f myNginxService.yaml`
* Get services: `kubectl get services`
* Get info about one service: `kubectl describe service myNginx`
* Delete a service: `kubectl delete service myNginx`
