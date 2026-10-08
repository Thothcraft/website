---
name: thoth-context-map
description: Build and read a stable semantic context map (persons, places, devices, activities, objects) from heterogeneous physical sensor descriptors on attached Thoth nodes. Use when an agent needs to know who/what is where and doing what in a physical space monitored by Thoth nodes (laptops, Raspberry Pis, phones, ESP32 boards, watches).
version: 1
homepage: https://thothcraft.com/skill.md
---

# Thoth context-map skill

Thoth nodes turn sensors (mmWave radar, Wi-Fi CSI, BLE/Wi-Fi scans,
IMU, microphone, camera, built-in telemetry) into **physical
descriptors** — compact per-sensor statistics, never raw frames. Brain
(the cloud API) feeds those descriptors to an LLM context builder that
maintains a **stable** map of persons, places, devices, activities and
objects. This skill tells you how to discover nodes, inspect their
descriptors, trigger a map build and read a trustworthy result.

## 0. What you need

| Item | Where it comes from |
|---|---|
| Brain URL | `https://api.thothcraft.com` (override with `WHISPY_API_URL`) |
| User token | `POST /api/token` with `{"username","password"}` → `access_token`; or env `WHISPY_API_KEY` |
| Node local token (LAN only) | `thoth token` on the node, or the hub device page |

Send `Authorization: Bearer <token>` on every request. Never log tokens.

Two equivalent surfaces — prefer the Python SDK when you can run code:

```bash
pip install "git+https://github.com/gadm21/whispy#subdirectory=packages/whispy"
```

```python
import whispy
client = whispy.Client()            # uses WHISPY_API_KEY or ~/.whispy/credentials.json
```

If you are an MCP host, run `thoth mcp` on a node instead — it exposes
the same context/event model as tools over stdio.

## 1. Discover attached nodes

```python
for dev in client.devices():
    print(dev.info.id, dev.info.name, dev.info.type)
```

REST: `GET /v1/devices` → `{"devices":[{"device_id","device_name","device_type","online",...}]}`.

On the same LAN, nodes advertise mDNS: `thoth.local` when there is a
single node, `thoth-<name>.local` when there are several (e.g.
`thoth-chen.local`). Local API: `http://<host>:5000` (desktop) or
`:5001` (Pi), dashboard on port 80.

```python
pi = whispy.lan("thoth-chen.local", port=5001, token="<local token>")
print([s.id for s in pi.sensors()])
```

## 2. Inspect physical descriptors

Every node uplinks one `context.descriptors.v1` observation per
`rate_s` (default 60 s). Read the recent ones:

```python
ev = client._http.request("GET", "/v1/context/evidence",
                          params={"key": "context.descriptors.v1", "limit": 20})
```

Shape of `value.value` (detail level `descriptors`):

```json
{
  "detail": "descriptors", "rate_s": 60, "window_s": 2.0,
  "predictions": {"builtin:occupancy-radar": {"label": "occupied", "confidence": 0.93}},
  "estimates":   [{"key": "presence.v1", "subject": "person:gad", "value": {"present": true}}],
  "sensors": {
    "radar-a316": {"type": "radar", "n": 20, "rate_hz": 10.0, "age_s": 0.1,
                    "fields": {"snr_db": {"mean": 14.2, "std": 2.9, "min": 9.1, "max": 19.8}}},
    "radio-24d8": {"type": "ble_scan", "n": 4, "scan": {"emitters": 11}}
  }
}
```

Reading descriptors:

* `fields.<name>.std` over radar SNR / CSI amplitude ≈ motion energy;
  high std with fresh `age_s` means activity in the field of view.
* `scan.emitters` counts distinct BLE/Wi-Fi emitters; detail `full`
  adds `scan.top` with RSSI and decoded beacon identities.
* `age_s` large (> 3× rate) means stale — treat as unknown, not absent.
* `predictions` come from calibrated on-node discriminators
  (`builtin:*`) or deployed models; they are **evidence, not truth**.

Change uplink rate/detail on a node (needs local token or relay):

```bash
thoth uplink --rate 30 --detail full
```

```python
client.node_api("<device_id>", "POST", "/api/v1/context/uplink",
                {"rate_s": 30, "detail": "full"})
```

