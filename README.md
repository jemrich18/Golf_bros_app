# Golf Bros

A full-stack golf community platform where golfers can share round recaps, course conditions, and scores with the community. Built with Django REST Framework and React.

---

## Features

**Round Posts**
- Share recaps from your most recent rounds
- Log your score, course name, and whether the course is public or private
- Report current course conditions to help other golfers plan their visits

**Community Feed**
- Browse posts from other golfers
- Stay up to date on course conditions and scores in your area

**User Accounts**
- Register and log in securely
- Manage your own posts with full create, edit, and delete control
- Permissions enforced — users can only edit and delete their own content

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Django, Django REST Framework |
| Frontend | React, Vite |
| Auth | Django REST Framework token authentication |
| Database | PostgreSQL |
| Package Management | uv |

---

## Project Structure

```
GOLF_BROS_APP/
├── accounts/          # User registration, auth, profiles
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── posts/             # Round posts, conditions, scoring
│   ├── models.py
│   ├── serializers.py
│   ├── permissions.py # Object-level permissions
│   ├── views.py
│   └── urls.py
├── frontend/          # React + Vite frontend
│   └── src/
├── backend/           # Django settings and config
└── manage.py
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/accounts/register/` | Register a new user |
| POST | `/api/accounts/login/` | Log in and receive auth token |

### Posts
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts/` | List all round posts |
| POST | `/api/posts/` | Create a new round post |
| GET | `/api/posts/<id>/` | Retrieve a single post |
| PUT | `/api/posts/<id>/` | Update a post (owner only) |
| DELETE | `/api/posts/<id>/` | Delete a post (owner only) |

---

## Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- uv

### Backend

```bash
git clone https://github.com/jemrich18/Golf_bros_app.git
cd Golf_bros_app
uv sync
```

Create a `.env` file in the root:

```
SECRET_KEY=your_django_secret_key
DEBUG=True
DATABASE_URL=your_database_url
```

Run migrations and start the server:

```bash
uv run python manage.py migrate
uv run python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Author

Jeremiah Emrich — [github.com/jemrich18](https://github.com/jemrich18)
