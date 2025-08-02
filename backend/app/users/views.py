from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from rest_framework.serializers import ModelSerializer

class UserSerializer(ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username']

class UserViewSet(viewsets.ReadOnlyModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [permissions.IsAuthenticated]