require('dotenv').config(); // 加载环境变量 - 必须在其他模块之前加载
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./models/db'); // 确保此路径正确：从app.js所在目录找到models/db
const authRoutes = require('./routes/authRoutes'); // 确保此路径正确

const app = express();
// 建议：将端口统一设置为3000，以便与Cloud Studio预览配置匹配
const PORT = process.env.PORT || 3000; // 环境变量优先，便于后续部署

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 路由
app.use('/api/auth', authRoutes);

// 【可选但推荐】添加一个根路径的健康检查端点
app.get('/', (req, res) => {
  res.json({ message: 'ADHD App 后端服务运行正常' });
});

// 启动服务器并测试数据库连接
app.listen(PORT, async () => {
  console.log(`服务器启动成功：http://localhost:${PORT}`);
  
  // 用 async/await 方式测试连接，逻辑更清晰
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ 数据库连接成功:', result.rows[0].now);
  } catch (err) {
    console.error('❌ 数据库连接失败，请检查配置:', err.message);
    // 这里可以根据需要决定是否退出进程
    process.exit(1);
  }
});

// 全局错误处理
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
  process.exit(1);
});
