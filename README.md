# MammaCare: Digital Maternity Care System 💓

MammaCare is a modernized digital maternity platform designed to replace traditional paper-based antenatal cards. It provides a real-time bridge between expectant mothers and hospital staff.

## 🚀 The Stack
- **Backend**: Node.js / Express with **Prisma ORM** & **PostgreSQL**.
- **Web Portal**: **Next.js** for secure clinical management and SOS monitoring.
- **Mobile App**: **React Native / Expo** for patient access and emergency alerts.
- **Infrastructure**: Fully **Dockerized** for instant deployment.

---

## 🛠 Features & Live Simulation
The system is pre-configured with a **Real-time Simulation Mode**:
1. **Dynamic Dashboard**: Upon startup, the web portal is pre-loaded with active emergency SOS alerts.
2. **Clinical History**: Seeded data includes 5 patients with detailed histories, including a high-risk simulation for Preeclampsia detection.
3. **Cross-Platform Sync**: SOS alerts triggered on the Mobile app appear instantly on the Hospital web portal.

---

## 🚦 Quick Start (Docker)

The fastest way to run the entire system is using Docker Compose:

1. **Clone and Run**:
   ```powershell
   docker-compose up -d --build
   ```
2. **Access the Services**:
   - **Hospital Web Portal**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
   - **Database**: PostgreSQL on port `5433` (externally).

---

## 🧪 Test Credentials

### 🏥 Hospital Staff (Web Portal)
| Role | Email | Password |
| :--- | :--- | :--- |
| **Doctor** | `doctor@hospital.com` | `password123` |
| **Nurse** | `nurse@hospital.com` | `password123` |

### 🤰 Patients (Mobile App)
| Scenario | Email | Password |
| :--- | :--- | :--- |
| **Normal Case** | `sarah@example.com` | `password123` |
| **High-Risk Case** | `elena@mysticfalls.com` | `password123` |

---

## 📱 Mobile App (Local Setup)
To run the Mobile app specifically (not in Docker), navigate to the `mobile/` directory:
1. Ensure the backend container is running.
2. `npx expo start`
3. Scan the QR code with **Expo Go**.
4. *Note: API is set to `10.0.2.2` for Android Emulators.*

---

## 🔒 Security & Code Quality
MammaCare is audited for security using **Snyk**.
- Run `snyk code test` in the root for SAST checks.
- Run `snyk container test` on the Docker images for vulnerability scans.

---
*Created for Advanced Maternity Care Digitalization.*

