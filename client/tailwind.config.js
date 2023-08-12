const plugin = require('tailwindcss/plugin')

const safeAreaPlugin = plugin(
  ({ addUtilities, addComponents, e, config, theme, matchUtilities }) => {
    const addSafeAreaInset = (side, value) =>
      `calc(${value} + env(safe-area-inset-${side}))`
    const addMaxSafeAreaInset = (side, value) =>
      `max(env(safe-area-inset-${side}), ${value})`

    matchUtilities(
      {
        pts: value => ({
          paddingTop: addSafeAreaInset('top', value),
        }),
        prs: value => ({
          paddingRight: addSafeAreaInset('right', value),
        }),
        pbs: value => ({
          paddingBottom: addSafeAreaInset('right', value),
        }),
        pls: value => ({
          paddingLeft: addSafeAreaInset('left', value),
        }),
        pxs: value => ({
          paddingLeft: addSafeAreaInset('left', value),
          paddingRight: addSafeAreaInset('right', value),
        }),
        pys: value => ({
          paddingTop: addSafeAreaInset('top', value),
          paddingBottom: addSafeAreaInset('bottom', value),
        }),
        mpys: value => ({
          paddingTop: addMaxSafeAreaInset('top', value),
          paddingBottom: addMaxSafeAreaInset('bottom', value),
        }),
        ps: value => ({
          paddingTop: addSafeAreaInset('top', value),
          paddingBottom: addSafeAreaInset('bottom', value),
          paddingLeft: addSafeAreaInset('left', value),
          paddingRight: addSafeAreaInset('right', value),
        }),
        mts: value => ({
          marginTop: addSafeAreaInset('top', value),
        }),
        mrs: value => ({
          marginRight: addSafeAreaInset('right', value),
        }),
        mbs: value => ({
          marginBottom: addSafeAreaInset('bottom', value),
        }),
        mls: value => ({
          marginLeft: addSafeAreaInset('left', value),
        }),
        mxs: value => ({
          marginLeft: addSafeAreaInset('left', value),
          marginRight: addSafeAreaInset('right', value),
        }),
        mys: value => ({
          marginTop: addSafeAreaInset('top', value),
          marginBottom: addSafeAreaInset('bottom', value),
        }),
        ms: value => ({
          marginTop: addSafeAreaInset('top', value),
          marginBottom: addSafeAreaInset('bottom', value),
          marginLeft: addSafeAreaInset('left', value),
          marginRight: addSafeAreaInset('right', value),
        }),
        translatexs: value => ({
          transform: `translateX(${addSafeAreaInset('left', value)})`,
        }),
        translateys: value => ({
          transform: `translateY(${addSafeAreaInset('top', value)})`,
        }),
        heightstop: value => ({
          height: addSafeAreaInset('top', value),
        }),
        widthsleft: value => ({
          width: addSafeAreaInset('left', value),
        }),
        heightsbottom: value => ({
          height: addSafeAreaInset('bottom', value),
        }),
        widthsright: value => ({
          width: addSafeAreaInset('right', value),
        }),
        tops: value => ({
          top: addSafeAreaInset('top', value),
        }),
        rights: value => ({
          right: addSafeAreaInset('right', value),
        }),
        bottoms: value => ({
          bottom: addSafeAreaInset('bottom', value),
        }),
        lefts: value => ({
          left: addSafeAreaInset('left', value),
        }),
      },
      {
        values: theme('inset'),
      },
    )
  },
)

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        lowest: 10,
        middle: 20,
        top: 30,
        popup: 40,
        instant: 50,
      },
      screens: {
        'media-hover': {
          raw: '(hover: hover)',
        },
      },
      fontFamily: {
        opensans: ['"Open Sans"', 'sans-serif'],
      },
      fontSize: {
        lg: ['20px', '24px'],
        '2xs': ['10px', '12px'],
        '3xs': ['8px', '10px'],
        '4xs': ['6px', '8px'],
      },
      rotate: {
        270: '270deg',
      },
      colors: u => ({
        mantis: {
          50: '#f1f9ec',
          100: '#e0f2d5',
          200: '#c3e6b0',
          300: '#9dd581',
          400: '#8cc96e',
          500: '#5da63c',
          600: '#46842c',
          700: '#386526',
          800: '#305123',
          900: '#2a4621',
          950: '#13260d',
        },

        main: {
          default: '#283342',
          text: '#283342',
        },
      }),
      animation: {
        'fade-in': 'fade-in 0.1s ease-in forwards;',
        'slide-bottom': 'slide-from-bottom 0.2s linear forwards;',
      },
      ease: {
        'cubic-bounce': 'cubic-bezier(.45,.02,.64,1.23)',
      },
      transitionTimingFunction: {
        'cubic-bounce': 'cubic-bezier(.45,.02,.64,1.23)',
      },
    },
  },
  plugins: [safeAreaPlugin, require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#7c3aed',
          secondary: '#d926a9',
          accent: '#1fb2a6',
          neutral: '#4b5563',
          'base-100': '#1f2937',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#ef4444',
        },
      },
    ],
  },
}
