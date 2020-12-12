<template>
	<div class="about">
		<h1>This is the login page</h1>
		<div class="container">
			<div class="row">
				<div class="col-sm"></div>
				<div class="col-sm">
					<form>
						<div class="form-group">
							<label for="exampleInputEmail1">Full name</label>
							<input
								v-model="fullName"
								type="text"
								class="form-control"
								aria-describedby="fullNamelHelp"
								placeholder="Enter your full name"
							/>
						</div>
						<div class="form-group">
							<label for="exampleInputEmail1">Email address</label>
							<input
								v-model="email"
								type="email"
								class="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter email"
							/>
							<small id="emailHelp" class="form-text text-muted"
								>We'll never share your email with anyone else.</small
							>
						</div>
						<div class="form-group">
							<label for="exampleInputPassword1">Password</label>
							<input
								v-model="password"
								type="password"
								class="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
							/>

							<small id="passwordHelp" class="form-text text-muted"
								>Please use strong password or even better, a password manager
								like
								<a href="https://1password.com/" target="_blank"
									>1Password</a
								></small
							>
						</div>
						<button type="button" @click="signup()" class="btn btn-primary">
							Submit
						</button>
						<p class="forgot-password">
							Already registered?
							<router-link :to="{ name: 'Login' }">sign in</router-link>
						</p>
					</form>
				</div>
				<div class="col-sm"></div>
			</div>
		</div>
	</div>
</template>
<script>
import { firebase } from "@/firebase";
import func from "../../vue-temp/vue-editor-bridge";

export default {
	name: "Signup",
	data() {
		return {
			fullName: "",
			email: "",
			password: "",
		};
	},
	methods: {
		signup() {
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.email, this.password)
				.then(function () {
          console.log("Uspješna registracija");
          this.email = "";
					this.password = "";
				})
				.catch(function (error) {
					console.error("Došlo je do greške: ", error);
					if (error.message) {
						alert(error.message);
					}
				});
		},
	},
};
</script>