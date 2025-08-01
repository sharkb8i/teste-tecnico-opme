from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
  serializer_class = TaskSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    queryset = Task.objects.filter(user=self.request.user).order_by("-created_at")
    is_done = self.request.query_params.get("is_done")
    if is_done is not None:
      queryset = queryset.filter(is_done=(is_done.lower() == "true"))
    return queryset

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)