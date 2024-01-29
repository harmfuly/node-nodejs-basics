const parseEnv = () => {
    const envVariables = process.env;

    console.log('Environment variables with prefix RSS_:');

    for (const variable in envVariables) {
        if (variable.startsWith('RSS_')) {
            console.log(`${variable}=${envVariables[variable]}`);
        }
    }
};

export { parseEnv };

parseEnv();