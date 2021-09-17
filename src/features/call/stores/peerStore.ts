import create from "zustand";

type PeerStore = {
  peerId: string,
  setPeerId: (peerId: string) => void,
  isPeerConnected: boolean,
  setIsPeerConnected: (isConnected: boolean) => void,
}

const usePeerStore = create<PeerStore>(set => ({
  peerId: '',
  setPeerId: (peerId) => set(_state => ({ peerId })),
  isPeerConnected: false,
  setIsPeerConnected: (isPeerConnected) => set(_state => ({ isPeerConnected }))
}))

export default usePeerStore