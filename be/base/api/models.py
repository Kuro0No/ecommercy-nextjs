from distutils.command.upload import upload
import uuid
from django.db import models

# Create your models here.


class Sector(models.Model):
    name = models.CharField(null=True,max_length=150)

class TotalProducts(models.Model):
    # author = models.ForeignKey()
    uuid = models.UUIDField(primary_key = True, default =uuid.uuid4, unique=True, editable=False)
    name = models.CharField(null=True, max_length=150)
    description = models.TextField(null=True,blank=True)
    image = models.ImageField(upload_to='image',null=True)
    created = models.DateTimeField(auto_now_add = True, null=True)
    image = models.ImageField(upload_to='video',null=True,blank=True)
    price = models.FloatField(null=True)

    class Meta:   
        ordering = ['-created']

    def __str__(self):
        return self.name[0:50]