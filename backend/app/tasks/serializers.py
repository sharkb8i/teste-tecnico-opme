from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Task, Category

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ['id', 'name', 'color']

class TaskSerializer(serializers.ModelSerializer):
  user = serializers.SerializerMethodField()

  category = CategorySerializer(read_only=True)
  category_id = serializers.PrimaryKeyRelatedField(
    queryset=Category.objects.all(),
    source='category',
    write_only=True,
    required=False,
    allow_null=True
  )

  shared_with = serializers.SerializerMethodField()
  shared_with_ids = serializers.PrimaryKeyRelatedField(
    queryset=User.objects.all(),
    many=True,
    source='shared_with',
    required=False
  )

  class Meta:
    model = Task
    fields = [
      'id',
      'title',
      'description',
      'is_done',
      'created_at',
      'user',
      'category',
      'category_id',
      'shared_with',
      'shared_with_ids',
    ]
    read_only_fields = ['created_at', 'user']

  def get_shared_with(self, obj):
    return [u.username for u in obj.shared_with.all()]
  
  def get_user(self, obj):
    return {
        "id": obj.user.id,
        "username": obj.user.username
    }