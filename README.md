# Jimeng API

🎨 **免费的AI图像和视频生成API服务** - 基于即梦AI的逆向工程实现，提供与OpenAI API兼容的接口格式

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-支持-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](LICENSE)

## ✨ 特性

- 🎨 **AI图像生成**: 支持多种模型和分辨率（默认2K）
- 🖼️ **图生图合成**: 支持多图混合、风格转换、内容合成
- 🎬 **AI视频生成**: 支持文本到视频生成
- 💬 **聊天接口**: OpenAI生图格式兼容的API
- 🔄 **智能轮询**: 自适应轮询机制，优化生成效率
- 🛡️ **统一异常处理**: 完善的错误处理和重试机制
- 📊 **详细日志**: 结构化日志记录，便于调试
- 🐳 **Docker支持**: 容器化部署，开箱即用

## ⚠ 风险警告

- 此项目属于研究交流学习性质，不接受任何资金捐助和金钱交易！
- 仅限自用和个人研究，避免对官方造成服务压力，否则轻者可能封号，重者可能触犯法律！
- 仅限自用和个人研究，避免对官方造成服务压力，否则轻者可能封号，重者可能触犯法律！
- 仅限自用和个人研究，避免对官方造成服务压力，否则轻者可能封号，重者可能触犯法律！

## ✨ 新功能亮点

### 📐 ratio参数支持

仅`ratio`参数，移除了size、width、height等参数，避免造成误解，与即梦官网保持完全一致：

```bash
curl -X POST http://localhost:5100/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_ID" \
  -d '{
    "model": "jimeng-4.0",
    "prompt": "美丽的少女，胶片感",
    "ratio": "4:3"
  }'
```

**支持比例**: `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9` (仅支持官网标准比例)

## 🚀 快速开始

