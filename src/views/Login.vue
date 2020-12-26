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
							<p style="color: gray">or you can</p>
							<button
								type="button"
								@click="loginWithGoogle()"
								class="btn btn-secondary"
							>
								Login with Google
							</button>
						</div>
						<p class="forgot-password">
							You don't have an account?
							<router-link :to="{ name: 'Signup' }">sign up</router-link>
						</p>
						<div id="errorMsg" class="error text-danger"></div>
						<div class="error text-danger">{{ errorMessage }}</div>
					</form>
				</div>
				<div class="col-sm"></div>
			</div>
		</div>
	</div>
</template>

<script>
import store from "@/store";
import { firebase } from "@/firebase";
export default {
	name: "login",
	data() {
		return {
			email: "",
			password: "",
			errorMessage: "",
		};
	},
	methods: {
		login() {
			console.log("login..." + this.email);
			firebase
				.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.then((result) => {
					if (firebase.auth().currentUser.emailVerified) {
						this.$router.replace({ name: "Home" });
					} else {
						console.log("email is not verified");
						firebase
							.auth()
							.signOut()
							.then(() => {
								this.$router.push({ name: "Login" });
							});
					}
				})
				.catch((e) => {
					console.error(e.message);
					this.errorMessage = e.message;
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
					store.token = result.credential.accessToken; // mozda cu ga kasnije za nesto koristiti. za test neka ostane
				})
				.catch(function (error) {
					// Handle Errors here.
					// var errorCode = error.code;
					this.errorMessage = error.message;
					// // The email of the user's account used.
					// var email = error.email;
					// // The firebase.auth.AuthCredential type that was used.
					// var credential = error.credential;
					// ...
				});
		},
	},
};
</script>
