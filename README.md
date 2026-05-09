# 🎓 Taiwan Scholarship Finder — Học Bổng Đài Loan

<div align="center">

**🇬🇧 English** &nbsp;|&nbsp; **🇻🇳 Tiếng Việt** &nbsp;|&nbsp; **🇨🇳 简体中文** &nbsp;|&nbsp; **🇹🇼 繁體中文**

*A scholarship search tool for Vietnamese students to study in Taiwan*

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock)](https://gsap.com/)
[![i18n](https://img.shields.io/badge/i18n-4%20languages-brightgreen)](#)

[🌐 Live Demo](https://taiwan-scholarship-finder.vercel.app/) · [📝 Report Bug](https://github.com/DuyTai2003/taiwan-scholarship-finder/issues)

</div>

---

## 🇬🇧 English

### Overview

**Taiwan Scholarship Finder** is an open-source web application that helps Vietnamese students easily search and compare scholarship programs for studying in Taiwan. Data is aggregated from official sources of the Taiwanese government, universities, and international organizations.

This project was developed as part of an undergraduate **Computer Science** application portfolio for Taiwanese universities.

### ✨ Key Features

- 🔍 **Smart Search** — Search by university name, scholarship, organization with unaccent support
- 🎛️ **Multi-dimensional Filters** — Filter by education level (Associate → PhD), scholarship type (Government/University/Organization), coverage (Full/Partial)
- 🌐 **Multilingual (i18n)** — Supports 4 languages: Vietnamese, English, 简体中文, 繁體中文
- ❤️ **Favorites** — Save favorite scholarships to localStorage with heart animation
- 📄 **Pagination** — Page navigation with goto page, first/last buttons
- ✨ **Smooth Animations** — GSAP ScrollTrigger parallax, Framer Motion spring animations, Lenis smooth scrolling
- 🖱️ **Mouse Spotlight** — Mouse-follow radial gradient spotlight effect
- 📱 **Responsive Design** — Mobile, tablet, and desktop compatible
- ♿ **Accessible** — ARIA labels, screen-reader support, keyboard navigation
- 🌙 **Skeleton Loading** — Shimmer animation during data loading
- ⚠️ **Error Boundary** — Graceful error handling with retry

### 🏗️ Architecture

```
src/
├── App.jsx                    # Root component + layout orchestration
├── main.jsx                   # Entry point, Lenis + GSAP init
├── components/
│   ├── EmptyState/            # No results state with reset button
│   ├── ErrorBoundary/         # Runtime error catcher
│   ├── Footer/                # Site footer
│   ├── Header/                # Sticky header + language switcher
│   ├── Hero/                  # Hero section + animated counter
│   ├── MouseSpotlight/        # Mouse-follow spotlight
│   ├── Pagination/            # Pagination with first/last/jump
│   ├── ScholarshipGrid/       # Grid layout + scholarship cards
│   ├── SearchFilters/         # Search bar + multi-filter controls
│   └── Skeleton/              # Skeleton loading cards
├── context/
│   ├── FavoritesContext.jsx   # Favorites state (localStorage)
│   └── LanguageContext.jsx    # Language state + auto-detection
├── data/
│   ├── i18n.json              # 4-language translation data
│   └── scholarships.json      # Scholarship dataset
├── hooks/
│   └── useScholarships.js     # Filter + search + pagination logic
└── styles/
    └── global.css             # CSS variables + reset + utilities
```

### 🛠️ Tech Stack

| Technology | Purpose |
|-----------|----------|
| React 18 | UI Framework |
| Vite 5 | Ultra-fast build tool |
| GSAP 3 + ScrollTrigger | Scroll-based animations (scrub, parallax) |
| Framer Motion 11 | Component animations (spring, gesture) |
| Lenis | Smooth scrolling with custom easing |
| CSS Modules | Scoped CSS, no conflicts |
| Three.js | Reserved for future 3D enhancements |

### 🚀 Quick Start

```bash
git clone https://github.com/DuyTai2003/taiwan-scholarship-finder.git
cd taiwan-scholarship-finder
npm install
npm run dev          # Dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
```

### 🔗 Links

- GitHub: [DuyTai2003/taiwan-scholarship-finder](https://github.com/DuyTai2003/taiwan-scholarship-finder)
- Live Demo: [Deploy on Vercel](https://taiwan-scholarship-finder.vercel.app/)

---

## 🇻🇳 Tiếng Việt

### Tổng Quan

**Taiwan Scholarship Finder** là ứng dụng web mã nguồn mở giúp sinh viên Việt Nam dễ dàng tìm kiếm và so sánh các chương trình học bổng du học Đài Loan. Dữ liệu được tổng hợp từ các nguồn chính thức của chính phủ, trường đại học và tổ chức quốc tế tại Đài Loan.

Dự án này được phát triển như một phần trong hồ sơ ứng tuyển ngành **Khoa Học Máy Tính (Computer Science)** bậc đại học tại Đài Loan.

### ✨ Tính Năng Nổi Bật

- 🔍 **Tìm kiếm thông minh** — Tìm theo tên trường, học bổng, tổ chức với hỗ trợ unaccent search
- 🎛️ **Bộ lọc đa chiều** — Lọc theo bậc học (Cao đẳng → Tiến sĩ), loại học bổng (Chính phủ/Trường/Tổ chức), mức hỗ trợ (Toàn phần/Một phần)
- 🌐 **Đa ngôn ngữ (i18n)** — Hỗ trợ 4 ngôn ngữ: Tiếng Việt, English, 简体中文, 繁體中文
- ❤️ **Yêu thích** — Lưu học bổng yêu thích vào localStorage với animation trái tim
- 📄 **Phân trang** — Điều hướng trang với goto page, nút đầu/cuối
- ✨ **Animation mượt mà** — GSAP ScrollTrigger parallax, Framer Motion spring, Lenis smooth scroll
- 🖱️ **Mouse Spotlight** — Hiệu ứng spotlight gradient theo chuột
- 📱 **Responsive** — Tương thích mobile, tablet, desktop
- ♿ **Accessibility** — ARIA labels, hỗ trợ screen-reader, điều hướng bàn phím
- 🌙 **Skeleton Loading** — Hiệu ứng shimmer khi đang tải dữ liệu
- ⚠️ **Error Boundary** — Xử lý lỗi runtime với nút thử lại

### 🏗️ Kiến Trúc

```
src/
├── App.jsx                    # Component gốc + điều phối layout
├── main.jsx                   # Entry point, khởi tạo Lenis + GSAP
├── components/
│   ├── EmptyState/            # Trạng thái không tìm thấy + nút reset
│   ├── ErrorBoundary/         # Bắt lỗi runtime
│   ├── Footer/                # Chân trang
│   ├── Header/                # Header sticky + chọn ngôn ngữ
│   ├── Hero/                  # Hero section + animated counter
│   ├── MouseSpotlight/        # Spotlight theo chuột
│   ├── Pagination/            # Phân trang với first/last/jump
│   ├── ScholarshipGrid/       # Grid layout + card học bổng
│   ├── SearchFilters/         # Thanh tìm kiếm + bộ lọc
│   └── Skeleton/              # Card skeleton loading
├── context/
│   ├── FavoritesContext.jsx   # State yêu thích (localStorage)
│   └── LanguageContext.jsx    # State ngôn ngữ + tự động phát hiện
├── data/
│   ├── i18n.json              # Dữ liệu dịch 4 ngôn ngữ
│   └── scholarships.json      # Dữ liệu học bổng
├── hooks/
│   └── useScholarships.js     # Logic lọc + tìm kiếm + phân trang
└── styles/
    └── global.css             # CSS variables + reset + utilities
```

### 🛠️ Công Nghệ Sử Dụng

| Công Nghệ | Mục Đích |
|-----------|----------|
| React 18 | UI Framework |
| Vite 5 | Build tool siêu nhanh |
| GSAP 3 + ScrollTrigger | Animation cuộn trang (scrub, parallax) |
| Framer Motion 11 | Animation component (spring, gesture) |
| Lenis | Smooth scroll với easing tùy chỉnh |
| CSS Modules | Scoped CSS, không xung đột |
| Three.js | Dự phòng cho tính năng 3D tương lai |

### 🚀 Khởi Động Nhanh

```bash
git clone https://github.com/DuyTai2003/taiwan-scholarship-finder.git
cd taiwan-scholarship-finder
npm install
npm run dev          # Dev server (http://localhost:5173)
npm run build        # Build production
npm run preview      # Xem trước bản production
```

---

## 🇨🇳 简体中文

### 概述

**台湾奖学金查询系统**是一个开源网页应用，帮助越南学生轻松搜索和比较赴台留学的奖学金项目。数据来源于台湾政府、大学和国际机构的官方渠道。

本项目是为申请台湾大学**计算机科学**本科专业而开发的作品集项目。

### ✨ 核心功能

- 🔍 **智能搜索** — 按大学名称、奖学金、机构搜索，支持无重音搜索
- 🎛️ **多维度筛选** — 按学历（副学士→博士）、奖学金类型（政府/大学/机构）、资助范围（全额/部分）筛选
- 🌐 **多语言** — 支持4种语言：越南语、英语、简体中文、繁體中文
- ❤️ **收藏功能** — 将喜爱的奖学金保存到 localStorage，带有心形动画
- 📄 **分页导航** — 支持跳转页码、首页/末页按钮
- ✨ **流畅动画** — GSAP ScrollTrigger 视差、Framer Motion 弹性动画、Lenis 平滑滚动
- 🖱️ **鼠标聚光灯** — 鼠标跟随径向渐变聚光灯效果
- 📱 **响应式设计** — 兼容手机、平板、桌面端
- ♿ **无障碍访问** — ARIA 标签、屏幕阅读器支持、键盘导航
- 🌙 **骨架屏加载** — 数据加载时的闪烁动画
- ⚠️ **错误边界** — 运行时错误优雅处理，支持重试

### 🏗️ 架构

```
src/
├── App.jsx                    # 根组件 + 布局编排
├── main.jsx                   # 入口，Lenis + GSAP 初始化
├── components/
│   ├── EmptyState/            # 无结果状态 + 重置按钮
│   ├── ErrorBoundary/         # 运行时错误捕获
│   ├── Footer/                # 页脚
│   ├── Header/                # 粘性头部 + 语言切换
│   ├── Hero/                  # 英雄区 + 动画计数器
│   ├── MouseSpotlight/        # 鼠标跟随聚光灯
│   ├── Pagination/            # 分页（首页/末页/跳转）
│   ├── ScholarshipGrid/       # 网格布局 + 奖学金卡片
│   ├── SearchFilters/         # 搜索栏 + 多维筛选
│   └── Skeleton/              # 骨架屏加载卡片
├── context/
│   ├── FavoritesContext.jsx   # 收藏状态（localStorage）
│   └── LanguageContext.jsx    # 语言状态 + 自动检测
├── data/
│   ├── i18n.json              # 四语翻译数据
│   └── scholarships.json      # 奖学金数据集
├── hooks/
│   └── useScholarships.js     # 筛选 + 搜索 + 分页逻辑
└── styles/
    └── global.css             # CSS 变量 + 重置 + 工具类
```

### 🛠️ 技术栈

| 技术 | 用途 |
|-----------|----------|
| React 18 | UI 框架 |
| Vite 5 | 超快构建工具 |
| GSAP 3 + ScrollTrigger | 滚动动画（擦除、视差） |
| Framer Motion 11 | 组件动画（弹性、手势） |
| Lenis | 自定义缓动平滑滚动 |
| CSS Modules | 作用域 CSS，无冲突 |
| Three.js | 预留给未来 3D 功能 |

### 🚀 快速开始

```bash
git clone https://github.com/DuyTai2003/taiwan-scholarship-finder.git
cd taiwan-scholarship-finder
npm install
npm run dev          # 开发服务器 (http://localhost:5173)
npm run build        # 生产构建
npm run preview      # 预览生产版本
```

---

## 🇹🇼 繁體中文

### 概述

**台灣獎學金查詢系統**是一個開源網頁應用，幫助越南學生輕鬆搜尋和比較赴台留學的獎學金項目。資料來源於台灣政府、大學和國際機構的官方管道。

本專案是為申請台灣大學**資訊工程學系（Computer Science）**學士班而開發的作品集專案。

### ✨ 核心功能

- 🔍 **智慧搜尋** — 按大學名稱、獎學金、機構搜尋，支援無重音符號搜尋
- 🎛️ **多維度篩選** — 按學歷（副學士→博士）、獎學金類型（政府/大學/機構）、補助範圍（全額/部分）篩選
- 🌐 **多語言** — 支援4種語言：越南語、英語、簡體中文、繁體中文
- ❤️ **收藏功能** — 將喜愛的獎學金儲存至 localStorage，帶有愛心動畫
- 📄 **分頁導航** — 支援跳轉頁碼、首頁/末頁按鈕
- ✨ **流暢動畫** — GSAP ScrollTrigger 視差、Framer Motion 彈性動畫、Lenis 平滑捲動
- 🖱️ **滑鼠聚光燈** — 滑鼠跟隨徑向漸層聚光燈效果
- 📱 **響應式設計** — 相容手機、平板、桌面端
- ♿ **無障礙存取** — ARIA 標籤、螢幕閱讀器支援、鍵盤導航
- 🌙 **骨架屏載入** — 資料載入時的閃爍動畫
- ⚠️ **錯誤邊界** — 執行時期錯誤優雅處理，支援重試

### 🏗️ 架構

```
src/
├── App.jsx                    # 根元件 + 佈局編排
├── main.jsx                   # 入口，Lenis + GSAP 初始化
├── components/
│   ├── EmptyState/            # 無結果狀態 + 重置按鈕
│   ├── ErrorBoundary/         # 執行時期錯誤捕獲
│   ├── Footer/                # 頁腳
│   ├── Header/                # 黏性頭部 + 語言切換
│   ├── Hero/                  # 英雄區 + 動畫計數器
│   ├── MouseSpotlight/        # 滑鼠跟隨聚光燈
│   ├── Pagination/            # 分頁（首頁/末頁/跳轉）
│   ├── ScholarshipGrid/       # 網格佈局 + 獎學金卡片
│   ├── SearchFilters/         # 搜尋欄 + 多維篩選
│   └── Skeleton/              # 骨架屏載入卡片
├── context/
│   ├── FavoritesContext.jsx   # 收藏狀態（localStorage）
│   └── LanguageContext.jsx    # 語言狀態 + 自動偵測
├── data/
│   ├── i18n.json              # 四語翻譯資料
│   └── scholarships.json      # 獎學金資料集
├── hooks/
│   └── useScholarships.js     # 篩選 + 搜尋 + 分頁邏輯
└── styles/
    └── global.css             # CSS 變數 + 重置 + 工具類
```

### 🛠️ 技術棧

| 技術 | 用途 |
|-----------|----------|
| React 18 | UI 框架 |
| Vite 5 | 超快建構工具 |
| GSAP 3 + ScrollTrigger | 捲動動畫（擦除、視差） |
| Framer Motion 11 | 元件動畫（彈性、手勢） |
| Lenis | 自訂緩動平滑捲動 |
| CSS Modules | 作用域 CSS，無衝突 |
| Three.js | 預留給未來 3D 功能 |

### 🚀 快速開始

```bash
git clone https://github.com/DuyTai2003/taiwan-scholarship-finder.git
cd taiwan-scholarship-finder
npm install
npm run dev          # 開發伺服器 (http://localhost:5173)
npm run build        # 生產建構
npm run preview      # 預覽生產版本
```

### 👨‍💻 About the Author

Nguyen Truong Duy (阮長維) — Aspiring Computer Science student applying to Taiwan universities.

GitHub: [DuyTai2003/taiwan-scholarship-finder](https://github.com/DuyTai2003/taiwan-scholarship-finder)

---

<div align="center">

Built with ❤️ using React 18, Vite 5, GSAP 3, Framer Motion 11 — May 2026

MIT License © 2026 Nguyen Truong Duy

</div>
