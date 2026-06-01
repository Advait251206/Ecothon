<div align="center">
  <h1>🌿 HyacinthWatch</h1>
  <p>
    A smart environmental monitoring system designed to track and manage the spread of Water Hyacinth (Eichhornia crassipes) in water bodies. It bridges the gap between citizen scientists and municipal authorities using AI-powered verification and real-time geospatial data.
  </p>
</div>

<div align="center">

[![Node JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express JS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

<br />

</div>

---

## ✨ Why I Built This

> **Protecting our water ecosystems requires intelligent, crowdsourced data.**  
> HyacinthWatch was engineered to provide municipal authorities with a real-time, verified map of invasive Water Hyacinth blooms. By utilizing citizen reporting validated by artificial intelligence, the platform ensures rapid response and effective environmental management without requiring complex field equipment.

---

## 🌟 Key Features

| 💎 Feature                    | 📖 What It Means                                                                                                    |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| 🤖 **AI Verification**        | Every uploaded photo is analyzed by Google Gemini AI to confirm the presence of Water Hyacinth before database entry. |
| 📍 **Precise Geo-Tagging**    | Citizen reports automatically embed precise GPS coordinates for mapping hotspots.                                   |
| 📊 **Admin Dashboard**        | Municipal authorities can visualize reports on an interactive map and manage mitigation efforts.                    |
| 📱 **Mobile-First App**       | A highly accessible frontend allowing anyone with a smartphone to become an environmental monitor.                  |

---

## 🏗 Project Architecture

This repository is structured as a monorepo containing three core applications. Click below to expand details about each core component:

<details>
<summary><b>1. 🖥️ backend (Node.js & Express)</b></summary>
<br>
The central API and logic layer.
<ul>
<li><b>Database:</b> MongoDB integration for storing citizen reports and location data.</li>
<li><b>AI Integration:</b> Connects with Google Gemini 2.0 Flash for instant image verification.</li>
<li><b>Cloud Storage:</b> ImgBB integration for robust image hosting.</li>
<li><b>API:</b> RESTful endpoints powering both the citizen app and the admin dashboard.</li>
</ul>
</details>

<details>
<summary><b>2. 📱 frontend_user (React & Vite)</b></summary>
<br>
The citizen-facing reporting application.
<ul>
<li><b>Features:</b> Camera upload, geolocation tagging, and educational resources about invasive species.</li>
<li><b>Design:</b> Responsive, mobile-first design using TailwindCSS and Framer Motion for smooth interactions.</li>
<li><b>Mapping:</b> Leaflet integration for viewing local reported clusters.</li>
</ul>
</details>

<details>
<summary><b>3. 📊 frontend_admin (React & Vite)</b></summary>
<br>
The command center for municipal authorities.
<ul>
<li><b>Dashboard:</b> Glassmorphism UI presenting data visualizations using Recharts.</li>
<li><b>Report Management:</b> Tools for authorities to validate, flag, or resolve reported infestations.</li>
<li><b>Geospatial Views:</b> High-level map overviews of affected water bodies.</li>
</ul>
</details>

---

## ⚙️ Configuration & Environment

To run this project locally, you need to configure Environment Variables in `.env` files for each container. Expand to see required keys.

<details>
<summary><b>Backend (<code>/backend/.env</code>)</b></summary>
<br>

| Variable                  | Description                               |
| :------------------------ | :---------------------------------------- |
| `MONGO_URI`               | MongoDB connection string                 |
| `GEMINI_API_KEY`          | API Key for Google Gemini Image Analysis  |
| `IMAGE_BB_API_KEY`        | API Key for ImgBB image hosting           |
| `ADMIN_EMAIL`             | Default admin dashboard login email       |
| `ADMIN_PASSWORD`          | Default admin dashboard login password    |

</details>

<details>
<summary><b>Frontend User (<code>/frontend_user/.env</code>)</b></summary>
<br>

- Configure frontend variables according to your local setup (e.g., `VITE_API_URL`).

</details>

<details>
<summary><b>Frontend Admin (<code>/frontend_admin/.env</code>)</b></summary>
<br>

- Configure admin panel variables according to your local setup (e.g., `VITE_API_URL`).

</details>

---

## 🚀 Getting Started

1. **Install Dependencies:**  
   Run `npm run install:all` in the root directory to install dependencies for the backend and both frontends.
2. **Setup Environments:**  
   Configure the `.env` files using the reference above.
3. **Run Concurrently:**  
   Start the entire system with a single command: `npm run dev` in the root directory.

*(Optional)* **Python AI Engine**  
A local AI model runs on Port 8000 providing advanced coverage analysis. Ensure you have Python 3.10+ installed. Navigate to the backend folder and run:
```bash
pip install "fastapi[standard]" uvicorn torch torchvision opencv-python-headless segmentation-models-pytorch
uvicorn image_route:app --reload --port 8000
```

---

_Built with 💚 by Team Aerobats_
