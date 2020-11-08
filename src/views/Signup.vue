<template>
  <div class="signup">
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <form>
          <h1>yo Slim Shady, please sign up</h1>
          <div class="form-group">
            <label>Full Name</label>
            <input
              type="text"
              class="form-control"
              aria-describedby="fullNameHelp"
              placeholder="Enter your full name"
            />
          </div>

          <div class="form-group">
            <label>Email address</label>
            <input
              type="email"
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
            />
            <small id="passwordHelp" class="form-text text-muted"
              >Please use strong password or even better, a password manager like 1Password</small
            >
          </div>

          <button type="submit" class="btn btn-primary">Sign Up</button>

          <p class="forgot-password">
            Already registered?
            <router-link :to="{ name: 'Login' }">sign in</router-link>
          </p>
        </form>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>