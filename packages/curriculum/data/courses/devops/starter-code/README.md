# Starter repository

All deployment files are educational templates, not certified production configs. `app/` is a runnable stdlib HTTP service (tests verified). Copy CI template and Jenkinsfile into app repository as appropriate. Before running Docker, replace digest placeholder with a verified upstream digest. In CI, replace action SHA placeholder with reviewed 40-character commit SHA; do not run an unreviewed installer. Helm/Kubernetes need the built image in a reachable registry. Argo needs a real approved repository and restricted AppProject.

1. `cd starter-code/app && python -m unittest discover -s tests -v`
2. Verify base image then `docker build -t learning-api:local .`; run bound to loopback.
3. Use a disposable kind cluster; replace the manifest image reference, apply namespace first, then deployment/service. Verify current context before any command. Network policy limits ingress to lab clients; enforcement depends on CNI.
4. Use local Terraform `terraform_data` (no AWS resources); init/validate/plan and optional local apply/destroy. Ansible playbook writes only a sandbox directory.
5. Semgrep, Gitleaks, OPA and Kyverno fixtures are deliberately scoped to a training example. No real secrets are included. Kyverno audit does not block; use an approved sandbox policy enforcement test if needed.
6. External integrations need verified/pinned CLI versions, authorized targets and testing; example templates intentionally contain placeholders.
