# FoodOrderingApp_FrontEnd

## 🍔 Giới thiệu  
**FoodOrderingApp_FrontEnd** là giao diện người dùng cho hệ thống đặt món ăn trực tuyến.  
Ứng dụng cho phép:
- Duyệt danh sách món ăn
- Xem chi tiết món
- Thêm vào giỏ hàng
- Quản lý giỏ hàng
- Đăng nhập / đăng ký người dùng
- Đặt món và gửi order tới backend

Frontend được thiết kế để kết nối trực tiếp với backend microservices (FoodOrderingApp_BackEnd), hướng tới trải nghiệm UI đơn giản, hiệu quả và dễ triển khai.

---

## ⚡ Công nghệ sử dụng  

✔ React (TypeScript)  
✔ Vite — công cụ build tốc độ cao  
✔ Tailwind CSS — styling nhanh, responsive  
✔ ESLint / Prettier — code formatting  

Có thể tích hợp thêm:
- State management (Context API, Redux, Zustand)
- UI components (Ant Design, Material UI, shadcn/ui, v.v.)

---

## 📁 Cấu trúc dự án  

```plaintext
FoodOrderingApp_FrontEnd/
│── public/                # static assets
│── src/                   # source code chính
│   ├── components/        # UI components dùng chung
│   ├── pages/             # từng module màn hình
│   ├── services/          # API call / axios wrapper
│   ├── hooks/             # custom hooks
│   ├── styles/            # global css / tailwind
│   └── main.tsx           # entry React
│── .gitignore  
│── package.json  
│── tsconfig.json  
│── tailwind.config.js  
│── vite.config.ts  
└── README.md  
```

---

## ⚙️ Cài đặt & chạy  

### Yêu cầu
- Node.js
- npm hoặc yarn

### Cài đặt

```bash
git clone https://github.com/daophanquochoai/FoodOrderingApp_FrontEnd.git
cd FoodOrderingApp_FrontEnd
npm install
```

### Chạy development

```bash
npm run dev
```

Mở ứng dụng tại `http://localhost:3000`.

### Build production

```bash
npm run build
```

Output sẽ nằm trong thư mục `dist/` — có thể deploy lên bất kỳ hosting static nào.

---

## 🔌 Kết nối Backend  

Ứng dụng gọi API tới backend để:
- Đăng nhập / đăng ký
- Lấy danh sách menu
- Tạo order

Base URL có thể cấu hình bằng `.env`:

```env
VITE_API_URL=http://localhost:8080
```

---

## 🔄 Luồng hoạt động

1. Người dùng mở ứng dụng  
2. Xem danh sách món  
3. Thêm món vào giỏ  
4. Đăng nhập (nếu chưa có tài khoản thì đăng ký)  
5. Đặt hàng  
6. Backend xử lý order → phản hồi trạng thái  

---

## 🚀 Tính năng mở rộng đề xuất  

- Hệ thống thanh toán (MoMo, Stripe, PayPal)  
- Lịch sử đơn hàng  
- Review / rating món ăn  
- Khuyến mãi / mã giảm giá  
- Real-time order tracking  

---

## 🤝 Đóng góp  

Nếu bạn muốn đóng góp:

1. Fork repository  
2. Tạo branch `feature/ten-chuc-nang`  
3. Commit thay đổi  
4. Tạo Pull Request và mô tả rõ ràng

---

## 📜 License  

(Thêm license bạn muốn, ví dụ MIT)

---

✨ Dự án có thể phát triển thành hệ thống thương mại hoàn chỉnh — frontend này có thể kết hợp với backend + DevOps / CI-CD để showcase khi đi phỏng vấn hoặc deploy thực tế.
