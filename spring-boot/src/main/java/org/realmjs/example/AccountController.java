package org.realmjs.example;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class AccountController {

    @GetMapping("/")
    String index(Model model) {
        model.addAttribute("user", new User("Ada Lovelace", "Pro"));
        return "index";
    }

    @PostMapping("/subscribe")
    RedirectView subscribe(@RequestParam String email, RedirectAttributes redirect) {
        redirect.addFlashAttribute("email", email);
        RedirectView view = new RedirectView("/subscribed");
        view.setStatusCode(HttpStatus.SEE_OTHER);
        return view;
    }

    @GetMapping("/subscribed")
    String subscribed() {
        return "subscribed";
    }
}
