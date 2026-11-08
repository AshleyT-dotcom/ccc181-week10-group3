# CampusConnect API Specification

## Required endpoints
| Method | Endpoint | Purpose | Success | Errors |
|---|---|---|---|---|
| GET | /api/v1/health | Checks that the API is running | 200 | none |
| POST | /api/v1/sessions | Logs in (creates a session) | 200 | 400, 401 |
| GET | /api/v1/users/me | Returns the logged-in user (needs token) | 200 | 401 |

## Examples
GET /api/v1/health -> 200
{ "status": "ok" }

POST /api/v1/sessions, request body:
{ "email": "student@campusconnect.test", "password": "Campus26" }

200 OK:
{ "token": "<token>", "user": { "id": 1, "name": "Demo Student", "email": "student@campusconnect.test" } }

400 Bad Request:
{ "error": "Email and password are required." }

401 Unauthorized (wrong password OR unknown email, same message):
{ "error": "Invalid email or password." }

GET /api/v1/users/me, header: Authorization: Bearer <token>

200 OK:
{ "id": 1, "name": "Demo Student", "email": "student@campusconnect.test" }

401 Unauthorized:
{ "error": "Not logged in." }

## Events (design only)
| Method | Endpoint | Purpose | Success | Errors |
|---|---|---|---|---|
| GET | /api/v1/events | List all events | 200 | none |
| GET | /api/v1/events?month=11 | List events in November | 200 | none |
| GET | /api/v1/events/5 | Get one event | 200 | 404 |
| POST | /api/v1/events | Add an event | 201 | 400 |
| PATCH | /api/v1/events/5 | Change part of an event | 200 | 400, 404 |
| DELETE | /api/v1/events/5 | Delete an event | 204 | 404 |
