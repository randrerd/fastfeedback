import { extendTheme } from '@chakra-ui/react';

const fonts = { body: `Inter,-apple-system,Arial,sans-serif` };

const global = {
  html: { minWidth: '360px', scrollBehavior: 'smooth' },
  '#__next': { display: 'flex', flexDirection: 'column', minHeight: '100vh' }
};

const colors = { accent: '#99FFFE' };

// using `path`

const CustomTheme = extendTheme({ fonts, colors, styles: { global } });

export default CustomTheme;
