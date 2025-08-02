from rest_framework import viewsets, permissions
from django.db.models import Q
from .models import Task, Category
from .serializers import TaskSerializer, CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
  serializer_class = CategorySerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    return self.request.user.categories.all()

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)

class TaskViewSet(viewsets.ModelViewSet):
  serializer_class = TaskSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    user = self.request.user

    queryset = Task.objects.filter(
      Q(user=user) | Q(shared_with=user)
    ).distinct().order_by("-created_at")

    is_done = self.request.query_params.get("is_done")
    if is_done is not None:
      queryset = queryset.filter(is_done=(is_done.lower() == "true"))

    return queryset

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)