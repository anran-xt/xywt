<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/12
 * Time: 20:52
 */

$conn=mysqli_connect("localhost","root",'',"xywtweb",3306);
$sql="set names utf8";
mysqli_query($conn,$sql);
//
$dataArr=[];


//移入商家显示的数据
$sql="select distinct origin from commodity";
$originRes=mysqli_query($conn,$sql);
$originRes=mysqli_fetch_all($originRes);
$originArr=[];
for($i=0;$i<count($originRes);$i++){
    $originArr[]=$originRes[$i][0];
}
$resdataArr=[];
$resLargeArr=[];
$resMiddleArr=[];
$resSmallArr=[];
for($i=0;$i<count($originArr);$i++){
    $resLargeArr=[];
    $resdataArr[]=$originArr[$i];
    $sql="select distinct largeclass from commodity where origin='$originArr[$i]'";
    $largeRes=mysqli_query($conn,$sql);
    $largeRes=mysqli_fetch_all($largeRes);
    $largeArr=[];
    for($j=0;$j<count($largeRes);$j++){
        $resMiddleArr=[];
        $largeArr[]=$largeRes[$j][0];
        $resLargeArr[]=$largeArr[$j];

        $sql="select distinct middleclass from commodity where origin='$originArr[$i]' and largeclass='$largeArr[$j]'";

        $middleRes=mysqli_query($conn,$sql);
        $middleRes=mysqli_fetch_all($middleRes);
        $middleArr=[];
        for($k=0;$k<count($middleRes);$k++) {
            $resSmallArr=[];

            $middleArr[] = $middleRes[$k][0];
            $resMiddleArr[]=$middleArr[$k];
            $sql="select disimg from smallpic where origin='$originArr[$i]' and largeclass='$largeArr[$j]' and middleclass='$middleArr[$k]'";
            $res=mysqli_query($conn,$sql);
            $result=mysqli_fetch_row($res)[0];
            $resMiddleArr[]=$result;

            $sql="select distinct smallclass from commodity where origin='$originArr[$i]' and largeclass='$largeArr[$j]' and middleclass='$middleArr[$k]'";
            $smallRes=mysqli_query($conn,$sql);
            $smallRes=mysqli_fetch_all($smallRes);
            $smallArr=[];
            for($p=0;$p<count($smallRes);$p++){
                $smallArr[]=$smallRes[$p][0];
                $resSmallArr[]=$smallArr[$p];
            }
            $resMiddleArr[]=$resSmallArr;
        }
        $resLargeArr[]=$resMiddleArr;
    }
    $resdataArr[]=$resLargeArr;
}
array_push($dataArr,$resdataArr);

//热门商品数据
$sql="select tradename,productimg,salesvolume,nowpri from commodity order by salesvolume desc";
$result=mysqli_query($conn,$sql);
$hopRes=mysqli_fetch_all($result,MYSQLI_ASSOC);
$hotResTemp=[];
$max=count($hopRes)<20?count($hopRes):20;
for($i=0;$i<$max;$i++){
    $hotResTemp[]=$hopRes[$i];
}
$hopRes=$hotResTemp;
array_push($dataArr,$hopRes);


//促销商品数据
$sql="select origin,largeclass,tradename,productimg,nowpri,oldpri,surplus,spec  from commodity where ifsalespromotion=1 order by salesvolume desc";
$result=mysqli_query($conn,$sql);
$res=mysqli_fetch_all($result,MYSQLI_ASSOC);
//echo json_encode($res);
array_push($dataArr,$res);
echo json_encode($dataArr);



