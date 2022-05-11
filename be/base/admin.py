from django.contrib import admin

from base.api.models import TotalProducts,Category, Colors,Comments,RepComments

# Register your models here.

class TotalProductAdmin(admin.ModelAdmin):
    list_display = ('name','price','uuid', 'get_color','category')
    list_filter = ['category','color']
    search_fields = ['name']
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