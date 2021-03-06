from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import viewsets,generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from base.api.serializers import TotalProductsSerializers
from base.api.models import TotalProducts
from .paginations import CustomPageSearchNumberPagination,CustomPageNumberPagination
from .models import Cart, User
from .serializers import CartSerializer, RegisterUserSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


# from rest_framework.views import APIView

# Create your views here.


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    
    def post(self,request, formast='json'):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartView(generics.ListCreateAPIView, generics.DestroyAPIView,generics.UpdateAPIView):
    pagination_class = CustomPageSearchNumberPagination
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,] #filters.BaseFilterBackend, filters.OrderingFilter,
    # queryset = Cart.objects.all()
    # ordering = ('-price',)
    # filter_fields = ['color','category']   
    serializer_class = CartSerializer
    search_fields = ['name']

    def get_queryset(self):
        
        cart = Cart.objects.filter(user=self.kwargs['pk'])
        
        return cart

    def create(self,validated_data,pk):
        data = validated_data.data
        user = User.objects.get(id=pk)
        product = TotalProducts.objects.get(uuid = data['product'])
      
        check = Cart.objects.filter(user = user,product=product).exists()
     
        if check:
            cart = Cart.objects.get(user=user,product=product)
       
            cart.quantity += int(data['quantity'])
            cart.save()
            return Response('Update successfully', status = status.HTTP_200_OK)
        else:
            cart = Cart.objects.create(
            user=user,
            product=product,
            quantity = data['quantity']
        )
            return Response('Success', status = status.HTTP_200_OK)
       
            
        return Response(True)

    
 