import localFont from 'next/font/local';

export const micro = localFont({
    src: [
        {
            path: '../fonts/FormaDJRMicro/FormaDJRMicro-ExtraLight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../fonts/FormaDJRMicro/FormaDJRMicro-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../fonts/FormaDJRMicro/FormaDJRMicro-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/FormaDJRMicro/FormaDJRMicro-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../fonts/FormaDJRMicro/FormaDJRMicro-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../fonts/FormaDJRMicro/FormaDJRMicro-ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../fonts/FormaDJRMicro/FormaDJRMicro-Black.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: '--font-micro',
    display: 'swap',
});
