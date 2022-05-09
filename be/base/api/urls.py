from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('list-products', views.TotalProductView)


urlpatterns = [
    path('', include(router.urls)),
    path('', views.getRoutes)
]
