#  Robot Vision System

An AI-powered robot vision and behavior engine built with YOLOv11, FastAPI, and React.

## What it does
- Accepts an image from the user
- Runs YOLOv11 object detection on the scene
- Classifies detected objects by risk level (safe / warn / danger)
- Outputs robot behavior decisions: movement command, alert level, and command queue

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Object Detection | YOLOv11 (Ultralytics) |
| Backend | Python, FastAPI |
| Frontend | React, Vite |
| Communication | REST API |

## Project Structure

```
robot-vision-system/
├── backend/
│   ├── main.py          # FastAPI server
│   ├── detector.py      # YOLOv11 detection logic
│   ├── behavior.py      # Behavior decision engine
│   └── requirements.txt
├── frontend/
│   └── src/
│       └── App.jsx      # React UI
└── README.md
```

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## How it works
1. User uploads a scene image
2. FastAPI receives the image and passes it to YOLOv11
3. Detected objects are classified by risk level
4. Behavior engine decides movement, alert level and command queue
5. React frontend displays the full robot decision output
