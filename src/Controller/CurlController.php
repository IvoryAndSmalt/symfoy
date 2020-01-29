<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class CurlController extends AbstractController
{
    /**
     * @Route("/curl", name="curl")
     */
    public function index()
    {
        return $this->render('curl/index.html.twig', [
            'controller_name' => 'CurlController',
        ]);
    }
}
