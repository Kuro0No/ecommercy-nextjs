from distutils.command.upload import upload
from turtle import color
import uuid
from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(null=True,max_length=150)
    def __str__(self):
        return f"{self.name}, {self.id} "

class Colors(models.Model):
    name = models.CharField(null=True,max_length=150)
    def __str__(self):
        return f"{self.name}, {self.id} "

class TotalProducts(models.Model):
    # author = models.ForeignKey()
    uuid = models.UUIDField(primary_key = True, default =uuid.uuid4, unique=True, editable=False)
    name = models.CharField(null=True, max_length=150)
    description = models.TextField(null=True,blank=True)
    image = models.FileField(upload_to='image',null=True)
    created = models.DateTimeField(auto_now_add = True, null=True)
    video = models.FileField(upload_to='video',null=True,blank=True)
    color = models.ManyToManyField(Colors, null=True)
    category = models.ForeignKey(Category, null=True, on_delete=models.CASCADE)
    price = models.FloatField(null=True)

    class Meta:   
        ordering = ['-created']

    def __str__(self):
        return self.name[0:50]



class Reviews(models.Model):
    # user = models.ForeignKey()
    post_id = models.ForeignKey(TotalProducts, on_delete=models.CASCADE,null=True)
    content = models.CharField(null=True,max_length=150)
    rate = models.IntegerField(null=True)
    def __str__(self):
        return f"{self.content[0:50]}, {self.rate} "



class Comments(models.Model):
    # user = models.ForeignKey()
    post_id = models.ForeignKey(TotalProducts, on_delete=models.CASCADE,null=True)
    content = models.CharField(null=True,max_length=150)
    rate = models.IntegerField(null=True)
    def __str__(self):
        return f"{self.content[0:50]}, {self.rate} "

class RepComments(models.Model):
    # user = models.ForeignKey()
    comment_id =  models.ForeignKey(Comments, on_delete=models.CASCADE,null=True)
    content = models.CharField(null=True,max_length=150)
    rate = models.IntegerField(null=True)
    def __str__(self):
        return f"{self.content[0:50]}, {self.rate} "