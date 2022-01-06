FROM python:3.8.8

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

ENTRYPOINT ["flask"]

CMD ["run", "--host", "0.0.0.0"]