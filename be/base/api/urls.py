from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
router = DefaultRouter()
router.register('list-products', views.TotalProductView)
# router.register('weeky-deal', views.WeekyDealView)


urlpatterns = [
    path('', include(router.urls)),
    path('weeky-deal/', views.WeekyDealView, name='weeky-deal'),
    path('comments-list/<str:pk>', views.CommentsView.as_view({'get': 'list'}), name='comments'),
    path('get-rep-comments/<int:pk>', views.RepCommentsView.as_view({'get': 'list'}), name='rep-comments'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('as/', views.getRoutes)
]
 