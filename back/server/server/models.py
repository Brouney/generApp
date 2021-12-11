from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

class Exercise(models.Model):
    name = models.CharField(max_length=120)

class Exercises_made_by_user(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    exercise = models.ForeignKey(Exercise, on_delete=models.DO_NOTHING)