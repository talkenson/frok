import { Device } from '@capacitor/device'

const getDeviceInfo = async () => {
  const info = await Device.getInfo()
}
