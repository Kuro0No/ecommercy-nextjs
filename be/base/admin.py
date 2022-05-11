from django.contrib import admin

from base.api.models import TotalProducts,Category, Colors

# Register your models here.

class TotalProductAdmin(admin.ModelAdmin):
    list_display = ('name','price','uuid' )
    list_filter = ['name']
    search_fields = ['name']
    readonly_fields = ['uuid']


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