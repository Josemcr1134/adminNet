const colors = require('tailwindcss/colors')

module.exports = {
    mode: "jit",
    content: [
        "./src/**/*.{html,ts}", './node_modules/tw-elements/dist/js/**/*.js'
    ],

    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {

        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tw-elements/dist/plugin')
    ],
}