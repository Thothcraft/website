---
name: thoth-context
description: Know who is where and what is happening in a real space monitored by Thoth sensor nodes (laptops, Raspberry Pis, phones, ESP32 boards, watches). Reads a stable map of people, places, devices and activities that Brain builds from on-device sensor descriptors (radar, Wi-Fi CSI, BLE/Wi-Fi scans, IMU, microphone transcripts, camera person/face cues). Use this skill whenever the user asks about occupancy, presence, "is anyone home", "who is in the kitchen", what a room's sensors are picking up, wants a notification or automation when someone arrives/leaves, wants to calibrate occupancy, or mentions Thoth, thothcraft, whispy, hub.thothcraft.com or a thoth-*.local node — even if they don't say "context map".
license: MIT
metadata:
  version: "2"
  homepage: https://thothcraft.com/skill
  api: https://api.thothcraft.com
---

# Thoth context

Thoth nodes watch a space with sensors and send **short summaries**
(never raw video or audio) to Brain. Brain turns them into a **map**:
who is where, doing what, which rooms are occupied. You read the map,
or ask Brain to refresh it.

## Setup (once)

```bash
pip install "git+https://github.com/gadm21/whispy#subdirectory=packages/whispy"
export WHISPY_API_KEY=<token>        # or: python -c "import whispy; whispy.Client.login('email','password')"
```

```python
import whispy
client = whispy.Client()
```

No Python? Every call below is plain HTTPS with `Authorization: Bearer <token>`
against `https://api.thothcraft.com` — the REST path is shown next to each example.

## Pick a recipe

```
What does the user want?
├─ "Who's home / which rooms are busy?"          → 1. Read the map
├─ "What's happening in <room/node> right now?"  → 2. Read live scenes
├─ "Something just changed, check again"         → 3. Refresh the map
├─ "Tell me when someone arrives"                → 4. Notify on a node
├─ "Turn on the light when the room is occupied" → 5. Automate on a map state
├─ "Occupancy is wrong in this room"             → 6. Calibrate
└─ "No internet / just this computer"            → 7. Sense locally
```

### 1. Read the map

```python
m = client.context_map()                         # GET /v1/context/map
for r in m["relationships"]:
    print(r["subject"], r["predicate"], r["object"], r["confidence"])
for s in m["states"]:
    print(s["key"], s["entity_id"], s["value"])
```

Typical output:

```
person:gad located_in place:living-room 0.82
person:gad doing activity:working 0.71
device:3f2c… located_in place:living-room 0.95
occupancy.v1 place:living-room {'occupied': True}
```

Answer in plain words: *"Gad is in the living room, working (82%)."*
Lists live in `m["persons"]`, `m["places"]`, `m["devices"]`,
`m["activities"]`, `m["objects"]`; each item has `id`, `name`,
`aliases`, `confidence`, `last_seen`.

### 2. Read live scenes

Each node sends one summary per minute. It is already in words:

```python
for s in client.scenes(limit=5):                 # GET /v1/context/evidence?key=context.descriptors.v1
    print(s["device_id"], "-", s["scene"])
    for sid, sensor in s["sensors"].items():
        print("   ", sid, sensor.get("text"))
```

```
3f2c… - radar: high motion (SNR std 2.9 dB) | speech: "turn the lights off" | camera: 1 person visible; face: Gad (distance 6.8) | ble scan: 9 emitters; strongest watch -48 dBm
    radar-a316 radar: high motion (SNR std 2.9 dB)
    mic-9e6c microphone: moderate sound level; speech: "turn the lights off"
    camera-2c7d camera: 1 person visible; face: Gad (distance 6.8)
```

Structured versions are in `sensor["cues"]` (e.g. `cues["speech"]["text"]`,
`cues["people"]`, `cues["identity"]`, `cues["motion"]`) and the numbers in
`sensor["fields"]`.

### 3. Refresh the map

The map rebuilds by itself every 5 minutes. To refresh now:

```python
r = client.context_rebuild()                     # POST /v1/context/rebuild
print(r["proposal"]["summary"])
print(r["receipt"]["relationships"]["pending"])  # changes waiting for a 2nd confirmation
```

A change of room/activity needs **two agreeing builds** (or ≥ 85 %
confidence). To confirm a change quickly: rebuild, wait ~30 s, rebuild
again, then read the map.

### 4. Notify on a node

