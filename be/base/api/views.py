from django.shortcuts import render
from .serializers import TotalProductsSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from base.api.models import TotalProducts
# Create your views here.


@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/list-products/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of products'
        },
        {
            'Endpoint': '/list-products/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single products object'
        },
    ]
    return Response(routes)


class TotalProductView(viewsets.ModelViewSet):
    queryset = TotalProducts.objects.all()
    serializer_class = TotalProductsSerializers




