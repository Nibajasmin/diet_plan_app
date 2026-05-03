# recommender/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('generate-diet-plan/', views.generate_diet_plan, name='generate-diet-plan'),
    path('test/', views.test_api, name='test-api'),
]