from django.shortcuts import render
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from base.api.paginations import CustomPageSearchNumberPagination
from base.api.models import WeeklyDeal
from base.api.serializers import TotalProductsSerializers, WeeklyDealSerializer 
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
    
    
    serializer_class = TotalProductsSerializers
    pagination_class = CustomPageSearchNumberPagination
    filter_backends = [filters.SearchFilter,DjangoFilterBackend,filters.OrderingFilter] #filters.BaseFilterBackend, filters.OrderingFilter,
    search_fields = ['name']
    ordering_fields  = ['price',]
    filterset_fields  = ['color','category']   
    queryset = TotalProducts.objects.all()

    # def get_queryset(self):
    #     pk = self.kwargs['pk']
    #     data = TotalProducts.objects.get(uuid=pk)
    #     serializer = TotalProductsSerializers(data)
    #     colorsData = serializer.data['color']

    #     colors = []
    #     for col in colorsData:
    #         # if genre  not in list_genres:
    #         color = col['id']
    #         colors.append(color)
        
    #     return TotalProductsSerializers.objects.filter(color__in=colors).order_by('-created').exclude(uuid=pk).distinct()


@api_view(['GET', 'POST'])
def WeekyDealView(request):
    data = request.data
    if request.method == "GET":
        weeky = WeeklyDeal.objects.all()
        serializer = WeeklyDealSerializer(weeky, many=True)

        return Response(serializer.data)
    
    if request.method == "POST":
        # print(data)
        uuid = TotalProducts.objects.get(uuid = data['product']['uuid'])
        data2 = WeeklyDeal.objects.create(
            product = uuid
        )
        data2.save()
        if len(WeeklyDeal.objects.all()) >2 :
            data3 =WeeklyDeal.objects.all()[0]
            data3.delete()

        serrializer = WeeklyDealSerializer(data2,many=False)
            

        return Response(serrializer.data)
