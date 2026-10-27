<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SubscriptionController
{
    public function create()
    {
        return view('account', [
            'user' => ['name' => 'Ada Lovelace', 'plan' => 'Pro'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['email' => 'required|email']);

        return view('subscribed', ['email' => $validated['email']]);
    }
}
