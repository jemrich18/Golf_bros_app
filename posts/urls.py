from django.urls import path
from .views import (
    PostListCreateView, 
    PostDetailView,
    CommentListCreateView,
    CommentDetailView,
    LikeToggleView,
    LikeDeleteView,
)

urlpatterns = [
    # Posts
    path('posts/', PostListCreateView.as_view(), name='post-list'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    
    # Comments
    path('posts/<int:post_id>/comments/', CommentListCreateView.as_view(), name='comment-list'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),

    # Likes
    path('posts/<int:post_id>/like/', LikeToggleView.as_view(), name='like-toggle'),
    path('likes/<int:pk>/', LikeDeleteView.as_view(), name='like-delete'),
]