<?php
/**
 * Created by PhpStorm.
 * User: 涛哥哥
 * Date: 2017/12/20
 * Time: 9:27
 */


$conn=mysqli_connect("localhost","root",'',"xywtweb",3306);
$sql="set names utf8";
mysqli_query($conn,$sql);


$allArr=[];

$sql="select  * from briefshow";
$result=mysqli_query($conn,$sql);
$arr=mysqli_fetch_all($result,MYSQLI_ASSOC);
array_push($allArr,$arr);

$sql="select * from hotcommodity order by sum DESC ";
$result=mysqli_query($conn,$sql);
$arr=mysqli_fetch_all($result,MYSQLI_ASSOC);
array_push($allArr,$arr);

$sql="select * from daily ";
$result=mysqli_query($conn,$sql);
$arr=mysqli_fetch_all($result,MYSQLI_ASSOC);
array_push($allArr,$arr);
echo json_encode($allArr);