## 3. Build the map

The builder runs automatically every 5 minutes for users with fresh
evidence. To build now (e.g. after a change you caused):

```python
res = client.context_rebuild(window_s=900)     # POST /v1/context/rebuild
print(res["proposal"]["summary"])
print(res["receipt"]["relationships"])         # created / refreshed / ended / pending
```

`dry_run=True` returns the LLM proposal without writing.

## 4. Read the map

```python
m = client.context_map()                       # GET /v1/context/map
```

```json
{
  "persons":    [{"id": "person:gad", "name": "Gad", "aliases": ["aa:bb:..."], "confidence": 0.82, "last_seen": 1760000000}],
  "places":     [{"id": "place:living-room", ...}],
  "devices":    [{"id": "device:<uuid>", "name": "thoth-chen", ...}],
  "activities": [{"id": "activity:sitting", ...}],
  "objects":    [],
  "relationships": [{"subject": "person:gad", "predicate": "located_in", "object": "place:living-room", "confidence": 0.8}],
  "states":     [{"key": "occupancy.v1", "entity_id": "place:living-room", "value": {"occupied": true}, "confidence": 0.9}],
  "builder":    {"builds": 42, "last_build_at": 1760000000, "last_summary": "...", "pending": 1}
}
```

Predicates: `located_in` (one active place per subject), `doing` (one
active activity per person), `uses`, `carries`, `observed_by`,
`part_of`, `near`. State keys: `occupancy.v1` (per place),
`presence.v1` (per person), `activity.v1` (per person).

## 5. Stability rules you can rely on

* **Devices** come from the registry (`device:<uuid>`); the LLM can
  relate them but never create, rename or retire them.
* **Ids are stable**: renamed or re-detected things resolve through
  `aliases` onto the existing id.
* **Hysteresis**: changing a person's place/activity or a state value
  needs two consecutive builds agreeing, or one at confidence ≥ 0.85.
  `builder.pending > 0` means a change is awaiting confirmation.
* **Confidence floor** 0.5: weaker proposals are ignored.
* **Decay**: relationships unconfirmed for 30 min end; persons/objects
  unseen for 7 days and activities for 1 day retire. States expire
  30 min after their last confirmation.

So: a single build can be trusted to not flap. To confirm a change
quickly, rebuild twice a minute apart and compare.

## 6. Verify (recommended agent loop)

1. `client.context_map()` → note `builder.builds`.
2. `client.context_rebuild()` twice, ≥ 30 s apart.
3. `client.context_map()` again. Report entities/relationships whose
   ids are unchanged between steps 1 and 3 as **stable**; report
   entries only present in `receipt.relationships.pending` as
   **tentative**.
4. Cite descriptor evidence (sensor id, field, value, age) for every
   claim you make to the user.

## 7. Acting on context

* Notifications/automations on a node trigger from predictions:
  `POST /api/v1/automations` (local) — see the docs.
* Server-side rules on map states:

```python
client.add_rule("occupied-light",
                when={"key": "occupancy.v1", "value": {"occupied": True}},
                then={"type": "notification", "config": {"title": "Room occupied"}})
```

* Live feed of transitions: `client.event_stream(kind="prediction")`
  (SSE `GET /v1/events/stream`).

## 8. Calibrating discriminators (improves descriptors → predictions)

```bash
thoth calibrate occupancy-radar            # guided: follow the printed steps
thoth calibrate occupancy-radar --auto     # unlabeled 2-means from recent history
```

Recipes: `occupancy-radar`, `occupancy-csi`, `presence-ble`,
`activity-imu`, `noise-mic`. An uncalibrated discriminator never
predicts.

## Errors

| Status | Meaning | Do |
|---|---|---|
| 401 | bad/expired token | re-login (`POST /api/token`) |
| 503 on rebuild | LLM not configured or unavailable | read the existing map; retry later |
| 502 on rebuild | model did not return a valid proposal | retry once |
| 504 on node relay | node offline / tunnel down | use LAN `whispy.lan(...)` or another node |

Docs: https://docs.thothcraft.com · Hub: https://hub.thothcraft.com
