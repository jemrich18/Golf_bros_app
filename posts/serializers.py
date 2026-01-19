from rest_framework import serializers
from .models import Post, Comment, Like


class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    like_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "author", 
            "post_title", 
            "post_content", 
            "course_name", 
            "course_city_state", 
            "course_type", 
            "date_played", 
            "score",
            "image",
            "created_at",
            "like_count",
            "comment_count",
        ]
    def get_like_count(self, obj):
        return obj.likes.count()
    
    def get_comment_count(self, obj):
        return obj.comments.count()

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "content", "author", "post", "created_at"]
        read_only_fields = ["post", "author"]


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = ["id", "user", "post"]
        read_only_fields = ["user", "post"]