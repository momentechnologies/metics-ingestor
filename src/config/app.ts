export default {
    isProd: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    port: parseInt(process.env.CONFIG_APP_PORT),
};
