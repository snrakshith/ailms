# Replace placeholder with a verified official Python image digest before building.
FROM python:3.12-slim@sha256:REPLACE_WITH_VERIFIED_DIGEST
WORKDIR /app
COPY --chown=10001:10001 app.py /app/app.py
USER 10001:10001
EXPOSE 8080
CMD ["python", "-B", "/app/app.py"]
