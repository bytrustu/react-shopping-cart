export const tokens = {
  colors: {
    white: { value: '#fff' },
    black: { value: '#222' },
    gray100: { value: '#f5f5f5' },
    gray200: { value: '#ecebf1' },
    gray300: { value: '#d3d3d3' },
    gray400: { value: '#9ca3af' },
    gray500: { value: '#737373' },
    gray600: { value: '#575757' },
    gray700: { value: '#525252' },
    gray800: { value: '#383838' },
    teal100: { value: '#94dacd' },
    teal200: { value: '#04C09E' },
    mustard: { value: '#cbba64' },
    shadow: { value: 'rgba(0, 0, 0, 0.25)' },
    blue: { value: '#3869da' },
  },
  fontSizes: {
    caption: { value: '12px' },
    body: { value: '14px' },
    subtitle: { value: '16px' },
    title: { value: '18px' },
    headline: { value: '20px' },
    display: { value: '24px' },
  },
  zIndex: {
    header: { value: 1000 },
    overlay: { value: 1300 },
    modal: { value: 1400 },
    popover: { value: 1500 },
    toast: { value: 1600 },
    tooltip: { value: 1700 },
    loading: { value: 1800 },
  },
  animations: {
    spin: {
      value: 'spin 1s linear infinite',
    },
  },
  minWidth: {
    min: { value: '375px' },
  },
} as const;
