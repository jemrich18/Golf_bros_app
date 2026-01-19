from django.db import models
from django.contrib.auth.models import User

# Post Model
class Post(models.Model):
    COURSE_TYPE_CHOICES = [
        ('PR', 'Private'), 
        ('PB', 'Public'),
    ]

    # Relationship to User
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    
    # Post info
    post_title = models.CharField(max_length=100)
    post_content = models.TextField()
    
    # Course info
    course_name = models.CharField(max_length=100)
    course_city_state = models.CharField(max_length=100)
    course_type = models.CharField(max_length=2, choices=COURSE_TYPE_CHOICES)
    
    # Round info
    date_played = models.DateField()
    score = models.IntegerField(blank=True, null=True)  # Optional
    
    # Image - optional
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    
    # Timestamps - auto-set
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.post_title} - {self.course_name}"
    

# Comment Model 
class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author} on {self.post}"
    

# Like Model
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')

    class Meta:
        unique_together = ['user', 'post']  # One like per user per post