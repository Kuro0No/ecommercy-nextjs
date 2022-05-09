from django.contrib import admin

from base.api.models import TotalProducts
# Register your models here.

class TotalProductAdmin(admin.ModelAdmin):
    list_display = ('name','price','uuid' )
    list_filter = ['name']
    search_fields = ['name']
    readonly_fields = ['uuid']


admin.site.register(TotalProducts,TotalProductAdmin)