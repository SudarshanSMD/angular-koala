/**
 * angular-koala
 *
 * Example with node socket.io
 */
(function () {
    // using the function form of use-strict
    "use strict";

    angular.module('angular-koala', ['socket.io']);

    /**
     * Defining the customCache provider. We are defining provider instead of
     * factory or a service, as provider is available during configuration phase
     * of the app. One could use the customCache provider to set the default $http
     * cache.
     */
    angular.module('angular-koala').provider('customCache', function customCacheProvider() {
        this.$get = ['$cacheFactory', function customCacheProvider($cacheFactory) {
            if (!$cacheFactory.get('customCache')) {
                return $cacheFactory('customCache');
            } else {
                return $cacheFactory.get('customCache');
            }
        }]
    });

    /**
     * cacheConfigHttpInterceptor for intercepting the $http request.
     * Here we will check if the url is configured for caching. If url is configured for caching,
     * cache addition or invalidation is configured, depending upon http verb.
     */
    angular.module('angular-koala').factory('cacheConfigHttpInterceptor', function ($q, customCache, $socket) {
        //Configuring the url's to be cached.
        //We use cache.removeKeysContaining method to remove the keys for cache. So,
        //every request that has been cached containing that particualar key is removed.
        //It is important that API is RESTful.
        // If your API is not RESTful and you are worried about some api calls not invalidating the cache.
        // You can also go ahead and use something like key-set pairs, where for a given key,
        // a set of keys shall be removed from cache. In wihch case, every matching key to be removed should be iterated and
        // we shall call removeKey() instead of removeKeysContaining() in such case.

        // #CONFIG: url to be cached
        var keysToCache = new Set();
        keysToCache.add("/api/v1/endpoint1");
        keysToCache.add("/api/v1/endpoint2");

        return {
            'request': function (config) {
                //TODO: optimize checking of keysToCache in url
                for (var key of keysToCache) {
                // check if url contains the key
                    if (config.url.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1) {
                        //console.log(config);
                        if (config.method === "GET") {
                            //console.log("### angular-koala: myHttpInterceptor GET");
                            /*
                             * Modifying the config to mark the CACHE policy.
                             */
                            config.cache = customCache;
                        } else if (config.method === "PUT" || config.method === "PATCH" || config.method === "DELETE") {
                            //console.log("### angular-koala: myHttpInterceptor NEEDS TO INVALIDATE CACHE");
                            customCache.removeKeysContaining(key.toString());
                            //If node  socket.io starts
                            $socket.emit('cache-invalidate-key', key.toString());
                            //If node socket.io ends
                        }
                    }
                }
                return config;
            }
            // you can also itercept: 'requestError', 'response' and 'responseError'
        };
    });


    /**
     * Configuring angular-koala module
     */
    angular.module('angular-koala').config(['$provide', '$httpProvider', function ($provide, $httpProvider) {

        /**
         * Decorator for customCache.
         * Here wer are mainting a set of 'keys' which enables to have method like getKeys() and removeKeysContaining(),
         * which are not available in angualr's cache.
         * getKeys() method could be used to retrive all the keys in cache, and can be used for
         * custom cache invalidation strategy.
         *
         */
        // monkey-patching customCache to modify default methods
        $provide.decorator('customCache', [
            '$delegate', function ($delegate) {

                // set to maintain keys in cache
                var keys = new Set();

                var origPut = $delegate.put;
                var orgRemove = $delegate.remove;
                var orgRemoveAll = $delegate.removeAll;

                // putting key in the keys set
                $delegate.put = function (key, value) {
                    keys.add(key);
                    return origPut(key, value);
                };

                $delegate.remove = function (key) {
                    orgRemove(key);
                    keys.delete(key);
                };

                $delegate.removeAll = function () {
                    orgRemoveAll();
                    keys = new Set();
                };

                /**
                 * To remove keys containing a particular string.
                 * This could be used to invalidate cache for matching endpoints.
                 * eg: key 'workflow' will invalidate /api/v1/wofklows/id1, api/v1/workflows, etc.
                 */
                $delegate.removeKeysContaining = function (matchString) {
                    for (var key of keys) {
                        if (key.toString().toLowerCase().indexOf(matchString.toLowerCase()) !== -1) {
                            orgRemove(key);
                            keys.delete(key);
                        }
                    }
                };

                /**
                 *  To get all keys in the cache.
                 */
                $delegate.getKeys = function () {
                    return keys;
                };

                return $delegate;
            }
        ]);



        /**
         * Configuring the module to add iterceptor.
         */
        $httpProvider.interceptors.push('cacheConfigHttpInterceptor');
    }]);

    //If node  socket.io starts

    /**
     * Setting the node server connection url
     */
    angular.module('angular-koala').config(['$socketProvider',  function ($socketProvider) {
        //#CONFIG: node server connection url
        $socketProvider.setConnectionUrl('http://localhost:3000');
    }]);

    /**
     * Setting action
     */
    angular.module('angular-koala').run(function ($socket, customCache) {
        $socket.on('cache-invalidate-key', function (key) {
            customCache.removeKeysContaining(key.toString());
        });
    });
    //If node socket.io ends

})();
