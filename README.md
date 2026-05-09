# 🎓 Học Bổng Đài Loan – Taiwan Scholarship Finder

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock)
![i18n](https://img.shields.io/badge/i18n-4%20languages-brightgreen)

**Công cụ tìm kiếm học bổng du học Đài Loan dành cho sinh viên Việt Nam**

[🌐 Live Demo](https://taiwan-scholarship-finder.vercel.app/) · [📝 Báo lỗi](https://github.com/yourusername/taiwan-scholarship-finder/issues)

</div>

---

## 📖 Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Tính Năng](#tính-năng)
- [Công Nghệ](#công-nghệ)
- [Cài Đặt & Chạy](#cài-đặt--chạy)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Technical Decisions](#technical-decisions)
- [Đóng Góp](#đóng-góp)
- [Giấy Phép](#giấy-phép)

---

## Giới Thiệu

**Taiwan Scholarship Finder** là một ứng dụng web mã nguồn mở giúp sinh viên Việt Nam dễ dàng tìm kiếm và so sánh các chương trình học bổng du học Đài Loan. Dữ liệu được tổng hợp từ các nguồn chính thức của chính phủ, trường đại học và tổ chức quốc tế tại Đài Loan.

Dự án này được phát triển như một phần trong hồ sơ ứng tuyển ngành **Khoa Học Máy Tính (Computer Science)** bậc đại học tại Đài Loan.

---

## Tính Năng

- 🔍 **Tìm kiếm thông minh** – Tìm theo tên trường, học bổng, tổ chức với hỗ trợ unaccent search
- 🎛️ **Bộ lọc đa chiều** – Lọc theo bậc học (Cao đẳng → Tiến sĩ), loại học bổng (Chính phủ/Trường/Tổ chức), mức hỗ trợ (Toàn phần/Một phần)
- 🌐 **Đa ngôn ngữ (i18n)** – Hỗ trợ 4 ngôn ngữ: Tiếng Việt, English, 简体中文, 繁體中文
- ❤️ **Yêu thích** – Lưu học bổng yêu thích vào localStorage
- 📄 **Phân trang** – Điều hướng trang với goto page, first/last
- ✨ **Animation mượt mà** – GSAP ScrollTrigger, Framer Motion, Lenis smooth scroll
- 🖱️ **Mouse Spotlight** – Hiệu ứng spotlight theo chuột
- 📱 **Responsive** – Tương thích mobile, tablet, desktop
- ♿ **Accessibility** – ARIA labels, screen-reader support, keyboard navigation
- 🌙 **Skeleton Loading** – Hiệu ứng shimmer khi đang tải dữ liệu

---

## Công Nghệ

| Công Nghệ | Mục Đích |
|-----------|----------|
| [React 18](https://react.dev/) | UI Framework |
| [Vite 5](https://vitejs.dev/) | Build tool siêu nhanh |
| [GSAP](https://gsap.com/) + ScrollTrigger | Animation cuộn trang |
| [Framer Motion](https://www.framer.com/motion/) | Animation component (spring, gesture) |
| [Lenis](https://lenis.studiofreight.com/) | Smooth scrolling |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped CSS |
| [Three.js](https://threejs.org/) | Dự phòng cho 3D (đã import sẵn) |

---

## Cài Đặt & Chạy

```bash
# Clone repository
git clone https://github.com/yourusername/taiwan-scholarship-finder.git
cd taiwan-scholarship-finder

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

---

## Cấu Trúc Dự Án

```
src/
├── App.jsx                    # Root component + routing logic
├── main.jsx                   # Entry point, Lenis + GSAP init
├── components/
│   ├── EmptyState/            # Trạng thái không tìm thấy kết quả
│   ├── ErrorBoundary/         # Bắt lỗi runtime
│   ├── Footer/                # Footer
│   ├── Header/                # Header + language switcher
│   ├── Hero/                  # Hero section + animated counter
│   ├── MouseSpotlight/        # Hiệu ứng spotlight theo chuột
│   ├── Pagination/            # Phân trang
│   ├── ScholarshipGrid/       # Grid + Card học bổng
│   ├── SearchFilters/         # Bộ lọc tìm kiếm
│   └── Skeleton/              # Skeleton loading
├── context/
│   ├── FavoritesContext.jsx   # Context quản lý yêu thích
│   └── LanguageContext.jsx    # Context quản lý ngôn ngữ
├── data/
│   ├── i18n.json              # Dữ liệu đa ngôn ngữ
│   └── scholarships.json      # Dữ liệu học bổng
├── hooks/
│   └── useScholarships.js     # Hook xử lý filter + pagination
└── styles/
    └── global.css             # CSS variables + reset
```

---

## Technical Decisions

### Tại sao React + Vite?
React được chọn vì hệ sinh thái component mạnh mẽ, dễ bảo trì và mở rộng. Vite thay thế CRA nhờ tốc độ build nhanh hơn đáng kể (dùng esbuild cho dev, Rollup cho production).

### Tại sao GSAP + Framer Motion?
- **GSAP ScrollTrigger**: Xử lý animation dựa trên vị trí cuộn (scrub, pin, parallax) với hiệu năng cao, dùng GPU-accelerated transforms.
- **Framer Motion**: Xử lý animation tương tác (spring, gesture, layout animation) với API declarative phù hợp React.

### Tại sao Lenis?
Lenis cung cấp smooth scrolling với easing tùy chỉnh, tích hợp trực tiếp với GSAP ticker để đồng bộ animation và cuộn trang.

### Tại sao CSS Modules?
CSS Modules cung cấp scoped styles, tránh xung đột class names, đồng thời vẫn giữ được full power của CSS (không bị giới hạn như CSS-in-JS).

### Tại sao localStorage cho favorites?
Đơn giản, không cần backend, phù hợp với quy mô dự án cá nhân. Dữ liệu được lưu trữ local và có validation khi load.

### Tại sao i18n tự xây dựng thay vì thư viện?
Giảm bundle size, kiểm soát hoàn toàn cấu trúc dữ liệu, dễ dàng thêm ngôn ngữ mới chỉ bằng cách thêm key vào JSON.

---

## Đóng Góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo branch: `git checkout -b feature/ten-tinh-nang`
3. Commit: `git commit -m 'Thêm tính năng X'`
4. Push: `git push origin feature/ten-tinh-nang`
5. Tạo Pull Request

---

## Giấy Phép

MIT © 2026 Nguyễn Trường Duy

---

<div align="center">

---

# English

## Introduction

**Taiwan Scholarship Finder** is an open-source web application that helps Vietnamese students easily search and compare scholarship programs for studying in Taiwan. Data is aggregated from official sources of the Taiwanese government, universities, and international organizations.

This project was developed as part of an undergraduate **Computer Science** application portfolio for Taiwanese universities.

## Features

- 🔍 **Smart Search** – Search by university name, scholarship, organization with unaccent support
- 🎛️ **Multi-dimensional Filters** – Filter by education level, scholarship type, and coverage
- 🌐 **Multilingual (i18n)** – Supports 4 languages: Vietnamese, English, 简体中文, 繁體中文
- ❤️ **Favorites** – Save favorite scholarships to localStorage
- 📄 **Pagination** – Page navigation with goto page, first/last buttons
- ✨ **Smooth Animations** – GSAP ScrollTrigger, Framer Motion, Lenis smooth scroll
- 🖱️ **Mouse Spotlight** – Mouse-follow spotlight effect
- 📱 **Responsive** – Mobile, tablet, and desktop compatible
- ♿ **Accessible** – ARIA labels, screen-reader support, keyboard navigation
- 🌙 **Skeleton Loading** – Shimmer effect during data loading

## Tech Stack

| Technology | Purpose |
|-----------|----------|
| React 18 | UI Framework |
| Vite 5 | Ultra-fast build tool |
| GSAP + ScrollTrigger | Scroll-based animations |
| Framer Motion | Component animations |
| Lenis | Smooth scrolling |
| CSS Modules | Scoped CSS |

## Getting Started

```bash
git clone https://github.com/yourusername/taiwan-scholarship-finder.git
cd taiwan-scholarship-finder
npm install
npm run dev
```

## License

MIT © 2026 NGUYEN TRUONG DUY

---

# 简体中文

## 简介

**台湾奖学金查询系统**是一个开源网页应用，帮助越南学生轻松搜索和比较赴台留学的奖学金项目。数据来源于台湾政府、大学和国际机构的官方渠道。

本项目是为申请台湾大学**计算机科学**本科专业而开发的作品集项目。

## 功能特点

- 🔍 **智能搜索** – 按大学名称、奖学金、机构搜索，支持无重音搜索
- 🎛️ **多维度筛选** – 按学历、奖学金类型、资助范围筛选
- 🌐 **多语言** – 支持4种语言：越南语、英语、简体中文、繁體中文
- ❤️ **收藏功能** – 将喜爱的奖学金保存到 localStorage
- 📄 **分页导航** – 支持跳转页码、首页/末页
- ✨ **流畅动画** – GSAP ScrollTrigger、Framer Motion、Lenis 平滑滚动
- 🖱️ **鼠标聚光灯** – 鼠标跟随聚光灯效果
- 📱 **响应式设计** – 兼容手机、平板、桌面端
- ♿ **无障碍访问** – ARIA 标签、屏幕阅读器支持、键盘导航

## 技术栈

React 18 · Vite 5 · GSAP · Framer Motion · Lenis · CSS Modules

## 快速开始

```bash
git clone https://github.com/yourusername/taiwan-scholarship-finder.git
cd taiwan-scholarship-finder
npm install
npm run dev
```

## 许可证

MIT © 2026 阮长维

---

# 繁體中文

## 簡介

**台灣獎學金查詢系統**是一個開源網頁應用，幫助越南學生輕鬆搜尋和比較赴台留學的獎學金項目。資料來源於台灣政府、大學和國際機構的官方管道。

本專案是為申請台灣大學**資訊工程學系（Computer Science）**學士班而開發的作品集專案。

## 功能特點

- 🔍 **智慧搜尋** – 按大學名稱、獎學金、機構搜尋，支援無重音符號搜尋
- 🎛️ **多維度篩選** – 按學歷、獎學金類型、補助範圍篩選
- 🌐 **多語言** – 支援4種語言：越南語、英語、簡體中文、繁體中文
- ❤️ **收藏功能** – 將喜愛的獎學金儲存至 localStorage
- 📄 **分頁導航** – 支援跳轉頁碼、首頁/末頁
- ✨ **流暢動畫** – GSAP ScrollTrigger、Framer Motion、Lenis 平滑捲動
- 🖱️ **滑鼠聚光燈** – 滑鼠跟隨聚光燈效果
- 📱 **響應式設計** – 相容手機、平板、桌面端
- ♿ **無障礙存取** – ARIA 標籤、螢幕閱讀器支援、鍵盤導航

## 技術棧

React 18 · Vite 5 · GSAP · Framer Motion · Lenis · CSS Modules

## 快速開始

```bash
git clone https://github.com/yourusername/taiwan-scholarship-finder.git
cd taiwan-scholarship-finder
npm install
npm run dev
```

## 授權條款

MIT © 2026 阮長維

</div>
