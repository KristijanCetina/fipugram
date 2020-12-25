<template>
	<div class="about">
		<h1>Sign in to kc-fipugram</h1>
		<div class="container">
			<div class="row">
				<div class="col-sm"></div>
				<div class="col-sm">
					<form>
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
								v-on:keyup.enter="login()"
								type="password"
								class="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
							/>
						</div>
						<button type="button" @click="login()" class="btn btn-primary">
							Login
						</button>
						<div>
							<p style="color:gray;">or you can</p>
							<button
								type="button"
								@click="loginWithGoogle()"
								class="btn btn-secondary">
								Login with Google
							</button>
						</div>
						<p class="forgot-password">
							You don't have an account?
							<router-link :to="{ name: 'Signup' }">sign up</router-link>
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
export default {
	name: "login",
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		login() {
			console.log("login..." + this.email);
			firebase
				.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.then((result) => {
					this.$router.replace({ name: "Home" });
				})
				.catch(function (e) {
					console.error(e);
				});
		},
		loginWithGoogle() {
			console.log("Login with google");
			const provider = new firebase.auth.GoogleAuthProvider();
			firebase
				.auth()
				.signInWithPopup(provider)
				.then((result) => {
					this.$router.replace({ name: "Home" });
					store.token = result.credential.accessToken;
				})
				.catch(function (error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					// The email of the user's account used.
					var email = error.email;
					// The firebase.auth.AuthCredential type that was used.
					var credential = error.credential;
					// ...
				});
		},
	},
};
</script>
