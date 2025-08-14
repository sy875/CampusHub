# CampusHub

CampusHub is a role-based campus management platform that allows **students, faculty, and administrators** to collaborate seamlessly.  
It provides a centralized hub for **announcements, courses, materials**, and more — making campus communication and resource sharing easier.

---

## 🚀 Features

### 👤 **User Roles**
- **Student (User)**  
  - View announcements relevant to them  
  - Access courses they are enrolled in  
  - Download course materials shared with their audience  
- **Faculty**  
  - Create and manage announcements for students or faculty  
  - Upload course materials for their classes  
  - Manage course details and student lists  
- **Admin**  
  - Full platform management (users, courses, announcements, materials)  
  - Assign roles and permissions  
  - Manage campus-wide data  

---

### 📌 **Core Modules**
1. **Announcements**
   - Admin/Faculty can post announcements
   - Students see only announcements intended for them
   - Audience targeting support (e.g., only faculty, only students, everyone)

2. **Courses**
   - Branch, semester, and subject organization
   - Faculty can create/update courses
   - Students can view their assigned courses

3. **Materials**
   - Upload course-specific study materials
   - Access control based on audience type
   - Support for multiple material types (PDF, videos, links, etc.)

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB with Mongoose  
- **Authentication & Authorization:** Role-based access control (RBAC)  
- **Environment Management:** dotenv  

---


---

## 📦 Scripts
| Script         | Description |
|---------------|-------------|
| `npm run build` | Install dependencies & compile TypeScript |
| `npm run tsc`   | Watch & compile TypeScript files |
| `npm start`     | Start the server from compiled files (`dist`) |
| `npm run dev`   | Dev mode with hot reload & auto compile |

---

## 🔧 Installation & Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/sy875/CampusHub.git
   cd campushub
   npm install
   npm run dev

