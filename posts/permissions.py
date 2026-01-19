from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Only the author/user can edit or delete.
    Everyone else can only read.
    """
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Check for 'author' (posts, comments) or 'user' (likes)
        if hasattr(obj, 'author'):
            return obj.author == request.user
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return False