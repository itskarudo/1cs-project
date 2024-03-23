import requests

url = "http://localhost:3000/auth/signup"

data = {
    'firstName':'test',
    'lastName':'test',
    'email':'john.doe@example.com',
    'password':'testtest',
    'grade':'Professeur',
    'role':'admin',
}
r = requests.post(url, json=data)
print(r.text)
