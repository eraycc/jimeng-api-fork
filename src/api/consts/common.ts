/**
 * 即梦API通用常量
 */

// 默认助手ID
export const DEFAULT_ASSISTANT_ID = "513695";

// 平台代码
export const PLATFORM_CODE = "7";

// 版本代码
export const VERSION_CODE = "1.0.0";

// 默认模型
export const DEFAULT_IMAGE_MODEL = "jimeng-4.0";
export const DEFAULT_VIDEO_MODEL = "jimeng-video-3.0";

// 草稿版本
export const DRAFT_VERSION = "3.3.2";

// 图像模型映射
export const IMAGE_MODEL_MAP = {
  "jimeng-4.0": "high_aes_general_v40",
  "jimeng-3.1": "high_aes_general_v30l_art_fangzhou:general_v3.0_18b",
  "jimeng-3.0": "high_aes_general_v30l:general_v3.0_18b",
  "jimeng-2.1": "high_aes_general_v21_L:general_v2.1_L",
  "jimeng-2.0-pro": "high_aes_general_v20_L:general_v2.0_L",
  "jimeng-2.0": "high_aes_general_v20:general_v2.0",
  "jimeng-1.4": "high_aes_general_v14:general_v1.4",
  "jimeng-xl-pro": "text2img_xl_sft"
};

// 视频模型映射
export const VIDEO_MODEL_MAP = {
  "jimeng-video-3.0-pro": "dreamina_ic_generate_video_model_vgfm_3.0_pro",
  "jimeng-video-3.0": "dreamina_ic_generate_video_model_vgfm_3.0",
  "jimeng-video-2.0": "dreamina_ic_generate_video_model_vgfm_lite",
  "jimeng-video-2.0-pro": "dreamina_ic_generate_video_model_vgfm1.0"
};

// 状态码映射
export const STATUS_CODE_MAP = {
  20: 'PROCESSING',
  10: 'SUCCESS',
  30: 'FAILED',
  42: 'POST_PROCESSING',
  45: 'FINALIZING',
  50: 'COMPLETED'
};

// 重试配置
export const RETRY_CONFIG = {
  MAX_RETRY_COUNT: 3,
  RETRY_DELAY: 5000
};

// 轮询配置
export const POLLING_CONFIG = {
  MAX_POLL_COUNT: 900, // 15分钟
  POLL_INTERVAL: 1000, // 1秒
  STABLE_ROUNDS: 5,    // 稳定轮次
  TIMEOUT_SECONDS: 900 // 15分钟超时
};

// 支持的图片比例和分辨率
export const ASPECT_RATIOS = {
  "1:1": { width: 2048, height: 2048, ratio: 1 },
  "4:3": { width: 2304, height: 1728, ratio: 4 },
  "3:4": { width: 1728, height: 2304, ratio: 3 },
  "16:9": { width: 2304, height: 1296, ratio: 2 },
  "9:16": { width: 1296, height: 2304, ratio: 5 },
  "3:2": { width: 2304, height: 1536, ratio: 6 },
  "2:3": { width: 1536, height: 2304, ratio: 7 },
  "21:9": { width: 2688, height: 1152, ratio: 8 }
};


