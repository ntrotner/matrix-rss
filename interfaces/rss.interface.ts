export interface rssEmitter {
  name: string,
  url: string
}

export interface rssRoom {
  roomURL: string,
  emitter: rssEmitter[]
}

export interface matrixServer {
  rssRooms: rssRoom[]
}

export interface ISettings {
  user: string,
  password: string,
  loginUrl: string,
  deviceId: string,
  hourInterval: number,
  lastUpdate: number,
  servers: matrixServer[]
}
