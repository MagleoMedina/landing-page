import type { IconType } from 'react-icons'
import { SiFirebase, SiHtml5, SiJavascript, SiKotlin, SiMongodb, SiNumpy, SiPython, SiReact, SiSqlite, SiSpringboot, SiTensorflow, SiVite } from 'react-icons/si'
import { FaAndroid, FaCss3Alt, FaCuttlefish, FaDesktop, FaGamepad, FaJava, FaLinux, FaMicrophone, FaWindowRestore } from 'react-icons/fa'
import { TbApi, TbBluetooth, TbBlocks, TbBrain, TbBroadcast, TbCode, TbCpu, TbDatabaseEdit, TbDeviceGamepad2, TbNetwork, TbPlugConnected, TbPuzzle, TbUsb, TbWorld } from 'react-icons/tb'

const TAG_ICONS: Record<string, IconType> = {
  android: FaAndroid,
  audio: FaMicrophone,
  bluetooth: TbBluetooth,
  'c#': FaCuttlefish,
  crud: TbDatabaseEdit,
  css: FaCss3Alt,
  customtkinter: FaWindowRestore,
  distribuidos: TbWorld,
  firebase: SiFirebase,
  grpc: TbBroadcast,
  html: SiHtml5,
  ia: TbBrain,
  java: FaJava,
  javascript: SiJavascript,
  juego: TbDeviceGamepad2,
  kotlin: SiKotlin,
  linux: FaLinux,
  'machine learning': SiTensorflow,
  microservicios: TbBlocks,
  mongodb: SiMongodb,
  multihilo: TbCpu,
  'mód': TbPuzzle,
  mod: TbPuzzle,
  numpy: SiNumpy,
  pygame: FaGamepad,
  python: SiPython,
  'react native': SiReact,
  rpc: TbApi,
  sockets: TbPlugConnected,
  sqlite: SiSqlite,
  'spring boot': SiSpringboot,
  swing: FaDesktop,
  tcp: TbNetwork,
  vite: SiVite,
  web: TbWorld,
  evdev: TbUsb,
}

const DEFAULT_TAG_ICON: IconType = TbCode

function normalizeTag(tag: string): string {
  return tag.toLowerCase().trim().replace(/\s+/g, ' ')
}

export function TagIcon({ tag, className }: { tag: string; className?: string }) {
  const Icon = TAG_ICONS[normalizeTag(tag)] ?? DEFAULT_TAG_ICON
  return <Icon className={className} aria-hidden="true" />
}