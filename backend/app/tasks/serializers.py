from rest_framework import serializers
from .models import Task, Category

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ['id', 'name', 'color']

class TaskSerializer(serializers.ModelSerializer):
  user = serializers.ReadOnlyField(source='user.username')
  category = CategorySerializer(read_only=True)
  category_id = serializers.PrimaryKeyRelatedField(
    queryset=Category.objects.all(),
    source='category',
    write_only=True,
    required=False,
    allow_null=True
  )

  class Meta:
    model = Task
    fields = ['id', 'title', 'description', 'is_done', 'created_at', 'user', 'category', 'category_id']
    read_only_fields = ['created_at', 'user']