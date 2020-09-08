# js13k-2020

Requires npm

Run ```npm run serve```, then browse to ```localhost:{port}``` to launch the game


# Audio

https://andyhall.github.io/webaudio-instruments/

https://learningsynths.ableton.com/en/

https://keithclark.github.io/ZzFXM/

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            sourceMap: false,
            extractComments: false, // To avoid separate file with licenses.
            terserOptions: {
                mangle: {
                    properties: {
                        regex: /.*/
                    }
                },
                module: true,
                sourceMap: false,
                keep_classnames: false,
                keep_fnames: false,
                toplevel: true,
            },
        })],
    },
