from django.contrib import admin
from .models import Todo
from .models import Exercise
from .models import Exercises_made_by_user

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

# Register your models here.

admin.site.register(Todo, TodoAdmin)
admin.site.register(Exercise)
admin.site.register(Exercises_made_by_user)