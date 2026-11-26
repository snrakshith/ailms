# Negative-security checks
The executable `tests/integration/fullstack-smoke.mjs` creates two tenants, confirms that one tenant cannot edit the other's task, and confirms CSRF rejection. Run additional DAST/SAST, authentication fuzzing, header tests, MongoDB authorization isolation and secret scans before a real product launch.
