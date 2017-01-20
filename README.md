# angular-koala
Angular Koala:  api key based cache

Simple way to handle caching at client side.



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
angular-koala requires set of url's that needs to be cached.
The principal is simple: what goes in at GET, comes out at PUT/PATCH/DELETE
eg: if you have configured endponint `/api/v1/myapi`.
On `GET` request, the the response will cached. On either of `PUT/PATCH/DELETE`, the cache will be invalidated for `/api/v1/myapi`.

To add your url keys to angular-koala, add the keys to `keysToCache` in `cacheConfigHttpInterceptor`.


##TODO | NOTE

For real-time invalidation of cache, we need a functionality where the cache invalidation `key` would be broadcasted by server. This functionality can be provided using various options like:
- pubsub service like pubnub
- SignalR in ASP.NET
- node server

We have sample implementation of node sever using socket.io for real-time cache invalidation. Check `real-time_cache_invalidation_examples\node`.
