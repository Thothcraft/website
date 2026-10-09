export type HardwareId = 'thoth-one' | 'esp32' | 'pinetime'

export interface HardwareSpec {
  id: HardwareId
  name: string
  tagline: string
  specs: [string, string][]
  features: string[]
  docs: string
}

/** Official fleet hardware — values match the shipped firmware/configs. */
export const HARDWARE: Record<HardwareId, HardwareSpec> = {
  'thoth-one': {
    id: 'thoth-one',
    name: 'Thoth One',
    tagline: 'Raspberry Pi 5 + MMW-HAT 60 GHz radar in a 3D-printed enclosure',
    specs: [
      ['Compute', 'Raspberry Pi 5 · BCM2712 quad Cortex-A76 @ 2.4 GHz'],
      ['Memory', '4 / 8 GB LPDDR4X'],
      ['Radar', 'Infineon BGT60TR13C FMCW · 58–63 GHz · 1 TX / 3 RX'],
      ['Radar link', 'SPI0 mode 0 · 10–50 MHz · RST GPIO12 · IRQ GPIO25'],
      ['Range resolution', '≈7.5 cm at 2 GHz sweep (58–60 GHz profile)'],
      ['Connectivity', 'Gigabit Ethernet · Wi-Fi 5 · Bluetooth 5.0 / BLE'],
      ['I/O', '2× USB 3.0 · 2× USB 2.0 · 2× micro-HDMI · 40-pin GPIO'],
      ['Power', 'USB-C 5 V / 5 A (27 W)'],
      ['Enclosure', 'PLA/PETG print · hinged lid · radome window over the antennas'],
      ['Local access', 'http://thoth-<name>.local:5000 (dashboard + API)'],
    ],
    features: [
      'Presence, motion and XY localisation from radar — no camera needed',
      'Optional USB camera and ESP32 CSI boards as extra modalities',
      'Runs the thoth node daemon: sensors, models, automations, Brain uplink',
    ],
    docs: 'https://docs.thothcraft.com/#/hardware/thoth-one',
  },
  esp32: {
    id: 'esp32',
    name: 'ESP32-C6 CSI board',
    tagline: 'One firmware image — send, recv or zb role chosen at runtime',
    specs: [
      ['Board', 'ESP32-C6-DevKitC-1 · 51.8 × 25.4 mm'],
      ['MCU', 'RISC-V HP core 160 MHz + LP core 20 MHz · 512 KB SRAM'],
      ['Radios', 'Wi-Fi 6 (2.4 GHz) · BLE 5 · IEEE 802.15.4 (Thread/Zigbee)'],
      ['Sensing', 'Wi-Fi CSI (HT20, 64 subcarriers) · ESP-NOW probes @ 100 Hz'],
      ['Channel sweep', 'Sender-led hop across 1 / 6 / 11 · 500 ms dwell · receivers follow'],
      ['Scan feeds', 'WIFI_DATA · BLE_DATA · ZB_DATA · HEALTH_DATA · SELF_DATA'],
      ['Host link', 'USB-C serial @ 921600 baud'],
      ['Local access', 'http://thoth-<name>.local:5000 when joined to Wi-Fi'],
    ],
    features: [
      'Same image on every board — no tx/rx builds; `role=send|recv|zb`',
      'Wi-Fi uplink with status dashboard + mDNS (`wifi=<ssid>,<pass>`)',
      'Identity beacon advertised as thoth-<name> over BLE',
    ],
    docs: 'https://docs.thothcraft.com/#/hardware/esp32',
  },
  pinetime: {
    id: 'pinetime',
    name: 'PineTime (thothWatch)',
    tagline: 'Wrist IMU + heart-rate node on the thothWatch InfiniTime fork',
    specs: [
      ['SoC', 'Nordic nRF52832 · Cortex-M4F 64 MHz · 512 KB flash · 64 KB RAM'],
      ['Display', '1.3" 240 × 240 IPS LCD, capacitive touch'],
      ['Sensors', 'Bosch BMA421 3-axis accelerometer · HRS3300 PPG heart rate'],
      ['Storage', '4 MB SPI NOR flash'],
      ['Radio', 'Bluetooth 5 LE'],
      ['Battery', '180 mAh Li-Po · ~1 week typical'],
      ['Firmware', 'InfiniTime 1.16.99-thoth · stamped motion (0x00030003) · scan svc'],
      ['GPS', 'None on the watch — location comes from the paired phone'],
    ],
    features: [
      'Streams motion, steps, heart rate and battery to Brain via the phone',
      'Watch-side BLE neighbour scan for wrist-level proximity',
      'OTA updates (DFU zip) from the Thothcraft app',
    ],
    docs: 'https://docs.thothcraft.com/#/hardware/pinetime',
  },
}
