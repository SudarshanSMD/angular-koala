# angular-koala
Angular Koala:  api key based cache

angular-koala is straight business. You have to tell angular-koala when to cache and when to invalidate the cache.
angular-koala puts response in cache when `GET` request is made, while it invalidates the cache when `PUT/PATCH/DELETE` request is made. The configuration section tells more about how to tell angular-koala, when to cache and when to invalidate the cache.

#Install
Include angular-koala.js
```
<script src="/angular-koala/angular-koala.js"></script>
```

Add angular-koala dependency to your Angular app
```
angular.module("app", [ 'angular-koala']);
```


#Configuring angular-koala (compulsary)

angular-koala depends on user's input on what url are  to be cache.
The principal is simple: what goes in at GET, comes out at PUT/PATCH/DELETE.

You can have 2 configuration option:
I. Defining Set of url's
What goes in at GET of key, comes out at PUT/PATCH/DELETE of key.
eg: if you have configured endponint `/api/v1/myapi`.
On `GET` request, the the response will cached. On either of `PUT/PATCH/DELETE`, the cache will be invalidated for `/api/v1/myapi`.

To add your url keys to angular-koala, add the keys to `keysToCache` in `cacheConfigHttpInterceptor`.

II. Defining Map
What goes in at GET of key, comes out at PUT/PATCH/DELETE of any of values.
key: represents the url which should be cached on `GET`
values: represents the url's such that, on call of `PUT/PATCH/DELETE`, the corresponding url form key is to invalidated

eg: if you have entry in map as ("/api/v1/myapi", ["/api/v1/myapi", "/outsideapi/modifies/myapi"])
On GET request on `/api/v1/myapi`, the response will be cached.
ON PUT/PATCH/DELETE on either of `/api/v1/myapi` or `/outsideapi/modifies/myapi`, the cached repsonses for url `/api/v1/myapi` will be invalidated.




ps: you can search for configuration as #CONFIG

##TODO | NOTE

For real-time invalidation of cache, we need a functionality where the cache invalidation `key` would be broadcasted by server. This functionality can be provided using various options like:
- pubsub service like pubnub
- SignalR in ASP.NET
- node server

We have sample implementation of node sever using socket.io for real-time cache invalidation. Check `real-time_cache_invalidation_examples\node`.

ps: Seach //@@@ for checking what you need to modify for adding real-time caching to angular-koala
