let connectParamShape = {
  client_id: true,  //string  The client id belonging to your application
  redirect_uri: true, // string  The redirect uri you have configured for your application
  response_type: true, // enumeration (code, token)
  scope: true,  //string  '*'
  display: true, // string  Can specify a value of 'popup' for mobile optimized screen
  state: true //string  Any value included here will be appended to the redirect URI
};

  // response_type: 'code_and_token',
  // scope: options.scope || 'non-expiring',
  // display: 'popup'

let tokenParamShape = {
  client_id: true,
  client_secret: true,
  redirect_uri: true,
  grant_type: true,
  code: true
};

let oembedParamShape = {
  format: true,
  callback: true,
  maxwidth: true,
  maxheight: true,
  color: true,
  auto_play: true,
  show_comments: true,
  iframe: true
};

let userParamShape = {
  q: true, //string a string to search for (see search documentation)
  limit: true
};

let playlistParamShape = {
  representation: true,
  q: true,
  limit: true
};

let genericParams = {
  client_id: true,
  path: true,
  method: true,
  query: true
};

let trackParamShape = {
  q: true, // string  a string to search for (see search documentation)
  tags: true, // list  a comma separated list of tags
  filter: true, //  enumeration (all,public,private)
  license: true, // enumeration Filter on license. (see license attribute)
  bpm: true, //[from] number  return tracks with at least this bpm value
  // bpm: true, [to] number  return tracks with at most this bpm value
  duration: true, //[from]  number  return tracks with at least this duration (in millis)
  // duration[to]  number  return tracks with at most this duration (in millis)
  created_at: true, //[from]  date  (yyyy-mm-dd hh:mm:ss) return tracks created at this date or later
  // created_at[to]  date  (yyyy-mm-dd hh:mm:ss) return tracks created at this date or earlier
  ids: true,// list  a comma separated list of track ids to filter on
  genres: true,//list  a comma separated list of genres
  types: true,//enumeration a comma separated list of types
  limit: true
}

module.exports = {
  connectParamShape,
  tokenParamShape,
  oembedParamShape,
  userParamShape,
  playlistParamShape,
  trackParamShape,
  genericParams
};