Nodes run built-in detectors (`builtin:occupancy-radar`,
`builtin:presence-ble`, `builtin:activity-imu`, …) and any installed
models. Add an automation to the node — it pushes a phone notification
through the Thoth app:

```python
dev = client.devices()[0].info.id
client.node_api(dev, "POST", "/api/automations", {          # POST /v1/nodes/{id}/api
    "name": "someone arrived",
    "trigger": {"type": "event", "on": "label", "label": "occupied"},
    "action": {"type": "notification",
               "config": {"title": "Someone arrived",
                          "body": "{label} ({confidence:.0%}) on {device_id}"}},
})
```

`client.node_api(dev, "GET", "/api/automations")` lists them;
`"DELETE", "/api/automations/<id>"` removes one.

### 5. Automate on a map state

Server rules fire once when a map state becomes true:

```python
client.add_rule(                                             # POST /v1/automation/rules
    "living room light",
    when={"key": "occupancy.v1", "entity_id": "place:living-room",
          "equals": {"occupied": True}, "min_confidence": 0.7},
    then={"device_id": dev, "actuator_id": "light-c483",
          "operation": "turn_on"},
    cooldown_s=600)
```

Find actuator ids with `client.node_api(dev, "GET", "/api/v1/actuators")`.

### 6. Calibrate

Detectors only predict after calibration. On the node (or via
`node_api` with the same paths):

```bash
thoth calibrate                        # list detectors + status
thoth calibrate occupancy-radar        # guided: follow the 2 prompts (~1 min each)
thoth calibrate occupancy-radar --auto # no prompts: learns from the last hour
```

| Detector | Sensor | Guided steps |
|---|---|---|
| `occupancy-radar` | mmWave radar | room empty → someone in the room |
| `occupancy-csi` | Wi-Fi CSI | empty → walk between TX and RX |
| `presence-ble` | BLE scan | phone/watch away → nearby |
| `activity-imu` | IMU / watch | still → walking |
| `noise-mic` | microphone | quiet → talking |

### 7. Sense locally

```python
import whispy
snap = whispy.snapshot(seconds=3)       # opens this machine's sensors for 3 s
print(snap["scene"])
```

Nothing leaves the machine. Speech, person and face cues appear when the
`whisper-stt`, `opencv-haar-person` and `opencv-haar-face` plugins are
installed; otherwise you still get rule-based sentences.

## Do / don't

- ✅ Quote confidence and age: *"probably in the kitchen (71 %, 2 min ago)"*.
- ✅ Treat `pending` changes and confidence < 0.6 as *maybe*.
- ✅ Use `client.scenes()` to explain **why** the map says something.
- ❌ Don't call `context_rebuild()` in a loop — at most twice a minute.
- ❌ Don't infer absence from silence: a stale scene (`age_s` large or
  `"stale"` in the text) means *unknown*, not *empty*.
- ❌ Don't invent ids — use the ids the map returns (`person:gad`, not `Gad`).

## Reference

**Map vocabulary.** Predicates: `located_in` (one place per subject),
`doing` (one activity per person), `uses`, `carries`, `observed_by`,
`part_of`, `near`. States: `occupancy.v1` per place
`{"occupied": bool}`, `presence.v1` per person `{"present": bool}`,
`activity.v1` per person `{"activity": str}`.

**Stability.** Devices come from the registry and are never created or
removed by the LLM. Renamed things keep their id through `aliases`.
Relationships unconfirmed for 30 min end; activities retire after a
day, people and objects after a week.

**Node uplink settings** (rate and detail of what a node sends):

```python
client.node_api(dev, "POST", "/api/v1/context/uplink",
                {"rate_s": 30, "detail": "full",
                 "text": {"speech": True, "person": True, "face": True}})
```

`detail`: `minimal` (predictions only), `descriptors` (default; numbers +
sentences), `full` (adds top radio emitters and room names).

**On the LAN.** Nodes answer at `http://thoth.local` (one node) or
`http://thoth-<name>.local` (several); API on port 5000 (desktop) or
5001 (Pi). `whispy.lan("thoth-chen.local", port=5001, token=<thoth token>)`.
MCP hosts can run `thoth mcp` instead of using HTTP.

**Errors.**

| Code | Meaning | Do |
|---|---|---|
| 401 | token missing/expired | log in again |
| 502 | model gave a bad answer on rebuild | retry once |
| 503 | rebuild unavailable | read the current map instead |
| 504 | node offline (relay) | try another node or the LAN |

Docs: https://docs.thothcraft.com · Hub: https://hub.thothcraft.com
