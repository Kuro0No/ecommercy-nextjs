from rest_framework.serializers import ModelSerializer
from rest_framework import serializers as serializersCore
from base.api import serializers as serializersBase
from base.api.models import TotalProducts
from base.api.models import Category, Colors
from .models import  Cart, User, Order #SavedVideoModel
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer,SerializerMethodField



class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=[
            "name",
            "avatar",
            'id',
            'phone_number'
            # 'subcriber'
        ]



class RegisterUserSerializer(serializersCore.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializersCore.EmailField(required=True)
    name = serializersCore.CharField(required=True)
    password = serializersCore.CharField(min_length=8)

    class Meta:
        model = User
        fields = ('email', 'name', 'password',)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class ChangePasswordSerializer(serializersCore.ModelSerializer):
    password = serializersCore.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializersCore.CharField(write_only=True, required=True)
    old_password = serializersCore.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializersCore.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):

        user = self.context['request'].user
        if not user.check_password(value):
            raise serializersCore.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        user = self.context['request'].user
    
        if user.id != instance.pk:
            raise serializersCore.ValidationError({"authorize": "You dont have permission for this user."})
        instance.set_password(validated_data['password'])
        instance.save()

        return instance

class UpdateNameUserSerializer(serializersCore.ModelSerializer):
    # email = serializersCore.EmailField(required=True)
    password = serializersCore.CharField(write_only=True, required=True, validators=[validate_password])


    class Meta:
        model = User
        fields = ('name','password')
        extra_kwargs = {'password': {'required': True}}
        
   

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if user.id != instance.pk:
            raise serializersCore.ValidationError({"authorize": "You dont have permission for this user."})
       
        # instance.password = validated_data['password']
        instance.name = validated_data['name']  
        if instance.check_password(validated_data['password']):
            instance.save()
        else:
            raise serializersCore.ValidationError({"authorize": "password is not correct"})
        return instance



class UpdateAvatarUserSerializer(serializersCore.ModelSerializer):
    class Meta:
        model = User
        fields = ['avatar']

    # def update(self, instance, validated_data):
    #     user = self.context['request'].user
    #     if user.id != instance.pk:
    #         raise serializersCore.ValidationError({"authorize": "You dont have permission for this user."})
    #     instance.avatar = validated_data['avatar']  
    #     print(validated_data)
    #     if validated_data:
    #         instance.save()    
    #     return instance

class CategorySerializers(ModelSerializer):
    class Meta: 
        model = Category
        fields =['id','name']

class ColorsSerializers(ModelSerializer):
    class Meta: 
        model = Colors
        fields = '__all__'

        
class Products(ModelSerializer):
    seller = UserSerializer(read_only=False)
    category = CategorySerializers(read_only=False)
    color = ColorsSerializers(read_only=False,many=True)
    class Meta:
        model= TotalProducts
        fields = '__all__'

class CartSerializer(ModelSerializer):
    user = UserSerializer(read_only=False,many=False)
    product = Products(read_only=False)
    class Meta:
        model = Cart
        fields = '__all__'

    


class ProductsInCartUser(ModelSerializer):
    author =  UserSerializer(read_only=False)
    class Meta:
        model= Cart
        fields = ['product']

class OrderSerializer(ModelSerializer):
    user = UserSerializer(read_only=False)
    product = SerializerMethodField()
    
    class Meta:
        model = Order
        fields = '__all__'


