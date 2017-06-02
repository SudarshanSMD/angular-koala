# angular-koala
___
##  angular-koala real-time invalidation implementation using node socket.io
___
This example shows how angular-koala can be configured for real-time invalidation using socket.io


### pubsubserver  
Is a node server for managing real-time cache invalidation.  
The functionality of server is very simple. When a client emits 'cache-invalidate-key', the sever broadcasts it to all clients. The client then  use the key to invalidate cache.


### angular-koala

Contains the file to be used if you are using node socket.io in your angular app for real-time caching support.



## Extra configuration Configuring angular-koala (compulsary)
___

Change the `$socketProvider.setConnectionUrl('http://localhost:3000');` in angular-koala/angular-koala.js according to your sever.


Include socket.io.js in your project

```
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
```
