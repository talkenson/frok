import { create } from 'zustand'
import { DeviceInfo } from '@capacitor/device'
import { devtools, persist } from 'zustand/middleware'

type DeviceInfoStore = {
  deviceInfo: DeviceInfo | null
  setDeviceInfo: (deviceInfo: DeviceInfo) => void
}

export const useDeviceInfoStore = create<DeviceInfoStore>()(
  devtools(
    persist(
      (set, get) => ({
        deviceInfo: null,
        setDeviceInfo: (deviceInfo: DeviceInfo) => set({ deviceInfo }),
      }),
      {
        name: 'deviceInfo-store',
      },
    ),
  ),
)
