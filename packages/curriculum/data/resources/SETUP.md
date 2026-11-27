# Setup and execution

Recommended Python 3.11. Use `uv venv --python 3.11` and `uv pip install -r requirements-core.txt`, or `python -m venv .venv` then `python -m pip install -r requirements-core.txt` after activation. Linux/macOS: `source .venv/bin/activate`; PowerShell: `.venv\Scripts\Activate.ps1`. Launch `jupyter lab`. Choose PyTorch GPU build per official installation docs; CPU is sufficient for offline examples.

Run `python scripts/validate.py` and `python scripts/run_offline.py` from root. Optional packages should be installed selectively; use code-index.json for dependencies. External examples may require credentials, paid inference, network access or model downloads. Server examples require explicit launch. Promptfoo requires Node.js and a provider ID; LiteLLM config needs model and credentials. FastMCP client/server must use compatible release. Use synthetic inputs, not secrets. Do not execute untrusted model artifacts. Lock and test chosen dependencies in your target environment; no universal lock supplied.

## V2 labs
Install `fastapi` and `httpx` for LAB10 in addition to core requirements. Run `python scripts/run_v2_labs.py`. Exact observed environment is `review/environment.json`; not a cross-platform lockfile. For visualization tests install Playwright and Chromium and update executable path if needed.
