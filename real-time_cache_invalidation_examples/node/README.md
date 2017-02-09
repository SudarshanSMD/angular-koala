#angular-koala real-time invalidation implementation using node socket.io


##pubsubserver
Is node server for managing real-time cache invalidation.
The functionality of server is very simple. When a client emit 'cache-invalidate-key' the sever broadcasts it to all clients.


##angular-koala folder

Contains the file to be used if you are using node socket.io in your angular app for real-time caching support.



# Extra configuration Configuring angular-koala (compulsary)

Change the `$socketProvider.setConnectionUrl('http://localhost:3000');` in angular-koala.


Include socket.io.js

```
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
```
