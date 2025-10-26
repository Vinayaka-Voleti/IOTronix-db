# API Endpoints

1. To upload `.xls` file

`curl -X POST "http://127.0.0.1:8000/upload-xls/"   -H "accept: application/json"   -H "Content-Type: multipart/form-data"   -F "file=@file_path"`

After uploading an upload lock is set in database to prevent accidental reupload

2. To reset the upload lock, run this in bash

`curl -X POST "http://127.0.0.1:8000/reset-upload-lock/"   -H "Authorization: Bearer elabs"`

The authorization token is kept as it is, because the Database cannot be updated without the credentials file

3. This endpoint is used inside the frontend to fetch the teams from Database

`curl "http://127.0.0.1:8000/get-teams/"`