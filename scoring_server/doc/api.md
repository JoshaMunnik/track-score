# Game Session API

This API provides endpoints for creating, updating, and retrieving game sessions. All endpoints
expect the request body as POST data and return a JSON response.

The request body can be a JSON object or form-encoded data.

## Endpoints

### Create Session
**POST /game-sessions/create**

Creates a new game session.

#### Request Parameters
- `type` (string): The type of game
- `data` (string): The session data

#### Response
- **200 OK**: Session created successfully
  ```json
  {
    "code": "session code"
  }
  ```
- **400 Bad Request**: Missing required parameters or data too long (max 1MB)
- **422 Unprocessable Content**: Failed to create game session

---

### Update Session
**POST /game-sessions/update**

Updates an existing game session.

#### Request Parameters
- `code` (string): The session code
- `data` (string): The updated session data
- `finished` (int): 1 if finished, 0 if not finished

#### Response
- **200 OK**: Session updated successfully (no body)
- **400 Bad Request**: Missing parameters or data too long (max 1MB)
- **422 Unprocessable Content**: Failed to update game session

---

### Get Session
**POST /game-sessions/get**

Retrieves session data.

#### Request Parameters
- `code` (string): The session code
- `sequence` (int): The sequence number of the last retrieved session data

#### Response
- **200 OK**: Session data retrieved successfully
  ```json
  {
    "data": "session data",
    "type": "game type",
    "sequence": number,
    "finished": number
  }
  ```
- **400 Bad Request**: Missing required parameters
- **422 Unprocessable Content**: No new session data available

---

### Cleanup
**GET /game-sessions/cleanup**

Cleans up old game sessions.

### Response
- **200 OK**: Cleanup completed successfully (no body)
