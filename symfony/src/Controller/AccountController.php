<?php

namespace App\Controller;

use App\Form\SubscribeType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AccountController extends AbstractController
{
    public function __construct(private readonly FormFactoryInterface $forms)
    {
    }

    #[Route('/', name: 'account', methods: ['GET', 'POST'])]
    public function index(Request $request): Response
    {
        $form = $this->forms->createNamed('', SubscribeType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $request->getSession()->set('subscribed', $form->get('email')->getData());

            return $this->redirectToRoute('subscribed', status: Response::HTTP_SEE_OTHER);
        }

        return $this->render('account/index.html.twig', [
            'user' => ['name' => 'Ada Lovelace', 'plan' => 'Pro'],
            'form' => $form,
        ]);
    }

    #[Route('/subscribed', name: 'subscribed', methods: ['GET'])]
    public function subscribed(Request $request): Response
    {
        return $this->render('account/subscribed.html.twig', [
            'email' => $request->getSession()->get('subscribed'),
        ]);
    }
}
