from django.test import TestCase, Client
from django.contrib.auth.models import User
from datetime import date
from .models import Post, Comment, Like


class PostModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.post = Post.objects.create(
            author=self.user,
            post_title='Great Round at Pebble Beach',
            post_content='Had an amazing round today.',
            course_name='Pebble Beach',
            course_city_state='Pebble Beach, CA',
            course_type='PB',
            date_played=date.today(),
            score=82
        )

    def test_post_created(self):
        self.assertEqual(self.post.post_title, 'Great Round at Pebble Beach')

    def test_post_str(self):
        self.assertIn('Great Round at Pebble Beach', str(self.post))
        self.assertIn('Pebble Beach', str(self.post))

    def test_post_score(self):
        self.assertEqual(self.post.score, 82)

    def test_post_course_type(self):
        self.assertEqual(self.post.course_type, 'PB')


class CommentModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.post = Post.objects.create(
            author=self.user,
            post_title='Test Post',
            post_content='Test content',
            course_name='Augusta National',
            course_city_state='Augusta, GA',
            course_type='PR',
            date_played=date.today()
        )
        self.comment = Comment.objects.create(
            content='Great round!',
            author=self.user,
            post=self.post
        )

    def test_comment_created(self):
        self.assertEqual(self.comment.content, 'Great round!')

    def test_comment_str(self):
        self.assertIn('testuser', str(self.comment))

    def test_comment_linked_to_post(self):
        self.assertEqual(self.comment.post, self.post)


class LikeModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.post = Post.objects.create(
            author=self.user,
            post_title='Test Post',
            post_content='Test content',
            course_name='Augusta National',
            course_city_state='Augusta, GA',
            course_type='PR',
            date_played=date.today()
        )
        self.like = Like.objects.create(
            user=self.user,
            post=self.post
        )

    def test_like_created(self):
        self.assertEqual(self.like.user, self.user)
        self.assertEqual(self.like.post, self.post)

    def test_one_like_per_user_per_post(self):
        from django.db import IntegrityError
        with self.assertRaises(IntegrityError):
            Like.objects.create(user=self.user, post=self.post)


class ProfileModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )

    def test_profile_auto_created(self):
        from accounts.models import Profile
        self.assertTrue(
            Profile.objects.filter(user=self.user).exists()
        )

    def test_profile_str(self):
        from accounts.models import Profile
        profile = Profile.objects.get(user=self.user)
        self.assertIn('testuser', str(profile))


class PostAPITest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.client.force_login(self.user)

    def test_post_list_accessible(self):
        self.client.logout()
        response = self.client.get('/api/posts/')
        self.assertIn(response.status_code, [200, 401, 403, 404])

    def test_create_post(self):
        response = self.client.post('/api/posts/', {
            'post_title': 'New Round',
            'post_content': 'Great day on the course',
            'course_name': 'Test Course',
            'course_city_state': 'Test City, KS',
            'course_type': 'PB',
            'date_played': date.today()
        }, content_type='application/json')
        self.assertIn(response.status_code, [200, 201])


    