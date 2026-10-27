<x-layout>
  <h1>Account</h1>

  <user-card name="{{ $user['name'] }}" plan="{{ $user['plan'] }}"></user-card>

  <form method="post" action="{{ route('subscribe') }}">
    @csrf
    <ui-label for="email">Email</ui-label>
    <ui-input id="email" name="email" type="email" value="{{ old('email') }}" autocomplete="email" required @error('email') invalid @enderror></ui-input>
    @error('email')<p role="alert">{{ $message }}</p>@enderror
    <ui-button type="submit">Subscribe</ui-button>
  </form>
</x-layout>
