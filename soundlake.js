const request = require('request');
const qs = require('query-string');
const constants = require('./constants');

const ID_PREFIX = 'SoundCloud_Dialog';

const generateId = () => {
  return [ID_PREFIX, Math.ceil(Math.random() * 1000000).toString(16)].join('_');
};

const createURL = (options) => {
  return `https://soundcloud.com/connect?${qs.stringify(options)}`;
};

const stripExtra = (object, maximumProperties) => {
  let newObject = {};
  for(let key in maximumProperties) {
    if(object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }
  return newObject;
};

const ensureContains = (object, required) => {
  let okay = true;
  for(let key in required) {
    if(!object.hasOwnProperty(key)) {
      okay = false;
    }
  }
  return okay;
}

class SoundLake {
  constructor (options = {}) {
    for(let key in options) {
      this[key] = options[key];
    }
  }
  genRedirectLink (options = {}) {
    let linkOptions = Object.assign(this, options);
    if(ensureContains(linkOptions, constants.connectParamShape)) {
      return `<a href='${createURL(linkOptions)}'></a>`;
    } else {
      throw new Error(`Missing Required Parameters for Link: ${Object.keys(constants.connectParamShape).join(', ')}`);
    }
  }
  getRedirectURL (options = {}) {
    let linkOptions = Object.assign(this, options);
    if(ensureContains(linkOptions, constants.connectParamShape)) {
      return createURL(linkOptions);
    } else {
      console.log(linkOptions);
      throw new Error(`Missing Required Parameters for Link: ${Object.keys(constants.connectParamShape).join(', ')}`);
    }
  }
  getToken(callback, options = {}) {
    let tokenOptions = Object.assign(this, options);
    if(ensureContains(tokenOptions, Object.assign(constants.genericParams, constants.tokenParamShape))) {
      let url = `https://api.soundcloud.com/oauth2/token`;
      let r = request.post({url:url,formData: tokenOptions}, (err, resp, body) => {
        //Err will never be defined cause soundcloud is terrible?
        callback(err, resp, body);
      });
      return r;
    } else {
      throw new Error(`Missing Required Parameters for Link: ${Object.keys(constants.tokenParamShape).join(', ')}`);
    }
  }
  users (username, callback = (() => {}), options = {}) {
    let modifiedOptions = stripExtra(options, Object.assign(constants.genericParams, constants.userParamShape));
    if(modifiedOptions.query) {
      modifiedOptions.query = stripExtra(modifiedOptions.query, constants.userParamShape);
    };
    return this._genericRequest(username, callback, options, 'http://api.soundcloud.com/users/');
  }
  tracks (track, callback = (() => {}), options = {}) {
    let modifiedOptions = stripExtra(options, Object.assign(constants.genericParams, constants.trackParamShape));
    return this._genericRequest(track, callback, options, 'http://api.soundcloud.com/tracks/');
  }
  playlists (playlist, callback = (() => {}), options = {}) {
    let modifiedOptions = stripExtra(options, Object.assign(constants.genericParams, constants.playlistParamShape));
    return this._genericRequest(playlist, callback, modifiedOptions, 'http://api.soundcloud.com/playlists/');
  }
  comments (comment, callback = (() => {}), options = {}) {
    return this._genericRequest(comment, callback, options, 'http://api.soundcloud.com/comments/');
  }
  _genericRequest (thing, callback, options, baseUrl) {
    let client_id = options.client_id || this.client_id;
    let path = options.path || '';
    let method = options.method ? options.method.toLowerCase() : 'get';
    let q = options.query || {};
    if (typeof q !== 'object') {
      throw new Error(`Query must be of type Object`);
    }
    let queryString = qs.stringify(Object.assign({client_id: client_id}, q));
    if(client_id !== undefined) {
      let url = `${baseUrl}${thing}${path}?${queryString}`;
      let r = request[method](url, (err, resp, body) => {
        callback(err, resp, body);
      });
      return r;
    } else {
      throw new Error(`Missing client_id, pass as third argument as property of object`);
    }
  }
  self (oauthToken, callback = (() => {}), options = {}) {
    let method = options.method ? options.method.toLowerCase() : 'get';
    let path = options.path || '';
    if(oauthToken === undefined) {
      throw new Error('Missing oauth token, pass as first parameter');
    }
    let url = `https://api.soundcloud.com/me${path}?oauth_token=${oauthToken}`;
    let r = request[method](url, (err, resp, body) => {
      callback(err, resp, body);
    });
    return r;
  }
  resolve(url, callback = (() => {}), options = {}) {
    let client_id = options.client_id || this.client_id;
    let requestUrl = `http://api.soundcloud.com/resolve?url=${url}&client_id=${client_id}`;
    let r = request(requestUrl, (err, resp, body) => {
      callback(err, resp, body);
    });
    return r;
  }
  apps(app, callback = (() => {}), options = {}) {
    return this._genericRequest(app, callback, options, 'https://api.soundcloud.com/apps/');
  }
  oembed(url, callback = (() => {}), options = {}) {
    let modifiedOptions = stripExtra(options, constants.oembedParamShape);
    let queryString = qs.stringify(Object.assign({url: url}, modifiedOptions));
    let requestUrl = `http://soundcloud.com/oembed?${queryString}`;
    let r = request(requestUrl, (err, resp, body) => {
      callback(err, resp, body);
    });
    return r;
  }
}

let client_id = {client_id: 'b5bb126d5842703cc49f079bdba92d29'};
var sl = new SoundLake({client_id: 'b5bb126d5842703cc49f079bdba92d29'});

let options = {
  path: '',
  //Defaults to nothing, but if a specific user endpoint is needed,
  //this will be the part after the id
  method: 'GET', //Or any http verb, defaults to get
  
  query: {
      q: 'test',
      limit: 100,
  } //Defaults to an empty object, but if some parameter specific to that endpoint is
  //required it should be specifed as a property of query.
};
sl.users('',
        console.log, 
        options);


module.exports = SoundLake;