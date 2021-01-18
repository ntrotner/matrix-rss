export interface rss_room {
  roomURL: string,
  emitter: rss_emitter[]
}

export interface rss_emitter {
  name: string,
  url: string
}