def decide(detections: list) -> dict:
    if not detections:
        return {
            "movement": "ADVANCE",
            "alert_level": "LOW",
            "primary_action": "Scan surrondings",
            "command_queue": ["SCAN_PERIMETER", "MOVE_FORWARD"]
        }

    risks = [d["risk"] for d in detections]

    if "danger" in risks:
        movement = "HALT"
        alert_level = "HIGH"
        primary_action = "Stop and assess threat"
        commands = ["HALT", "ALERT_OPERATOR",
                    "SCAN_PERIMETER", "AWAIT_INSTRUCTION"]

    elif "warn" in risks:
        movement = "NAVIGATE AROUND"
        alert_level = "MEDIUM"
        primary_action = "Avoid obstacle cautiously"
        commands = ["SLOW_DOWN", "AVOID_OBSTACLE", "REROUTE", "RESUME_PATROL"]

    else:
        movement = "ADVANCE"
        alert_level = "LOW"
        primary_action = "Path is clear, proceed"
        commands = ["MOVE_FORWARD", "SCAN_PERIMETER"]

    return {
        "movement": movement,
        "alert_level": alert_level,
        "primary_action": primary_action,
        "command_queue": commands,
        "objects": detections
    }

