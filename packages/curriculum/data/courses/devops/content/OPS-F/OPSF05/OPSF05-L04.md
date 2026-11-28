# Ansible configuration management

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF05-L04`

## Learning objectives
- Explain the mechanism behind Ansible configuration management.
- Implement or demonstrate: Create a config in a disposable local directory and run playbook twice.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Inventory identifies hosts; playbooks declare tasks using modules. Idempotent tasks converge to desired state with no extra changes on repeated runs. Use check mode as preview where supported.

## Worked example
The copy module ensures file content and mode, unlike repeatedly appending shell output.

## Common failure mode
Check mode is not a guarantee for every module; avoid ad hoc shell where a module exists.

## Implementation snippet
```bash
ansible-playbook -i localhost, -c local playbook.yml --check
ansible-playbook -i localhost, -c local playbook.yml
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Create a config in a disposable local directory and run playbook twice.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Ansible configuration management using the worked scenario.

## Knowledge check
1. Explain the mechanism of Ansible configuration management using the worked scenario.
2. What failure should you watch for in Ansible configuration management, and how would you detect or prevent it?

## Review resources
- https://docs.ansible.com/ansible/latest/playbook_guide/
