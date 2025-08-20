FROM python:3.9-slim

WORKDIR /app

RUN pip install kopf kubernetes requests

COPY controller.py .

CMD ["kopf", "run", "controller.py", "--all-namespaces"]