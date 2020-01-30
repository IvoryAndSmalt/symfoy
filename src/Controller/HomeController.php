<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/home", name="home")
     */
    public function index()
    {

    

        // $curl = curl_init();

        // curl_setopt_array($curl, array(
        // CURLOPT_URL => "https://opendata.lillemetropole.fr/explore/dataset/panorama-des-festivals-metropolitains/download?format=json&amp",
        // CURLOPT_RETURNTRANSFER => true,
        // CURLOPT_TIMEOUT => 30,
        // CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        // CURLOPT_CUSTOMREQUEST => "GET",
        // CURLOPT_HTTPHEADER => array(
        // "cache-control: no-cache"
        // ),
        // ));
        
        // $response = curl_exec($curl);
        // $err = curl_error($curl);
        
        // curl_close($curl);
        
        






        // return $this->render('home/index.html.twig', [
        //     'controller_name' => 'HomeController',
        //     'json' => $response
        // ]);
    }
}
