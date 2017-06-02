# angular-koala
___
Angular Koala:  api key(endpoint) based cache with real-time cache invalidation

angular-koala exploits cache provided by angular's $cacheFactory.

angular-koala uses HTTP verbs as basis for caching strategy. It caches response when `GET` request is made, while it invalidates the cache when `PUT/PATCH/DELETE` request is made. What all api endpoints will be cached depend on the configuration. The configuration section tells more about how to tell angular-koala, when to cache and when to invalidate the cache.

Note: real-time cache invalidation is not available out of the box. Which is a bummer.

## Install
___
Include angular-koala.js
```
<script src="/angular-koala/angular-koala.js"></script>
```

Add angular-koala dependency to your Angular app
```
angular.module("app", [ 'angular-koala']);
```


## Configuring angular-koala (compulsary)
___

angular-koala depends on user's input on what url are  to be cache.
The principal is simple: what goes in at GET, comes out at PUT/PATCH/DELETE.

You have two configuration option:

I. Defining Set of enndpoints  
What goes in at GET of key, comes out at PUT/PATCH/DELETE of key.  
eg: Consider entry in set as `/api/v1/myapi`.  
On `GET` request, the response will cached. On either of `PUT/PATCH/DELETE`, the cache will be invalidated for `/api/v1/myapi`.

To add your endpoint keys to angular-koala, add the keys to `keysToCache` in `cacheConfigHttpInterceptor`.

II. Defining Map of endpoints
What goes in at GET of key, comes out at PUT/PATCH/DELETE of any of values.  
key: represents the endpoint which should be cached on `GET`  
values: represents the endpoints such that, a `PUT/PATCH/DELETE` endpoint defined in any of the values will invalidate cache corresponding to endpoint defined in key.  
This approach could be used, if your api is not RESTful, such that there are different/multiple endpoints that modifies same resource.

eg: Consider entry in map as ("/api/v1/myapi", ["/api/v1/myapi", "/outsideapi/modifies/myapi"])
On `GET` request on `/api/v1/myapi`, the response will be cached.
ON `PUT/PATCH/DELETE` on either of `/api/v1/myapi` or `/outsideapi/modifies/myapi` the cached responses for endpoint `/api/v1/myapi` will be invalidated.



ps: you can search for configuration in angular-koala.js by searching for `#CONFIG`

#### TODO | NOTE
___

For real-time invalidation of cache, we need a functionality where the cache invalidation `key` would be broadcasted by server. This functionality can be provided using various options like:
- pubsub service like pubnub
- SignalR in ASP.NET
- node server

We have sample implementation of node sever using socket.io for real-time cache invalidation. Check `real-time_cache_invalidation_examples\node`.

ps: Search `//@@@` in angular-koala.js for checking what you need to modify in order to add real-time caching to angular-koala
