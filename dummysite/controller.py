import kopf
import kubernetes
import requests

@kopf.on.create('helsinki.fi', 'v1', 'dummysites')
def create_fn(spec, name, namespace, logger, **kwargs):
    logger.info(f"A DummySite resource is created: {name}")

    # Get the website URL from the spec
    url = spec.get('website_url')
    logger.info(f"Fetching content from {url}...")

    # Fetch the HTML content
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    html_content = response.text

    # Get Kubernetes API clients
    core_v1 = kubernetes.client.CoreV1Api()
    apps_v1 = kubernetes.client.AppsV1Api()

    # Define a common label for all our resources
    labels = {'app': name}

    # Create a ConfigMap to hold the website's index.html
    configmap_name = f'{name}-html-cm'
    configmap_body = {
        'apiVersion': 'v1',
        'kind': 'ConfigMap',
        'metadata': {
            'name': configmap_name,
            'namespace': namespace,
        },
        'data': {
            'index.html': html_content
        }
    }
    kopf.adopt(configmap_body)
    core_v1.create_namespaced_config_map(namespace=namespace, body=configmap_body)
    logger.info(f"ConfigMap '{configmap_name}' created.")

    # Create a Deployment to run an Nginx web server
    deployment_name = f'{name}-deployment'
    deployment_body = {
        'apiVersion': 'apps/v1',
        'kind': 'Deployment',
        'metadata': {
            'name': deployment_name,
            'namespace': namespace,
        },
        'spec': {
            'replicas': 1,
            'selector': {'matchLabels': labels},
            'template': {
                'metadata': {'labels': labels},
                'spec': {
                    'containers': [{
                        'name': 'nginx',
                        'image': 'nginx:alpine',
                        'ports': [{'containerPort': 80}],
                        'volumeMounts': [{
                            'name': 'html-volume',
                            'mountPath': '/usr/share/nginx/html'
                        }]
                    }],
                    'volumes': [{
                        'name': 'html-volume',
                        'configMap': {
                            'name': configmap_name
                        }
                    }]
                }
            }
        }
    }
    kopf.adopt(deployment_body)
    apps_v1.create_namespaced_deployment(namespace=namespace, body=deployment_body)
    logger.info(f"Deployment '{deployment_name}' created.")

    # Create a Service to expose the Nginx deployment
    service_name = f'{name}-service'
    service_body = {
        'apiVersion': 'v1',
        'kind': 'Service',
        'metadata': {
            'name': service_name,
            'namespace': namespace
        },
        'spec': {
            'type': 'NodePort',
            'selector': labels,
            'ports': [{'port': 80, 'targetPort': 80}]
        }
    }
    kopf.adopt(service_body)
    core_v1.create_namespaced_service(namespace=namespace, body=service_body)
    logger.info(f"Service '{service_name}' created.")

    return {'status': 'SUCCESS', 'message': f'All resources for {name} created.'}

@kopf.on.delete('helsinki.fi', 'v1', 'dummysites')
def delete_fn(name, namespace, logger, **kwargs):
    logger.info(f"DummySite '{name}' is being deleted. Associated resources will be garbage-collected.")