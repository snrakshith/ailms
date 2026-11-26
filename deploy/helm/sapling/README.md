# Helm deployment

`helm upgrade --install sapling deploy/helm/sapling --namespace sapling --create-namespace --set api.image=REGISTRY/API:TAG --set web.image=REGISTRY/WEB:TAG --set ingress.host=FQDN --set origin=https://FQDN`

Create the `sapling-runtime` Secret through a secrets controller before installation. Production MongoDB should be a protected, replicated deployment (managed or self-hosted) with verified backups. Configure TLS via cert-manager and DNS before exposing ingress.

Note: this chart assumes the Nginx web container can reach a Kubernetes service DNS name `api` on port 4000. Rename the service and update Nginx accordingly if installing multiple releases into one namespace. Test chart rendering with `helm template` before applying.
