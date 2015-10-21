require.config({
    baseUrl: "bin/",
    shim: {

    },
    paths: {
        backbone: "deps/backbone/backbone",
        jquery: "deps/jquery/dist/jquery",
        react: "deps/react/react-with-addons",
        'react-router': "deps/react-router/build/umd/ReactRouter",
        altlib: "deps/alt/dist/alt-with-addons",
        "socket.io-client": "deps/socket.io-client/socket.io",
        underscore: "deps/underscore/underscore",
        classnames: "deps/classnames/index"
    },
    map: {
        '*': {
            'react/addons': 'react'
        }
    },
    packages: [

    ]
});
