# Setup and security

Start with Python 3.10+, Git, Bash, a Linux environment (WSL2/macOS VM as appropriate). Run local Python labs first; optional Jupyter and schema tools: `python -m pip install jupyterlab nbformat jsonschema` in a dedicated virtualenv. Install Docker, Terraform, Ansible, kubectl, kind, Helm and scanners from official docs, verifying checksums, signatures and release advisories. Pin versions and action SHAs after review; do not use this package as an unattended installer.

Cloud work is optional: AWS sandbox account/role, budget alarms, no production credentials, cleanup plan. Commercial tools (Datadog, Jira, PagerDuty, Snyk, Checkmarx, Burp editions) can have account or license prerequisites. Avoid production scanning, untrusted PR secrets and privileged Docker sockets on shared runners.

Run local `python labs/solutions/<lab>.py` and `python scripts/validate.py`. Use `starter-code/README.md` for configs and `guides/INTEGRATION_TEST_PLAN.md` for untested tools.
