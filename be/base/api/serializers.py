

from dataclasses import field
from rest_framework import serializers 
from rest_framework.serializers import ModelSerializer,SerializerMethodField
from .models import Category, Colors, TotalProducts

class CategorySerializers(ModelSerializer):
    class Meta: 
        model = Category
        field ='__all__'

class ColorsSerializers(ModelSerializer):
    class Meta: 
        model = Colors
        field ='__all__'


class TotalProductsSerializers(ModelSerializer):
    class Meta:
        model= TotalProducts
        fields = '__all__'

