import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindCssAnimate from 'tailwindcss-animate'
import { fonts } from './config/fonts'
import { createThemes } from 'tw-colors';

const { fontFamily = { sans: ['sans-serif'] } } = defaultTheme || {}


/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: fonts.map((font) => `font-${font}`).concat(['stone_light', 'stone_dark', 'zinc_light', 'zinc_dark', 'light', 'dark']),
	theme: {
		container: {
			center: 'true',
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				inter: ['Inter', ...fontFamily.sans],
				manrope: ['Manrope', ...fontFamily.sans],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				Outfit: [
					'Outfit',
					'sans-serif'
				],
				Ovo: [
					'Ovo',
					'serif'
				]
			},
			boxShadow: {
				black: '4px 4px 0 #000',
				white: '4px 4px 0 #fff'
			},
			gridTemplateColumns: {
				auto: 'repeat(auto-fit, minmax(200px, 1fr))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	darkMode: ["class"],
	plugins: [
		createThemes({
			light: {
				background: 'hsl(0 0% 100%)',
				foreground: 'hsl(222.2 84% 4.9%)',
				card: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(222.2 84% 4.9%)',
				},
				popover: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(222.2 84% 4.9%)',
				},
				primary: {
					DEFAULT: 'hsl(222.2 47.4% 11.2%)',
					foreground: 'hsl(210 40% 98%)',
				},
				secondary: {
					DEFAULT: 'hsl(210 40% 96.1%)',
					foreground: 'hsl(222.2 47.4% 11.2%)',
				},
				muted: {
					DEFAULT: 'hsl(210 40% 96.1%)',
					foreground: 'hsl(215.4 16.3% 46.9%)',
				},
				accent: {
					DEFAULT: 'hsl(210 40% 96.1%)',
					foreground: 'hsl(222.2 47.4% 11.2%)',
				},
				destructive: {
					DEFAULT: 'hsl(0 84.2% 60.2%)',
					foreground: 'hsl(210 40% 98%)',
				},
				border: 'hsl(214.3 31.8% 91.4%)',
				input: 'hsl(214.3 31.8% 91.4%)',
				ring: 'hsl(222.2 84% 4.9%)',
				chart: {
					1: 'hsl(12 76% 61%)',
					2: 'hsl(173 58% 39%)',
					3: 'hsl(197 37% 24%)',
					4: 'hsl(43 74% 66%)',
					5: 'hsl(27 87% 67%)',
				},
				sidebar: {
					DEFAULT: 'hsl(0 0% 98%)',
					foreground: 'hsl(240 5.3% 26.1%)',
					primary: 'hsl(240 5.9% 10%)',
					'primary-foreground': 'hsl(0 0% 98%)',
					accent: 'hsl(240 4.8% 95.9%)',
					'accent-foreground': 'hsl(240 5.9% 10%)',
					border: 'hsl(220 13% 91%)',
					ring: 'hsl(217.2 91.2% 59.8%)',
				},
			},
			dark: {
				background: 'hsl(222.2 84% 4.9%)',
				foreground: 'hsl(210 40% 98%)',
				card: {
					DEFAULT: 'hsl(222.2 84% 4.9%)',
					foreground: 'hsl(210 40% 98%)',
				},
				popover: {
					DEFAULT: 'hsl(222.2 84% 4.9%)',
					foreground: 'hsl(210 40% 98%)',
				},
				primary: {
					DEFAULT: 'hsl(210 40% 98%)',
					foreground: 'hsl(222.2 47.4% 11.2%)',
				},
				secondary: {
					DEFAULT: 'hsl(217.2 32.6% 17.5%)',
					foreground: 'hsl(210 40% 98%)',
				},
				muted: {
					DEFAULT: 'hsl(217.2 32.6% 17.5%)',
					foreground: 'hsl(215 20.2% 65.1%)',
				},
				accent: {
					DEFAULT: 'hsl(217.2 32.6% 17.5%)',
					foreground: 'hsl(210 40% 98%)',
				},
				destructive: {
					DEFAULT: 'hsl(0 62.8% 30.6%)',
					foreground: 'hsl(210 40% 98%)',
				},
				border: 'hsl(217.2 32.6% 17.5%)',
				input: 'hsl(217.2 32.6% 17.5%)',
				ring: 'hsl(212.7 26.8% 83.9%)',
				chart: {
					1: 'hsl(220 70% 50%)',
					2: 'hsl(160 60% 45%)',
					3: 'hsl(30 80% 55%)',
					4: 'hsl(280 65% 60%)',
					5: 'hsl(340 75% 55%)',
				},
				sidebar: {
					DEFAULT: 'hsl(222.2 84% 4.9%)',
					foreground: 'hsl(210 40% 98%)',
					primary: 'hsl(210 40% 98%)',
					'primary-foreground': 'hsl(222.2 47.4% 11.2%)',
					accent: 'hsl(217.2 32.6% 17.5%)',
					'accent-foreground': 'hsl(210 40% 98%)',
					border: 'hsl(217.2 32.6% 17.5%)',
					ring: 'hsl(212.7 26.8% 83.9%)',
				},
			},

			zinc_light: {
				background: 'oklch(1 0 0)',
				foreground: 'oklch(0.141 0.005 285.823)',
				card: {
					DEFAULT: 'oklch(1 0 0)',
					foreground: 'oklch(0.141 0.005 285.823)',
				},
				popover: {
					DEFAULT: 'oklch(1 0 0)',
					foreground: 'oklch(0.141 0.005 285.823)',
				},
				primary: {
					DEFAULT: 'oklch(0.21 0.006 285.885)',
					foreground: 'oklch(0.985 0 0)',
				},
				secondary: {
					DEFAULT: 'oklch(0.967 0.001 286.375)',
					foreground: 'oklch(0.21 0.006 285.885)',
				},
				muted: {
					DEFAULT: 'oklch(0.967 0.001 286.375)',
					foreground: 'oklch(0.552 0.016 285.938)',
				},
				accent: {
					DEFAULT: 'oklch(0.967 0.001 286.375)',
					foreground: 'oklch(0.21 0.006 285.885)',
				},
				destructive: {
					DEFAULT: 'oklch(0.577 0.245 27.325)',
					foreground: 'oklch(0.985 0 0)', // Assuming same as other foregrounds
				},
				border: 'oklch(0.92 0.004 286.32)',
				input: 'oklch(0.92 0.004 286.32)',
				ring: 'oklch(0.705 0.015 286.067)',
				chart: {
					1: 'oklch(0.646 0.222 41.116)',
					2: 'oklch(0.6 0.118 184.704)',
					3: 'oklch(0.398 0.07 227.392)',
					4: 'oklch(0.828 0.189 84.429)',
					5: 'oklch(0.769 0.188 70.08)',
				},
				sidebar: {
					DEFAULT: 'oklch(0.985 0 0)',
					foreground: 'oklch(0.141 0.005 285.823)',
					primary: 'oklch(0.21 0.006 285.885)',
					'primary-foreground': 'oklch(0.985 0 0)',
					accent: 'oklch(0.967 0.001 286.375)',
					'accent-foreground': 'oklch(0.21 0.006 285.885)',
					border: 'oklch(0.92 0.004 286.32)',
					ring: 'oklch(0.705 0.015 286.067)',
				},
			},
			zinc_dark: {
				background: 'oklch(0.141 0.005 285.823)',
				foreground: 'oklch(0.985 0 0)',
				card: {
					DEFAULT: 'oklch(0.21 0.006 285.885)',
					foreground: 'oklch(0.985 0 0)',
				},
				popover: {
					DEFAULT: 'oklch(0.21 0.006 285.885)',
					foreground: 'oklch(0.985 0 0)',
				},
				primary: {
					DEFAULT: 'oklch(0.92 0.004 286.32)',
					foreground: 'oklch(0.21 0.006 285.885)',
				},
				secondary: {
					DEFAULT: 'oklch(0.274 0.006 286.033)',
					foreground: 'oklch(0.985 0 0)',
				},
				muted: {
					DEFAULT: 'oklch(0.274 0.006 286.033)',
					foreground: 'oklch(0.705 0.015 286.067)',
				},
				accent: {
					DEFAULT: 'oklch(0.274 0.006 286.033)',
					foreground: 'oklch(0.985 0 0)',
				},
				destructive: {
					DEFAULT: 'oklch(0.704 0.191 22.216)',
					foreground: 'oklch(0.985 0 0)', // Assumed
				},
				border: 'oklch(1 0 0 / 10%)',
				input: 'oklch(1 0 0 / 15%)',
				ring: 'oklch(0.552 0.016 285.938)',
				chart: {
					1: 'oklch(0.488 0.243 264.376)',
					2: 'oklch(0.696 0.17 162.48)',
					3: 'oklch(0.769 0.188 70.08)',
					4: 'oklch(0.627 0.265 303.9)',
					5: 'oklch(0.645 0.246 16.439)',
				},
				sidebar: {
					DEFAULT: 'oklch(0.21 0.006 285.885)',
					foreground: 'oklch(0.985 0 0)',
					primary: 'oklch(0.488 0.243 264.376)',
					'primary-foreground': 'oklch(0.985 0 0)',
					accent: 'oklch(0.274 0.006 286.033)',
					'accent-foreground': 'oklch(0.985 0 0)',
					border: 'oklch(1 0 0 / 10%)',
					ring: 'oklch(0.552 0.016 285.938)',
				},
			}

		})

	],
};
