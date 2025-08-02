from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
  name = models.CharField(max_length=100)
  color = models.CharField(max_length=7, default="#cccccc")
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')

  def __str__(self):
    return f"{self.name} ({self.color})"

class Task(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
  title = models.CharField(max_length=255)
  description = models.TextField(blank=True)
  is_done = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)

  category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks')
  shared_with = models.ManyToManyField(User, blank=True, related_name='shared_tasks')

  def __str__(self):
    return self.title