# ===== 0) Create project (Angular 16) =====
npm i -g @angular/cli@16
ng new SchoolAppUI --routing --style=scss --strict=false
cd SchoolAppUI

# ===== 1) Install deps =====
npm i bootstrap
npm i -D json-server concurrently

# ===== 2) Wire Bootstrap (CSS + JS) =====
Add-Content -Path "src/styles.scss" -Value '@import "bootstrap/dist/css/bootstrap.min.css";'
Add-Content -Path "src/main.ts" -Value 'import "bootstrap/dist/js/bootstrap.bundle.min.js";'

# ===== 3) Core / Shared / Layout =====
ng g m app/core
ng g m app/shared
ng g m app/layout
ng g c app/layout/shell --skip-tests

# Interceptors & Guard
ng g interceptor app/core/interceptors/api-prefix --skip-tests
ng g interceptor app/core/interceptors/auth-token --skip-tests
ng g interceptor app/core/interceptors/error --skip-tests
ng g g app/core/guards/auth --skip-tests

# ===== 4) Public pages feature (Home / About / Contact) =====
ng g m app/features/info --route home --module app/app-routing.module.ts
ng g c app/features/info/pages/home --skip-tests
ng g c app/features/info/pages/about --skip-tests
ng g c app/features/info/pages/contact --skip-tests

# ===== 5) Dashboard (lazy) =====
ng g m app/features/dashboard --route dashboard --module app/app-routing.module.ts
ng g c app/features/dashboard/dashboard --skip-tests
ng g s app/features/dashboard/services/dashboard --skip-tests

# ===== 6) Students (lazy) =====
ng g m app/features/students --route students --module app/app-routing.module.ts
ng g c app/features/students/pages/list-students --skip-tests
ng g c app/features/students/pages/create-student --skip-tests
ng g c app/features/students/pages/edit-student --skip-tests
ng g s app/features/students/services/students --skip-tests
ng g class app/models/student --type=model --skip-tests

# ===== 7) Teachers (lazy) =====
ng g m app/features/teachers --route teachers --module app/app-routing.module.ts
ng g c app/features/teachers/teachers --skip-tests
ng g c app/features/teachers/pages/list-teachers --skip-tests
ng g c app/features/teachers/pages/create-teacher --skip-tests
ng g c app/features/teachers/pages/edit-teacher --skip-tests
ng g s app/features/teachers/services/teachers --skip-tests
ng g class app/models/teacher --type=model --skip-tests

# ===== 8) Classes (lazy) =====
ng g m app/features/classes --route classes --module app/app-routing.module.ts
ng g c app/features/classes/classes --skip-tests
ng g s app/features/classes/services/classes --skip-tests
ng g class app/models/class --type=model --skip-tests

# ===== 9) Shared: 2 directives + 2 pipes =====
ng g d app/shared/directives/highlight --skip-tests
ng g d app/shared/directives/autofocus-invalid --skip-tests
ng g p app/shared/pipes/initials --skip-tests
ng g p app/shared/pipes/phone --skip-tests



# ===== 10) Dev proxy (so HttpClient can call relative paths like 'students') =====
@'
{
  "/": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "warn"
  }
}
'@ | Set-Content -Path "proxy.conf.json" -Encoding UTF8




# ===== 11) json-server data =====
New-Item -ItemType Directory -Path "json-server" -Force | Out-Null
@'
{
  "dashboardSummary": {
    "totalStudents": 248,
    "totalTeachers": 18,
    "totalClasses": 12,
    "feesDueThisMonth": 185000
  },
  "students": [
    { "id": 1, "name": "Asha", "classId": 1, "rollNo": "10A-01", "dob": "2012-04-15", "address": "Bangalore" },
    { "id": 2, "name": "Ravi", "classId": 2, "rollNo": "9B-14",  "dob": "2011-01-22", "address": "Bangalore" },
    { "id": 3, "name": "Kiran","classId": 1, "rollNo": "10A-02", "dob": "2012-08-01", "address": "Bangalore" },
    { "id": "ea34", "name": "Madan", "rollNo": "24", "classId": 2, "dob": "2025-10-30", "address": "Bangolore" }
  ],
  "teachers": [
    { "id": 1, "name": "Rajesh", "subject": "Maths",   "phone": "9811111111", "email": "rajesh@example.com", "joinDate": "2023-06-01" },
    { "id": 2, "name": "Meera",  "subject": "Science", "phone": "9822222222", "email": "meera@example.com",  "joinDate": "2022-08-15" },
    { "id": 3, "name": "Arun",   "subject": "English", "phone": "9833333333", "email": "arun@example.com",   "joinDate": "2021-04-10" },
    { "name": "Madan", "subject": "angular", "phone": "6666666097", "email": "", "joinDate": "2025-10-21", "id": "4546" }
  ],
  "classes": [
    { "id": 1, "name": "10-A", "section": "A", "room": "204", "capacity": 35, "teacherId": 1, "subject": "Maths" },
    { "id": 2, "name": "9-B", "section": "B", "room": "105", "capacity": 32, "teacherId": 2, "subject": "Science" },
    { "id": 3, "name": "8-C", "section": "C", "room": "307", "capacity": 30, "teacherId": 3, "subject": "English" },
    { "id": 4, "name": "7-A", "section": "A", "room": "109", "capacity": 28, "teacherId": 2, "subject": "History" }
  ],
  "notices": [
    { "id": 1, "title": "Holiday on Friday", "body": "School closed for festival.", "date": "2025-10-10" },
    { "id": 2, "title": "PTM Schedule", "body": "Parent-Teacher meeting next week.", "date": "2025-10-08" }
  ],
  "messages": []
}
'@ | Set-Content -Path "json-server/db.json" -Encoding UTF8

# ===== 12) NPM scripts (start, api, dev) =====
npm pkg set scripts.start="ng serve --proxy-config proxy.conf.json"
npm pkg set scripts.api="json-server --watch json-server/db.json --port 3000"
npm pkg set scripts.dev="concurrently \"ng serve --proxy-config proxy.conf.json\" \"npm run api\""

# ===== 13) Friendly tip output =====
Write-Host "`nAll set!"
Write-Host "Run:  npm run dev"
Write-Host "App:  http://localhost:4200"
Write-Host "API:  http://localhost:3000"
