from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
# from .views import ChangePasswordView, CustomUserCreate, BlacklistTokenUpdateView, ProfileModels, UpdateNameProfileView,UpdateAvatarProfileView


router = DefaultRouter()
# router.register('cart', views.CartView)


urlpatterns = [
    path('', include(router.urls)),
    path('cart/<str:pk>/', views.CartView.as_view(), name='cart-user')
    # path('register/', CustomUserCreate.as_view(), name="create_user"),
    # path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password'),
    # path('profile/<int:pk>/', ProfileModels.as_view(), name='profile'),
    # path('update_name/<int:pk>/', UpdateNameProfileView.as_view(), name='auth_update_profile'),
    # path('update_avatar/<int:pk>/', UpdateAvatarProfileView.as_view(), name='auth_update_profile'),
    # path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist')
]
