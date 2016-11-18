# SoundLake

Unofficial SDK for SoundCloud

![Sound Cloud Icon](https://lh3.googleusercontent.com/p7L13rD58bcY0HZ1gczQ0C-BqNqRTefFI3fbxIe9Qid4LPBDiTo0EzDTHruagjHj3HWy=w170)

Simple to use for all Soundcloud resources!

#### Installation

```sh
    $ npm install soundlake
```

#### Usage

##### Connect User:
Built-in access to get url, although it probably shouldn't be dynamically generated.
```javascript
const SoundLake = require('soundlake');
var sl = new SoundLake();
sl.getRedirectURL({client_id: 'YOUR_CLIENT_ID', 
                   redirect_uri: 'YOUR_URI',
                   response_type: 'code_and_token', //Or could be just one.
                   scope: '*', //Might want to specify a different scope.
                   display: 'popup', //Only for mobile and none is ok
                   state: 'For maintaining when returning to redirect'
                   });
=> https://soundcloud.com/connect?client_id=YOUR_CLIENT_ID&display=popup&redirect_uri=YOUR_URI&response_type=code_and_token&scope=%2A&state=For%20maintaining%20when%20returning%20to%20redirect
```

##### Get Access Token:

```javascript
var sl = new SoundLake({client_id: 'YOUR_CLIENT_ID'});
sl.getToken((err, resp, body) => someCallback(err, resp, body),
    {client_id: 'WILL_OVERRIDE_ONE_SET_BEFORE', 
    client_secret: 'YOUR_SECRET',
    redirect_uri: 'YOUR_REDIRECT_URI',
    grant_type: 'authorization_code, refresh_token, password, client_credentials, oauth1_token',
    code: 'auth code received when user is sent to redirect'});
```

#### Users

```javascript
//Assuming client_id is set on creation
let options = {
    path: '/followings/lamar',
    //Defaults to nothing, but if a specific user endpoint is needed,
    //this will be the part after the id
    method: 'DELETE', //Or any http verb, defaults to get
    query: {
        q: 'Search String',
        limit: 10 //Number of users returned
    } //Defaults to an empty object, but if some parameter specific to that endpoint is
    //required it should be specifed as a property of query.
};
sl.users('SOME_USERNAME OR ID#',
        callback(err, resp, body) => someCB(err, resp, body), 
        options);
```

#### tracks

```javascript
//Functions exact same as the one above, except query options are different
//As according to Soundcloud's HTTP API.

sl.tracks('scrub', console.log).on('response', ...);
// Every call to the API returns a request object which has listeners, so you can add pipes, etc.
```



> Made because SoundCloud's SDK is... 

## Github


[![Git Icon](http://www.pngall.com/wp-content/uploads/2016/04/Github-Free-PNG-Image.png)](https://github.com/JulianKnodt/soundlake)

License
----

MIT


**Free Software, Hell Yeah!**

