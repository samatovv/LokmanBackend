module.exports = {
    apps: [
      {
        name: "backend",
        script: "./dist/server.js",
        instances: 1,
        exec_mode: "fork",
        env: {
          NODE_ENV: "development",
          // другие переменные для dev
        },
        env_production: {
          NODE_ENV: "production",
          // другие переменные для продакшена
        }
      }
    ]
  };
  