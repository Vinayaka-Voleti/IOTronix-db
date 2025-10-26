from fastapi import FastAPI, File, UploadFile, Header
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import random
import os
import firebase_admin
from firebase_admin import credentials, firestore
from typing import Optional

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

service_account_path = os.path.join(os.path.dirname(__file__), "iotronix-f733c-firebase-adminsdk-fbsvc-fbf64167e7.json")
if not os.path.exists(service_account_path):
    raise FileNotFoundError(f"Service account file not found: {service_account_path}")

cred = credentials.Certificate(service_account_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.post("/upload-xls/")
async def upload_xls(file: UploadFile = File(...)):
    # Check lock status
    control_doc = db.collection("upload_control").document("team_upload_status").get()
    if control_doc.exists and control_doc.to_dict().get("uploaded"):
        return {"error": "Team data already uploaded. Further uploads are locked."}

    if not file.filename.endswith('.xls'):
        return {"error": "Only .xls files are supported"}

    # Save and read the Excel file
    content = await file.read()
    with open("temp.xls", "wb") as temp_file:
        temp_file.write(content)

    data = pd.read_excel("temp.xls", header=None)
    names = data[0].iloc[1:].dropna().tolist()

    # Load group names
    with open('group_names.txt', 'r') as file:
        group_names = [line.strip() for line in file.readlines()]

    # Shuffle and group names
    random.shuffle(names)
    groups = [names[i:i + 5] for i in range(0, len(names), 5)]
    random.shuffle(group_names)

    result = {group_name: group for group_name, group in zip(group_names, groups)}

    # Save to Firestore
    for team_name, members in result.items():
        doc_ref = db.collection("formed_teams").document(team_name)
        member_dict = {member: True for member in members}
        doc_ref.set(member_dict)

    # Set upload lock
    db.collection("upload_control").document("team_upload_status").set({
        "uploaded": True,
        "timestamp": firestore.SERVER_TIMESTAMP,
        "uploaded_by": "system"
    })

    return {"message": "Teams uploaded successfully.", "teams": result}

# Admin-only endpoint to reset upload lock
@app.post("/reset-upload-lock/")
async def reset_upload_lock(authorization: Optional[str] = Header(None)):
    if authorization != "Bearer elabs":  #set loosely, as no update will be successful without the firebase credentials file
        return {"error": "Unauthorized"}, 401

    db.collection("upload_control").document("team_upload_status").set({
        "uploaded": False,
        "reset_by": "admin",
        "reset_timestamp": firestore.SERVER_TIMESTAMP
    })

    return {"message": "Upload lock reset. You may now re-upload the team file."}

@app.get("/get-teams/")
async def get_teams():
    """
    Return current teams in frontend-friendly format.
    """
    try:
        teams_ref = db.collection("formed_teams").stream()
        teams = []

        for i, doc in enumerate(teams_ref, start=1):
            team_name = doc.id
            members_dict = doc.to_dict()
            members = list(members_dict.keys())

            teams.append({
                "id": i,
                "name": team_name,
                "rank": i,
                "members": members
            })

        return {"teams": teams}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)