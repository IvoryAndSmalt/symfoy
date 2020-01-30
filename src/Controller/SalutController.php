<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SalutController extends AbstractController
{
    /**
     * @Route("/salut", name="salut")
     */
    public function index()
    {
        return $this->render('salut/index.html.twig', [
            'controller_name' => 'SalutController',
        ]);
    }
}
