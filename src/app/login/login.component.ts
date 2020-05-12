import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { RouterExtensions } from 'nativescript-angular/router';
import { LoginService } from "./login.service";
import * as dialog from "tns-core-modules/ui/dialogs";


@Component({
    selector: "login",
    templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {

    user: User = { username: "username", password: "password" };

    loginForm: FormGroup = this.fb.group({
        username: [this.user.username, [Validators.required]],
        password: [this.user.password, [Validators.required]],
    });

    username = this.loginForm.get("username");
    password = this.loginForm.get("password");


    constructor(
        private page: Page,
        private fb: FormBuilder,
        private ls: LoginService,
        private router: RouterExtensions,
    ) {
        page.actionBarHidden = true;
    }

    ngOnInit(): void { }

    login() {
        if (this.ls.login(this.loginForm.value)) {
            this.router.navigate(["/pokemon"]);
        }
    }

    register() {
        if (this.ls.isAlreadyRegistered()) {
            dialog
                .confirm("Rgister a new user well replace the current user. Are you sure?")
                .then((result) => {
                    if (result) {
                        this.ls.register(this.loginForm.value);
                        alert(`User ${this.loginForm.value.username} has been registered`);
                    }
                });
        } else {
            this.ls.register(this.loginForm.value);
            alert(`User ${this.loginForm.value.username} has been registered`);
        }
    }
}
