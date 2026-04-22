export interface UserDataType{

  "login": string,

  "id": number,

  "node_id": string,

  "avatar_url": URL,

  "gravatar_id": string,

  "url": URL,

  "html_url": URL,

  "followers_url": URL,

  "following_url": URL,

  "gists_url": URL,

  "starred_url": URL,

  "subscriptions_url": URL,

  "organizations_url": URL,

  "repos_url": URL,

  "events_url": URL,

  "received_events_url": URL,

  "type": string,

  "user_view_type": string,

  "site_admin": boolean,

  "score": number

}

export const defaultUserData: UserDataType = {

  "login": "",

  "id": 0,

  "node_id": "",

  "avatar_url": new URL('https://github.com/R:'),

  "gravatar_id": "",

  "url": new URL('https://github.com/R'),

  "html_url": new URL('https://github.com/R'),

  "followers_url": new URL('https://github.com/R'),

  "following_url": new URL('https://github.com/R'),

  "gists_url": new URL('https://github.com/R'),

  "starred_url": new URL('https://github.com/R'),

  "subscriptions_url": new URL('https://github.com/R'),

  "organizations_url": new URL('https://github.com/R'),

  "repos_url": new URL('https://github.com/R'),

  "events_url": new URL('https://github.com/R'),

  "received_events_url": new URL('https://github.com/R'),

  "type": "",

  "user_view_type": "",

  "site_admin": false,

  "score": 0

}