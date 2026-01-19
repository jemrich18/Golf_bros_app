from .settings import *
import dj_database_url
import os

DEBUG = False

ALLOWED_HOSTS = ['.railway.app', '.up.railway.app']

# Database - Railway provides DATABASE_URL
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.config(default=DATABASE_URL, conn_max_age=1800)
    }

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Add whitenoise to middleware (after SecurityMiddleware)
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')

# CORS - update with your frontend URL later
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'https://soothing-kindness-production-9b4e.up.railway.app',
]

# Security
CSRF_TRUSTED_ORIGINS = ['https://*.railway.app']
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


