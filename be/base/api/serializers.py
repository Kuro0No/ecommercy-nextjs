
from base.user.serializers import UserSerializer
from rest_framework import serializers 
from rest_framework.serializers import ModelSerializer,SerializerMethodField
from .models import Category, Colors, Comments, RepComments, Reviews, TotalProducts

class CategorySerializers(ModelSerializer):
    class Meta: 
        model = Category
        fields =['id','name']

class ColorsSerializers(ModelSerializer):
    class Meta: 
        model = Colors
        fields =('id','name')


class TotalProductsSerializers(ModelSerializer):

    color = ColorsSerializers(read_only=True, many=True)
    category = CategorySerializers(read_only=True, many=False)
    seller = UserSerializer(read_only=True)
    class Meta:
        model= TotalProducts
        fields = '__all__'

class ReviewsSerializer(ModelSerializer):
    # user = UserSerializer(read_only=False)
    class Meta:
        model= Reviews
        fields = '__all__'
    

class CommentsListSerializer(ModelSerializer):
    # user = UserSerializer(read_only=False)
    count_rep_comments = SerializerMethodField()

    class Meta:
        model= Comments
        fields = '__all__'

    
    def get_count_rep_comments(self, obj):
            count_rep_comment = RepComments.objects.filter(comment_id=obj.id)
            total = len(count_rep_comment)
            return total
        
class RepCommentListSerializer(ModelSerializer):
    # user = UserSerializer(read_only=False)
    class Meta:
        model= RepComments
        fields = '__all__'
    