from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('list-products', views.TotalProductView)
# router.register('weeky-deal', views.WeekyDealView)


urlpatterns = [
    path('', include(router.urls)),
    path('weeky-deal/', views.WeekyDealView, name='weeky-deal')
    # path('as/', views.getRoutes)
]
