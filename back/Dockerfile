FROM python:3.8.8

COPY . /app

WORKDIR /app

ENV FLASK_RUN_PORT=8000
RUN pip install -r requirements.txt

ENTRYPOINT ["python"]

CMD ["app.py"]