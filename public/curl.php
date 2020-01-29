<?php
$curl = curl_init();

curl_setopt_array($curl, array(
CURLOPT_URL => "https://data.culture.gouv.fr/explore/dataset/panorama-des-festivals/download?format=json&timezone=Europe/Berlin&use_labels_for_header=true",
CURLOPT_RETURNTRANSFER => true,
CURLOPT_TIMEOUT => 30,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
CURLOPT_CUSTOMREQUEST => "GET",
CURLOPT_HTTPHEADER => array(
"cache-control: no-cache",
"Access-Control-Allow-Origin: '*'"
),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

echo $response;
