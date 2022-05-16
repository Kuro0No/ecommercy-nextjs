from django.contrib import admin

from base.api.models import TotalProducts,Category, Colors,Comments,RepComments,Reviews
from base.user.models import User,Cart,Order
from base.api.models import WeeklyDeal

# Register your models here.

class TotalProductAdmin(admin.ModelAdmin):
    list_display = ('name','price','uuid', 'get_color','category','price')
    list_filter = ['category','color']
    search_fields = ['name','category__name','color__name']
    readonly_fields = ['uuid']
    def get_color(self, obj): #hàm lấy color từ many to many field
        
        return "\n".join([p.name for p in obj.color.all()])

admin.site.register(TotalProducts,TotalProductAdmin)


class CategorytAdmin(admin.ModelAdmin):
    list_display = ('name','id' )
    list_filter = ['name']
    search_fields = ['name']
    readonly_fields = ['id']


admin.site.register(Category,CategorytAdmin)


class ColorsAdmin(admin.ModelAdmin):
    list_display = ('name','id' )
    list_filter = ['name']
    search_fields = ['name']
    readonly_fields = ['id']


admin.site.register(Colors,ColorsAdmin)

class CommentAdmin(admin.ModelAdmin):
    list_display = ('content','product_id' )
    list_filter = ['product_id',]
    search_fields = ['product_id','content']
    readonly_fields = ['id']


admin.site.register(Comments,CommentAdmin)


class RepCommentsAdmin(admin.ModelAdmin):
    list_display = ('content','comment_id' )
    # list_filter = ['comment_id']
    search_fields = ['comment_id','content']
    readonly_fields = ['id']


admin.site.register(RepComments,RepCommentsAdmin)



class ReviewssAdmin(admin.ModelAdmin):
    list_display = ('product_id','content','rate','id' )
    list_filter = ['product_id','rate']
    search_fields = ['product_id__name','rate']
    readonly_fields = ['id']


admin.site.register(Reviews,ReviewssAdmin)


class UserAdmin(admin.ModelAdmin):
    list_display = ('email','id','name','is_active', 'is_staff', 'is_superuser')
    readonly_fields = ['last_login', 'id', 'is_active']

admin.site.register(User,UserAdmin)



class CartAdmin(admin.ModelAdmin):
    list_display = ['product','user','quantity','get_total_price',]
    search_fields = ['product','user']
    readonly_fields = ['get_total_price']
    list_filter = ['user','product__category']


    def get_total_price(self,obj):
        for i in Cart.objects.filter(id=obj.id):
            return i.get_price()

    # def get_category(self,obj):
    #     for i in Cart.objects.all():
    #         print(i.product__name__category)
    #         return i.product__name__category
            
            
    
    

    

admin.site.register(Cart,CartAdmin)


class OrderAdmin(admin.ModelAdmin):
    list_display = ['user','status']
    list_filter = ['user', 'product_in_cart','status']
    search_fields = ['product_in_cart','user']


admin.site.register(Order,OrderAdmin)


class WeeklyDealAdmin(admin.ModelAdmin):
    list_display = ['product','get_seller']
    def get_seller(self,obj):
       for i in WeeklyDeal.objects.filter(id=obj.id):
          
           return i.product.seller
  


admin.site.register(WeeklyDeal,WeeklyDealAdmin)
