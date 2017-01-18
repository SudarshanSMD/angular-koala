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


##TODO | NOTE | WARNING!
- [] Real-time invalidation of cache

  Right now we don't have real-time angular-koala cache invalidation functionality in place. This means that, cache that has been invalidated at one client will not invalidated at other clients. In order to do this, we would need functionality where in server send invalidation message along with the key to be invalidated.
