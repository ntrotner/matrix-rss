export interface ISettings {
  userId: string,
  accessToken: string,
  hourInterval: number,
  lastUpdate: number,
  servers: matrix_server[]
}

export interface matrix_server {
  url: string,
  rssRooms: rss_room[]
}

export interface rss_room {
  roomURL: string,
  emitter: rss_emitter[]
}

export interface rss_emitter {
  name: string,
  url: string
}