### sessionid获取
![](https://github.com/iptag/jimeng-api/blob/main/get_sessionid.png)

### 环境要求

- Node.js 18+
- npm 或 yarn
- Docker (可选)

### 安装部署

#### 方式一：直接运行

```bash
# 克隆项目
git clone <repository-url>
cd jimeng-api

# 安装依赖
npm install

# 配置环境
cp configs/dev/service.yml.example configs/dev/service.yml
cp configs/dev/system.yml.example configs/dev/system.yml

# 启动服务
npm start
```

#### 方式二：Docker部署

```bash
# 构建镜像
docker build -t jimeng-api .

# 运行容器
docker run -d \
  --name jimeng-api \
  -p 5100:5100 \
  jimeng-api
```

### 配置说明

#### `configs/dev/service.yml`
```yaml
name: jimeng-api
route: src/api/routes/index.ts
port: 5100
```

#### `configs/dev/system.yml`
```yaml
requestLog: true
debug: false
```

## 📖 API文档

### 图像生成

**POST** `/v1/images/generations`

**请求参数**:
- `model` (string): 使用的模型名称
- `prompt` (string): 图像描述文本
- `ratio` (string, 可选): 图像比例，如 "4:3", "16:9", "1:1" 等，默认为 "1:1"
- `negative_prompt` (string, 可选): 负面提示词
- `sample_strength` (number, 可选): 采样强度 (0.0-1.0)
- `response_format` (string, 可选): 响应格式 ("url" 或 "b64_json")

```bash
curl -X POST http://localhost:5100/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_ID" \
  -d '{
    "model": "jimeng-4.0",
    "prompt": "一只可爱的小猫咪",
    "ratio": "1:1",
  }'

# 使用不同比例的示例
curl -X POST http://localhost:5100/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_ID" \
  -d '{
    "model": "jimeng-4.0",
    "prompt": "壮丽的山水风景",
    "ratio": "21:9",
  }'
```

**支持的模型**:
- `jimeng-4.0` - 最新高质量模型
- `jimeng-3.1` - 艺术风格模型，调用4.0以下模型时须账号保持有购买的积分，每日赠送的积分不行，不然会提示积分不够
- `jimeng-3.0` - 通用模型
- `jimeng-2.1` - 轻量级模型
- `jimeng-xl-pro` - 专业模型

**支持的分辨率**:

| 比例 | 分辨率 | 描述 | 适用场景 |
|------|--------|------|----------|
| 1:1 | `2048x2048` | 正方形 (默认) | 头像、Logo、社交媒体 |
| 4:3 | `2304x1728` | 传统照片比例 | 风景照、人像摄影 |
| 3:4 | `1728x2304` | 竖版传统比例 | 人像、海报 |
| 16:9 | `2304x1296` | 宽屏比例 | 横幅、桌面壁纸 |
| 9:16 | `1296x2304` | 手机竖屏 | 手机壁纸、短视频 |
| 3:2 | `2304x1536` | 经典摄影比例 | 专业摄影、印刷 |
| 2:3 | `1536x2304` | 竖版摄影比例 | 杂志封面、海报 |
| 21:9 | `2688x1152` | 超宽屏比例 | 电影画面、全景图 |

### 图生图 (图片合成)

**POST** `/v1/images/compositions`

**功能说明**: 基于输入的一张或多张图片，结合文本提示词生成新的图片。支持图片混合、风格转换、内容合成等多种创作模式。

**请求参数**:
- `model` (string): 使用的模型名称
- `prompt` (string): 图像描述文本，用于指导生成方向
- `images` (array): 输入图片数组，支持以下格式：
  - 字符串数组: `["http://example.com/image1.jpg", "http://example.com/image2.jpg"]`
  - 对象数组: `[{"url": "http://example.com/image1.jpg"}, {"url": "http://example.com/image2.jpg"}]`
- `ratio` (string, 可选): 图像比例，支持 `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9`，默认为 "1:1"
- `negative_prompt` (string, 可选): 负面提示词，描述不希望出现的内容
- `sample_strength` (number, 可选): 采样强度 (0.0-1.0)，控制对原图的保留程度
- `response_format` (string, 可选): 响应格式 ("url" 或 "b64_json")

**使用限制**:
- 输入图片数量: 1-10张
- 支持的图片格式: JPG, PNG, WebP等常见格式
- 图片大小限制: 建议单张图片不超过10MB
- 生成时间: 通常30秒-5分钟，复杂合成可能需要更长时间

**使用示例**:

```bash
# 单图风格转换
curl -X POST http://localhost:5100/v1/images/compositions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_ID" \
  -d '{
    "model": "jimeng-4.0",
    "prompt": "将这张照片转换为油画风格，色彩鲜艳，笔触明显",
    "images": ["https://example.com/photo.jpg"],
    "ratio": "1:1",
    "sample_strength": 0.7
  }'

# 多图混合合成
curl -X POST http://localhost:5100/v1/images/compositions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_ID" \
  -d '{
    "model": "jimeng-4.0",
    "prompt": "将这些图片融合成一幅梦幻的超现实主义作品",
    "images": [
      "https://example.com/landscape.jpg",
      "https://example.com/portrait.jpg",
      "https://example.com/abstract.jpg"
    ],
    "ratio": "4:3",
    "negative_prompt": "模糊，低质量，变形",
    "sample_strength": 0.5
  }'

# 使用对象格式的图片数组
curl -X POST http://localhost:5100/v1/images/compositions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_ID" \
  -d '{
    "model": "jimeng-4.0",
    "prompt": "创建一个科幻风格的城市景观",
    "images": [
      {"url": "https://example.com/city.jpg"},
      {"url": "https://example.com/sci-fi-elements.jpg"}
    ],
    "ratio": "21:9",
    "response_format": "url"
  }'
```

**详细流程说明**:

#### 🔄 **完整处理流程**

1. **请求验证阶段** (1-2秒)
   - 验证请求参数格式和完整性
   - 检查图片数组是否符合要求 (1-10张)
   - 验证每个图片URL的格式

2. **图片预处理阶段** (5-30秒，取决于图片数量和大小)
   - **下载外部图片**: 从提供的URL下载图片到本地
   - **获取上传令牌**: 向即梦服务器申请图片上传权限
   - **图片上传**: 使用AWS签名认证将图片上传到即梦存储系统
   - **格式转换**: 自动处理图片格式和尺寸优化

3. **任务提交阶段** (2-5秒)
   - 构建图片合成任务参数
   - 设置合成模式为 "blend" (混合模式)
   - 提交任务到即梦AI生成队列
   - 获取任务ID (history_id)

4. **AI生成阶段** (30秒-5分钟)
   - AI模型分析输入图片和文本提示
   - 执行图片混合、风格转换或内容合成
   - 生成过程中系统会定期检查状态

5. **结果轮询阶段** (持续进行，直到完成)
   - 每秒查询一次生成状态
   - 最多轮询600次 (10分钟超时)
   - 每30秒输出一次进度日志

6. **结果处理阶段** (1-3秒)
   - 提取生成的图片URL
   - 根据 `response_format` 参数决定返回格式
   - 如果是 "b64_json"，则下载图片并转换为Base64

#### ⚡ **性能优化特性**

- **并发上传**: 多张图片并行上传，提升处理速度
- **智能重试**: 网络异常时自动重试上传
- **状态缓存**: 避免重复查询相同状态
- **资源管理**: 自动清理临时文件和连接

#### 🛡️ **错误处理机制**

- **图片下载失败**: 返回具体的网络错误信息
- **上传权限异常**: 自动重新申请上传令牌
- **生成超时**: 10分钟后返回超时错误
- **内容审核**: 如果内容被过滤，返回相应错误码
- **积分不足**: 自动尝试领取免费积分

#### 📋 **响应格式**

**成功响应** (response_format: "url"):
```json
{
  "created": 1703123456,
  "data": [
    {
      "url": "https://p3-sign.toutiaoimg.com/tos-cn-i-tb4s082cfz/abc123.webp"
    }
  ],
  "input_images": 2,
  "composition_type": "multi_image_synthesis"
}
```

**成功响应** (response_format: "b64_json"):
```json
{
  "created": 1703123456,
  "data": [
    {
      "b64_json": "iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ],
  "input_images": 2,
  "composition_type": "multi_image_synthesis"
}
```

**错误响应**:
```json
{
  "error": {
    "message": "图片上传失败: 网络连接超时",
    "type": "image_upload_error",
    "code": "UPLOAD_TIMEOUT"
  }
}
```

#### ❓ **常见问题与解决方案**

**Q: 图片上传失败怎么办？**
A: 检查图片URL是否可访问，确保图片格式正确，文件大小不超过10MB。

**Q: 生成时间过长怎么办？**
A: 复杂的多图合成需要更长时间，建议耐心等待。如果超过10分钟仍未完成，可以重新提交请求。

**Q: 如何提高合成质量？**
A:
- 使用高质量的输入图片
- 编写详细准确的提示词
- 适当调整 `sample_strength` 参数
- 避免使用过多冲突的图片风格

**Q: 支持哪些图片格式？**
A: 支持 JPG、PNG、WebP、GIF 等常见格式，推荐使用 JPG 或 PNG。

**Q: 可以使用本地图片吗？**
A: 需要先将本地图片上传到可访问的网络地址，然后使用该URL。

### 视频生成

**POST** `/v1/chat/completions`

```bash
curl -X POST http://localhost:5100/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_ID" \
  -d '{
    "model": "jimeng-video-3.0",
    "messages": [
      {
        "role": "user",
        "content": "生成一个海浪拍打海岸的视频"
      }
    ],
    "stream": true
  }'
```

**支持的视频模型**:
- `jimeng-video-3.0-pro` - 专业版
- `jimeng-video-3.0` - 标准版
- `jimeng-video-2.0-pro` - 专业版v2
- `jimeng-video-2.0` - 标准版v2

### 聊天完成

**POST** `/v1/chat/completions`

```bash
curl -X POST http://localhost:5100/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_ID" \
  -d '{
    "model": "jimeng-4.0",
    "messages": [
      {
        "role": "user",
        "content": "画一幅山水画"
      }
    ]
  }'
```

## 🔍 API响应格式

### 图像生成响应
```json
{
  "created": 1759058768,
  "data": [
    {
      "url": "https://example.com/image1.jpg"
    },
    {
      "url": "https://example.com/image2.jpg"
    }
  ]
}
```

### 聊天完成响应
```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1759058768,
  "model": "jimeng-4.0",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "![image](https://example.com/generated-image.jpg)"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  }
}
```

### 流式响应 (SSE)
```
data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1759058768,"model":"jimeng-4.0","choices":[{"index":0,"delta":{"role":"assistant","content":"🎨 图像生成中，请稍候..."},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1759058768,"model":"jimeng-4.0","choices":[{"index":1,"delta":{"role":"assistant","content":"![image](https://example.com/image.jpg)"},"finish_reason":"stop"}]}

data: [DONE]
```

## 🏗️ 项目架构

```
jimeng-api/
├── src/
│   ├── api/
│   │   ├── controllers/          # 控制器层
│   │   │   ├── core.ts          # 核心功能（网络请求、文件处理）
│   │   │   ├── images.ts        # 图像生成逻辑
│   │   │   ├── videos.ts        # 视频生成逻辑
│   │   │   └── chat.ts          # 聊天接口逻辑
│   │   ├── routes/              # 路由定义
│   │   └── consts/              # 常量定义
│   │       ├── exceptions.ts    # 异常定义
│   │       └── common.ts        # 通用常量
│   ├── lib/                     # 核心库
│   │   ├── server.ts           # 服务器核心
│   │   ├── error-handler.ts    # 统一错误处理
│   │   ├── smart-poller.ts     # 智能轮询器
│   │   ├── aws-signature.ts    # AWS签名
│   │   └── exceptions/         # 异常类
│   ├── daemon.ts               # 守护进程
│   └── index.ts               # 入口文件
├── configs/                    # 配置文件
├── Dockerfile                 # Docker配置
└── package.json              # 项目配置
```

## 🔧 核心组件

### 智能轮询器 (SmartPoller)
- 基于状态码自适应调整轮询间隔
- 多重退出条件，避免无效等待
- 详细的进度跟踪和日志记录

### 统一错误处理 (ErrorHandler)
- 分类错误处理（网络错误、API错误、超时等）
- 自动重试机制
- 用户友好的错误提示

### 安全JSON解析
- 自动修复常见JSON格式问题
- 支持尾随逗号、单引号等非标准格式
- 详细的解析错误日志


## ⚙️ 高级配置

### 轮询配置
```typescript
export const POLLING_CONFIG = {
  MAX_POLL_COUNT: 900,    // 最大轮询次数 (15分钟)
  POLL_INTERVAL: 1000,    // 基础轮询间隔 (1秒)
  STABLE_ROUNDS: 5,       // 稳定轮次
  TIMEOUT_SECONDS: 900    // 超时时间 (15分钟)
};
```

### 重试配置
```typescript
export const RETRY_CONFIG = {
  MAX_RETRY_COUNT: 3,     // 最大重试次数
  RETRY_DELAY: 5000       // 重试延迟 (5秒)
};
```

## 🐛 故障排除

### 常见问题

1. **JSON解析错误**
   - 检查请求体格式是否正确
   - 系统会自动修复常见格式问题

2. **Sessionid失效**
   - 重新获取Sessionid
   - 检查Sessionid格式是否正确

3. **生成超时**
   - 图像生成：通常1-3分钟
   - 视频生成：通常3-15分钟
   - 系统会自动处理超时情况

4. **积分不足**
   - 前往即梦官网查看积分余额
   - 系统会提供详细的积分状态信息

## � 致谢

本项目基于以下开源项目的贡献和启发：

- **[jimeng-free-api-all](https://github.com/wwwzhouhui/jimeng-free-api-all)** - 感谢该项目为即梦API逆向工程提供的重要参考和技术基础，本项目在其基础上进行了功能完善和架构优化

## �📄 许可证

GPL v3 License - 详见 [LICENSE](LICENSE) 文件

## ⚠️ 免责声明

本项目仅供学习和研究使用，请遵守相关服务条款和法律法规。使用本项目所产生的任何后果由使用者自行承担。
