<?php
/**
 * Created by PhpStorm.
 * User: Lishuai
 * Date: 2016/12/14
 * Time: 23:46
 */
//表单数据的读入



define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PWD', '');
define('DB_NAME', 'db_apple');


$array = array();
$array['name'] = $_POST['name'];
$array['order1_num'] = $_POST['order1_num'];
$array['delivery1_num'] = floor($array['order1_num']/2) + $array['order1_num'];

$array['order2_num'] = $_POST['order2_num'];
$array['delivery2_num'] = floor($array['order2_num']/2) + $array['order2_num'];

$array['order3_num'] = $_POST['order3_num'];
$array['delivery3_num'] = floor($array['order3_num']/2) + $array['order3_num'];

$array['total'] = $_POST['total'];
$array['tel_num'] = $_POST['tel_num'];
$array['address'] = $_POST['address'];
$array['remark'] = $_POST['remark'];
//数据库插入的操作
$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8");
$sql = "INSERT INTO `tb_order`(
                        `name`,
                        `order1_num`,
                        `delivery1_num`,
                        `order2_num`,
                        `delivery2_num`,
                        `order3_num`,
                        `delivery3_num`,
                        `total`,
                        `tel_num`,
                        `address`,
                        `remark`
                        )VALUE (?,?,?,?,?,?,?,?,?,?,?)";//excute a test

$stmt = $con->prepare($sql);
$stmt->bind_param("siiiiiiisss",
    $array['name'],
    $array['order1_num'],
    $array['delivery1_num'],
    $array['order2_num'],
    $array['delivery2_num'],
    $array['order3_num'],
    $array['delivery3_num'],
    $array['total'],
    $array['tel_num'],
    $array['address'],
    $array['remark']
);
$stmt->execute();

$affected_rows = $stmt->affected_rows;
$stmt->close();
$con->close();

echo json_encode($affected_rows == 1);