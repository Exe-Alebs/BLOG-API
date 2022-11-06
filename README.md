# BLOG API
This a blogging Api

---

## Requirements
1. User should be able to register 
2. User should be able to login with using JWT
3. Implement basic auth
4. User should be able to get blogs
5. Users should be able to create blogs
6. Users should be able to update and delete blogs
7. Test application
---
## Setup
- Install NodeJS, mongodb

- 

---


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  username |  string |  required |
|  firstname | string  |  required|
|  lastname  |  string |  required  |
|  email     | string  |  required  |
|  password |   string |  required  |
|  user_type |  string |  required, default: user, enum: ['user', 'admin'] |


### Blogs




## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe",
  "username": 'jon_doe",
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
        "username": 'jon_doe",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "username": 'jon_doe",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}




## Contributor
- ALEBIOSUS GBOLAHAN
