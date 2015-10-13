require.config({
    baseUrl: "bin/",
    shim: {

    },
    paths: {
        backbone: "deps/backbone",
        jquery: "deps/jquery",
        react: "deps/react-with-addons",
        altlib: "deps/alt-with-addons",
        "socket.io-client": "deps/socket.io",
        underscore: "deps/underscore"
    },
    map: {
        '*': {
            'react/addons': 'react'
        }
    },
    packages: [

    ]
});
