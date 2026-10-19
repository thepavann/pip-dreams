# Security Policy

## Reporting a vulnerability

Please do not publish exploitable security details in a public issue.

For a private report, use GitHub's private vulnerability reporting feature for this repository if it is enabled. If it is not enabled, contact the repository maintainer through a verified contact channel listed on their GitHub profile and provide only the details needed to reproduce the issue.

## What to include

- A concise description of the issue.
- Steps to reproduce or a proof of concept that does not expose real user data.
- The impact you believe is possible.
- Any suggested mitigation.

## Secret handling

- Never commit credentials, API keys, session tokens, or private user information.
- Rotate any secret that has been accidentally exposed; deleting it from the latest commit alone may not remove it from Git history.
- Configure future secrets through the deployment provider's secret store.
- Do not include passwords or private credentials in bug reports or demo instructions.

## Scope

The project is a creative web experience. Report vulnerabilities in application code, build/deployment configuration, or any future integrations that could affect visitors or the repository.
