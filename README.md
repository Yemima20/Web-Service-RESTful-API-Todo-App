# Dokumentasi

Repositori ini adalah aplikasi backend untuk manajemen todo list. Dibangun menggunakan Node.js, ExpressJS, dan MongoDB. Repositori ini menyediakan beberapa endpoint CRUD (Create, Read, Update, Delete) untuk mengelola daftar todo.

## Daftar Isi

- [Instalasi](#instalasi)
- [Menjalankan Server](#menjalankan-server)
- [Endpoint API](#endpoint-api)
  - User
    -   [POST /todo-app/users/register](#post-todo_app-users/register)
    -   [POST /todo-app/users/login](#post-todo_app-users/login)
      
  - Todo
    - [GET /todo-app/todos](#get-todo_app-todos)
    - [POST /todo-app/todos/new](#post-todo_app-todos-new)
    - [GET /todo-app/todos/:id](#get-todo_app-todos-id)
    - [PATCH /todo-app/todos/:id](#patch-todo_app-todos-id)
    - [DELETE /todo-app/todos/:id](#delete-todo_app-todos-id)
    - [DELETE /todo-app/todos](#delete-todo_app-todos)
      
- [Contoh Penggunaan](#contoh-penggunaan)


## Instalasi

1. Clone repositori ini:
   
   ```bash
   git clone https://github.com/Yemima20/Web-Service-RESTful-API-Todo-App.git
   ```
    
3. Masuk ke direktori repositori:
   
   ```bash
   cd Web-Service-RESTful-API-Todo-App
   ```
   
4. Install dependensi:

   ```bash
   npm install
   ```

5. Pastikan Anda telah menginstal MongoDB dan konfigurasikan koneksi ke MongoDB dalam file `.env`.

## Menjalankan Server

Untuk menjalankan server, gunakan perintah berikut:

```bash
npm start
```

Server akan berjalan di `http://localhost:7050` secara default. Anda dapat mengonfigurasi port dalam file `.env` jika diperlukan.

## Endpoint API

Berikut adalah daftar endpoint API yang tersedia:

>### USER
#### POST /todo-app/users/register
**Deskripsi:** Endpoint ini digunakan untuk register atau mendaftar user baru.
**Request:**
- **Metode:** POST
- **URL:** `/todo-app/users/register`

**Response:**
- **Status 200 OK:** Mengembalikan data user yang berhasil register dalam format JSON.
- **Status 409 Conflict:** Jika sebelumnya user sudah pernah register dalam format JSON.
- **Status 500 Internal Server Error:** Jika terjadi kesalahan internal di server dalam format JSON.
- **Contoh Respons Sukses:**
  
```json

{
    "message": "Successfully registered!",
    "userId": "65a3d27629de02f9c4d1d634",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ..."
}

```

#### POST /todo-app/users/login
**Deskripsi:** Endpoint ini digunakan untuk user dapat melakukan login.
**Request:**
- **Metode:** POST
- **URL:** `/todo-app/users/login`

**Response:**
- **Status 200 OK:** Mengembalikan daftar user yang berhasil login dalam format JSON.
- **Status 404 Not Found:** Jika user tidak ditemukan seperti belum pernah register atau login dalam format JSON.
- **Status 401 Unauthorized:** Jika email atau password yang diberikan tidak cocok dalam format JSON.
- **Status 500 Internal Server Error:** Jika terjadi kesalahan internal di server dalam format JSON.
- **Contoh Respons Sukses:**

```json

{
    "message": "Succesfully log in!",
    "userId": "65a3d27629de02f9c4d1d634",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ..."
}

```

>### TODO
#### GET /todo-app/todos
**Deskripsi:** Endpoint ini digunakan untuk menampilkan seluruh todo user + masukkan token user setelah register dan atau login.
**Request:**
- **Metode:** GET
- **URL:** `/todo-app/todos`
- **Authorization:** Bearer {JWT token user}

**Response:**
- **Status 200 OK:** Mengembalikan daftar seluruh todo user dalam format JSON.
- **Status 500 Internal Server Error:** Jika terjadi kesalahan internal di server.
- **Contoh Respons Sukses:**
  
```json
{
    "todos": [
        {
            "_id": "65a3e631356e58190b37d887",
            "userId": "65a3dc4a29de02f9c4d1d638",
            "title": "Todo 1",
            "description": "Do todo 1",
            "completed": false,
            "createdAt": "2024-01-14T13:48:34.000Z",
            "updatedAt": "2024-01-14T13:48:34.000Z",
            "__v": 0
        },
        {
            "_id": "65a3e650356e58190b37d889",
            "userId": "65a3dc4a29de02f9c4d1d638",
            "title": "Todo 2",
            "description": "Do todo 2",
            "completed": false,
            "createdAt": "2024-01-14T13:49:04.478Z",
            "updatedAt": "2024-01-14T13:49:04.478Z",
            "__v": 0
        }
    ]
}
```

#### POST /todo-app/todos/new
**Deskripsi:** Endpoint ini digunakan user untuk membuat todo baru + masukkan token user setelah register dan atau login.
**Request:**
- **Metode:** POST
- **URL:** `/todo-app/todos/new`
- **Authorization:** Bearer {JWT token user}

**Response:**
- **Status 201 Created:** Mengembalikan hasil menambahkan/membuat todo baru dalam format JSON.
- **Status 400 Bad Request:** Jika mengirim data yang tidak lengkap sehingga todo tidak bisa ditambah dalam format JSON.
- **Contoh Respons Sukses:**
- 
```json
{
    "message": "Successfully created a new todo!",
    "todo": {
        "userId": "65a3dc4a29de02f9c4d1d638",
        "title": "Todo 1",
        "description": "Do todo 1",
        "completed": false,
        "_id": "65a3e631356e58190b37d887",
        "createdAt": "2024-01-14T13:48:34.000Z",
        "updatedAt": "2024-01-14T13:48:34.000Z",
        "__v": 0
    }
}
```

#### GET /todo-app/todos/:id
**Deskripsi:** Endpoint ini digunakan untuk menampilkan detail todo atau salah satu todo user berdasarkan ID todo + masukkan token user setelah register dan atau login.
**Request:**
- **Metode:** GET
- **URL:** `/todo-app/todos/:id`
- **Parameter URL:** `id` (ID todo yang dicari)
- **Authorization:** Bearer {JWT token user}

**Response:**
- **Status 200 OK:** Mengembalikan todo yang dicari berdasarkan id todo dalam format JSON.
- **Status 403 Forbidden:** Jika user mencoba mengakses todo milik user lain dalam format JSON.
- **Status 404 Not Found:** Jika todo yang dicari tidak ditemukan dalam format JSON.
- **Contoh Respons Sukses:**

```json
{
    "message": "Successfully viewed todo details!",
    "todo": {
        "_id": "65a3de9229de02f9c4d1d643",
        "userId": "65a3dc4a29de02f9c4d1d638",
        "title": "Todo 1",
        "description": "Do todo 1",
        "completed": false,
        "createdAt": "2024-01-14T13:16:02.552Z",
        "updatedAt": "2024-01-14T13:16:02.552Z",
        "__v": 0
    }
}
```

#### PATCH /todo-app/todos:id
**Deskripsi:** Endpoint ini digunakan untuk update/edit data todo user berdasarkan ID todo + masukkan token user setelah register dan atau login.
**Request:**
- **Metode:** PATCH
- **URL:** `/todo-app/todos:id`
- **Parameter URL:** `id` (ID todo yang akan diubah/update)
- **Authorization:** Bearer {JWT token user}

**Response:**
- **Status 200 OK:** Mengembalikan hasil update todo sesuai id todo yang dituju dalam format JSON.
- **Status 403 Forbidden:** Jika user mencoba update todo milik user lain dalam format JSON.
- **Status 400 Not Found:** Jika mengirim data yang tidak lengkap sehingga todo tidak bisa diupdate dalam format JSON.
- **Contoh Respons Sukses:**
  
```json
{
    "message": "Successfully changed the todo data!",
    "todo": {
        "_id": "65a3e631356e58190b37d887",
        "userId": "65a3dc4a29de02f9c4d1d638",
        "title": "Todo 1",
        "description": "Do todo 1",
        "completed": true,
        "createdAt": "2024-01-14T13:48:34.000Z",
        "updatedAt": "2024-01-14T14:13:14.011Z",
        "__v": 0
    }
}
```

#### DELETE /todo-app/todos:id
**Deskripsi:** Endpoint ini digunakan untuk menghapus todo berdasarkan ID todo.
**Request:**
- **Metode:** DELETE
- **URL:** `/todo-app/todos:id`
- **Parameter URL:** `id` (ID todo yang dihapus)
- **Authorization:** Bearer {JWT token user}

**Response:**
- **Status 200 OK:** Mengembalikan daftar seluruh tugas dalam format JSON.
- **Status 403 Forbidden:** Jika user mencoba menghapus todo milik user lain dalam format JSON.
- **Status 400 Not Found:** Jika tidak ditemukan data todo id sehingga todo tidak bisa dihapus dalam format JSON.
- **Contoh Respons Sukses:**
  
```json
{
    "message": "Successfully deleted todo!",
    "todo": {
        "_id": "65a3e631356e58190b37d887",
        "userId": "65a3dc4a29de02f9c4d1d638",
        "title": "Todo 1",
        "description": "Do todo 1",
        "completed": true,
        "createdAt": "2024-01-14T13:48:34.000Z",
        "updatedAt": "2024-01-14T14:13:14.011Z",
        "__v": 0
    }
}
```
#### DELETE /todo-app/todos
**Deskripsi:** Endpoint ini digunakan untuk menghapus semua todo user.
**Request:**
- **Metode:** DELETE
- **URL:** `/todo-app/todos
- **Authorization:** Bearer {JWT token user}

**Response:**
- **Status 200 OK:** Mengembalikan daftar seluruh tugas dalam format JSON.
- **Status 500 Internal Server Error:** Jika terjadi kesalahan internal di server.
- **Contoh Respons Sukses:**

```json
{
    "message": "Successfully deleted all todos"
}
```

## Contoh Penggunaan

Berikut adalah contoh penggunaan endpoint API dengan menggunakan perangkat lunak seperti [Postman](https://www.postman.com/) atau [curl](https://curl.se/):

  - User
    -  User melakukan Register: `POST http://localhost:7050/todo-app/users/register`
    -  User melakukan  login: `POST http://localhost:7050/todo-app/users/login`
      
  - Todo
    - Mendapatkan semua todo user: `GET http://localhost:7050/todo-app/users/todos`
    - Menambahkan todo baru user: `POST http://localhost:7050/todo-app/users/todos/new`
    - Mendapatkan detail todo user berdasarkan ID todo: `GET http://localhost:7050/todo-app/users/todos/:id`
    - Mengubah/update todo berdasarkan ID todo `PATCH http://localhost:7050/todo-app/users/todos/:id`
    - Menghapus todo user berdasarkan ID todo: `DELETE http://localhost:7050/todo-app/users/todos/:id`
    - Menghapus semua todo user: `DELETE http://localhost:7050/todo-app/todos`

Pastikan Anda mengganti `:id` dengan ID dan isi token user di Authorization (Bearer Token) yang sesuai dalam penggunaan praktis.
