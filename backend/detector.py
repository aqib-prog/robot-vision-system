from ultralytics import YOLO
import numpy as np


# Model
model = YOLO("yolo11n.pt")

RISK_MAP = {
    "person": "danger",
    "car": "danger",
    "truck": "danger",
    "motorcycle": "danger",
    "bicycle": "warn",
    "dog": "warn",
    "cat": "warn",
    "chair": "warn",
    "bottle": "safe",
    "laptop": "safe",
    "book": "safe",
    "cup": "safe",

}


def detect(image_array: np.ndarray) -> list:
    results = model(image_array, verbose=False)[0]
    detections = []

    for box in results.boxes:
        label = model.names[int(box.cls)]
        confidence = float(box.conf)
        risk = RISK_MAP.get(label, "safe")

        detections.append({
            "name": label,
            "confidence": round(confidence, 2),
            "risk": risk
        })

    return detections
