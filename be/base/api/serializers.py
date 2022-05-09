

from rest_framework import serializers 
from rest_framework.serializers import ModelSerializer,SerializerMethodField
from .models import TotalProducts


class TotalProductsSerializers(ModelSerializer):
    class Meta:
        model= TotalProducts
        fields = '__all__'