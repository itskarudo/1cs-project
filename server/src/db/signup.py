import requests

# Define the base URL of your Node.js application
base_url = 'http://localhost:3000'  # Replace with your actual Node.js app URL

# Endpoint for signup
signup_endpoint = '/auth/signup'

# Define the user data for signup
user_data = {
    'firstName': 'John',
    'lastName': 'Doe',
    'email': 'johndoe@example.com',
    'password': 'securepassword',
    'gradeId': 1,  # Replace with the actual grade ID
    'role': 'admin'  # Replace with the desired role (e.g., 'admin', 'enseignant')
}

try:
    # Send POST request to signup endpoint
    response = requests.post(base_url + signup_endpoint, json=user_data)

    # Check response status code
    if response.status_code == 201:
        print("User signed up successfully!")
    elif response.status_code == 400:
        print("Signup request failed. Error:", response.json().get('error'))
    else:
        print("Signup request failed with status code:", response.status_code)

except requests.exceptions.RequestException as e:
    print("Error occurred during signup request:", e)
