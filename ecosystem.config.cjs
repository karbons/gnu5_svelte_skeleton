module.exports = {
    apps: [
      {
        name: 'karbon builder basic',
        script: 'build/index.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
          PORT: 30000
          // 기타 환경 변수 설정
        },
      },
    ],
  };
  