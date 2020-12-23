<template>
	<div id="app">
		<nav id="nav" class="navbar navbar-expand-lg navbar-light">
			<a class="navbar-brand" href="/">
				<img
					src="@/assets/kclogo.png"
					height="40"
					class="d-inline-block align-top"
					alt="Nas logotip kompanije koji prikazuje nešto cool"
					loading="lazy"
				/>
			</a>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarToggler"
				aria-controls="navbarToggler"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarToggler">
				<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
					<li class="nav-item">
						<router-link to="/">Home</router-link>
					</li>
					<li v-if="!store.currentUser" class="nav-item">
						<router-link to="/login">Prijava</router-link>
					</li>
					<li v-if="!store.currentUser" class="nav-item">
						<router-link to="/signup">Registracija</router-link>
					</li>
					<li v-if="store.currentUser" class="nav-item">
						<router-link to="/payment">Payment</router-link>
					</li>
					<li v-if="store.currentUser" class="nav-item">
						<a href="#" @click.prevent="logout()">Logout</a>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					<input
						v-model="store.searchTerm"
						class="form-control mr-sm-2"
						type="search"
						placeholder="Pretraga"
						aria-label="Search"
					/>
				</form>
			</div>
		</nav>
		<router-view />
	</div>
</template>

<script>
import store from "@/store";
import { firebase } from "@/firebase";
import router from "@/router";

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		// User is signed in.
		store.currentUser = user.email;
	} else {
		// No user is signed in.
		store.currentUser = null;

		if (router.name != "Login") {
			router.push({ name: "Login" });
		}
	}
});

export default {
	name: "app",
	data() {
		return {
			store,
		};
	},
	methods: {
		logout() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$router.push({ name: "Login" });
				});
		},
	},
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;
		padding-right: 10px;

		&.router-link-exact-active {
			color: #0086cc;
		}
	}
}
a {
	color: #0086cc;
}
</style>
